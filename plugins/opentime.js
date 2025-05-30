const { cmd } = require("../command");

cmd({
  pattern: "rs",
  alias: ["replysticker", "autosticker"],
  desc: "Reply to a message with a predefined sticker",
  category: "tools",
  react: "🌟",
  use: ".rs (reply to any message)",
  filename: __filename
}, async (conn, m, text, { reply }) => {
  try {
    const quotedMsg = m.quoted;
    if (!quotedMsg) {
      return reply("❗Please reply to a message to send the sticker.");
    }

    const stickerUrl = "https://files.catbox.moe/aw9ckq.webp";

    await conn.sendMessage(m.chat, {
      sticker: { url: stickerUrl }
    }, { quoted: quotedMsg });

  } catch (err) {
    console.error("ReplySticker Error:", err);
    reply("❌ Failed to send sticker:\n" + (err.message || err));
  }
});
