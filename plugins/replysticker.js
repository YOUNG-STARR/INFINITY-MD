const { cmd } = require("../command");

cmd({
  pattern: "rs",
  alias: ["replysticker", "autosticker"],
  desc: "Reply to a message with a predefined sticker",
  category: "tools",
  react: "🌟",
  use: ".rs (reply to any message)",
  filename: __filename
}, async (conn, m, text, { quoted, reply }) => {
  try {
    const q = quoted || m.quoted;
    if (!q) return reply("❗Please reply to a message to send the sticker.");

    // Sticker URL you gave
    const stickerUrl = "https://files.catbox.moe/aw9ckq.webp";

    // Send sticker as reply
    await conn.sendMessage(m.chat, {
      sticker: { url: stickerUrl }
    }, { quoted: q });

  } catch (err) {
    console.error("ReplySticker Error:", err);
    reply("❌ Failed to send sticker:\n" + err.message);
  }
});
