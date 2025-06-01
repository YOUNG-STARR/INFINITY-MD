const { cmd } = require("../command");

const scores = {}; // Scores en mémoire
const activeGames = new Set(); // Suivi des parties en cours

cmd({
  pattern: "tictactoe",
  alias: ["xo", "ttt"],
  react: "🎮",
  desc: "Jouer à Tic Tac Toe à 2 joueurs avec score.",
  category: "game",
  filename: __filename,
}, async (conn, mek, m, { from, sender, reply }) => {
  const playerX = sender;
  const playerO = m.mentionedJid?.[0];

  if (!playerO) return reply("👥 Mentionne un joueur pour commencer.\nEx: .tictactoe @user");
  if (playerX === playerO) return reply("❎ Tu ne peux pas jouer contre toi-même.");

  const gameID = [playerX, playerO].sort().join("-");
  if (activeGames.has(gameID)) return reply("⏳ Une partie est déjà en cours entre ces deux joueurs.");

  activeGames.add(gameID);

  let board = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
  let currentPlayer = "❌";
  let currentID = playerX;
  let turns = 0;
  let gameActive = true;

  const renderBoard = () => `
🎮 *Tic Tac Toe*

${board[0]} | ${board[1]} | ${board[2]}
${board[3]} | ${board[4]} | ${board[5]}
${board[6]} | ${board[7]} | ${board[8]}

👤 *Tour de:* @${currentID.split("@")[0]} (${currentPlayer})
Réponds avec un chiffre de 1 à 9.
`.trim();

  const checkWin = () => {
    const winPatterns = [
      [0,1,2], [3,4,5], [6,7,8],
      [0,3,6], [1,4,7], [2,5,8],
      [0,4,8], [2,4,6]
    ];
    return winPatterns.some(([a,b,c]) => board[a] === currentPlayer && board[b] === currentPlayer && board[c] === currentPlayer);
  };

  const initScore = id => { if (!scores[id]) scores[id] = 0; };
  initScore(playerX);
  initScore(playerO);

  const sent = await conn.sendMessage(from, {
    text: renderBoard(),
    mentions: [playerX, playerO]
  }, { quoted: m });

  let messageID = sent.key.id;

  const gameHandler = async (msgData) => {
    if (!gameActive) return;

    const msg = msgData.messages?.[0];
    if (!msg || !msg.message) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    const senderID = msg.key.participant || msg.key.remoteJid;
    const isReplyToBot = msg.message.extendedTextMessage?.contextInfo?.stanzaId === messageID;

    if (senderID !== currentID || !isReplyToBot) return;

    const move = parseInt(text.trim());
    if (isNaN(move) || move < 1 || move > 9) {
      return conn.sendMessage(from, { text: "❎ Envoie un chiffre entre 1 et 9." }, { quoted: msg });
    }

    const index = move - 1;
    if (["❌", "⭕"].includes(board[index])) {
      return conn.sendMessage(from, { text: "❎ Cette case est déjà prise." }, { quoted: msg });
    }

    board[index] = currentPlayer;
    turns++;

    if (checkWin()) {
      gameActive = false;
      scores[currentID]++;
      activeGames.delete(gameID);
      conn.ev.off("messages.upsert", gameHandler);

      return conn.sendMessage(from, {
        text: `🎉 *${currentPlayer} gagne la partie !*\n\n${renderBoard()}\n\n🏆 *Scores:*\n@${playerX.split("@")[0]}: ${scores[playerX]}\n@${playerO.split("@")[0]}: ${scores[playerO]}`,
        mentions: [playerX, playerO]
      }, { quoted: msg });
    }

    if (turns === 9) {
      gameActive = false;
      activeGames.delete(gameID);
      conn.ev.off("messages.upsert", gameHandler);

      return conn.sendMessage(from, {
        text: `🤝 *Match nul !*\n\n${renderBoard()}\n\n🏆 *Scores:*\n@${playerX.split("@")[0]}: ${scores[playerX]}\n@${playerO.split("@")[0]}: ${scores[playerO]}`,
        mentions: [playerX, playerO]
      }, { quoted: msg });
    }

    // Prochain joueur
    currentPlayer = currentPlayer === "❌" ? "⭕" : "❌";
    currentID = currentID === playerX ? playerO : playerX;

    const updated = await conn.sendMessage(from, {
      text: renderBoard(),
      mentions: [playerX, playerO]
    }, { quoted: msg });

    messageID = updated.key.id;
  };

  conn.ev.on("messages.upsert", gameHandler);
});
