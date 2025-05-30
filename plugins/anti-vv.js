const { cmd } = require("../command");

cmd({
  pattern: "vv",
  alias: ["viewonce", "retrieve"],
  react: "👀",
  desc: "Owner Only - Retrieve view-once media by replying",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    if (!isCreator) {
      return client.sendMessage(from, {
        text: "🚫 *Owner only command!*",
      }, { quoted: message });
    }

    if (!match.quoted) {
      return client.sendMessage(from, {
        text: "❗ *Please reply to a view-once image, video, or audio message.*",
      }, { quoted: message });
    }

    const buffer = await match.quoted.download().catch(() => null);
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    if (!buffer) {
      return client.sendMessage(from, {
        text: "⚠️ *Failed to download media.*",
      }, { quoted: message });
    }

    let media = {};
    switch (mtype) {
      case "imageMessage":
        media = {
          image: buffer,
          caption: match.quoted.text || "📸 *Recovered image*",
          mimetype: match.quoted.mimetype || "image/jpeg",
        };
        break;
      case "videoMessage":
        media = {
          video: buffer,
          caption: match.quoted.text || "🎥 *Recovered video*",
          mimetype: match.quoted.mimetype || "video/mp4",
        };
        break;
      case "audioMessage":
        media = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false,
        };
        break;
      default:
        return client.sendMessage(from, {
          text: "❌ *Only image, video, or audio view-once messages are supported.*",
        }, { quoted: message });
    }

    await client.sendMessage(from, media, options);
  } catch (error) {
    console.error("vv Error:", error);
    await client.sendMessage(from, {
      text: "❌ *Error retrieving media:*\n" + error.message,
    }, { quoted: message });
  }
});