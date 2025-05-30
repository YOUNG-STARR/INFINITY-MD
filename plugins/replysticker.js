const { cmd } = require("../command");

cmd({
  pattern: "replysticker",
  alias: ["rs", "stickermsg", "stkr"],
  react: "🧷",
  desc: "Reply with a sticker to a specific message",
  category: "tools",
  use: ".replysticker (while replying to a media)",
  filename: __filename
}, async (conn, m, text, { quoted, reply }) => {
  try {
    const q = quoted || m.quoted;
    if (!q) return reply("🖼️ Please reply to a message that contains an image or short video.");

    const mime = (q.msg || q).mimetype || "";
    if (!/image|video/.test(mime)) return reply("❌ The replied message must contain an image or video.");

    const media = await q.download();
    if (!media) return reply("⏳ Failed to download media.");

    await conn.sendMessage(m.chat, {
      sticker: media,
      packname: "INFINITY-MD",
      author: "SIRIUS"
    }, { quoted: q }); // Stickers replies to original message

  } catch (err) {
    console.error("ReplySticker Error:", err);
    reply("❌ Error sending sticker:\n" + err.message);
  }
});
