const { cmd } = require("../command");

cmd({
  pattern: "vv2",
  alias: ["wah", "ohh", "oho", "🙂", "nice", "ok"],
  desc: "Owner Only - Retrieve view-once media & forward to user DM",
  category: "owner",
  filename: __filename
}, async (client, message, match, { from, isCreator }) => {
  try {
    if (!isCreator) return; // Silent ignore if not owner

    if (!match.quoted) {
      return client.sendMessage(from, {
        text: "📌 *Please reply to a view-once message to retrieve it.*"
      }, { quoted: message });
    }

    const buffer = await match.quoted.download().catch(() => null);
    const mtype = match.quoted.mtype;
    const options = { quoted: message };

    if (!buffer) {
      return client.sendMessage(from, {
        text: "⚠️ *Unable to download the media.*"
      }, { quoted: message });
    }

    let messageContent = {};
    switch (mtype) {
      case "imageMessage":
        messageContent = {
          image: buffer,
          caption: match.quoted.text || "📸 *Recovered Image*",
          mimetype: match.quoted.mimetype || "image/jpeg"
        };
        break;
      case "videoMessage":
        messageContent = {
          video: buffer,
          caption: match.quoted.text || "🎥 *Recovered Video*",
          mimetype: match.quoted.mimetype || "video/mp4"
        };
        break;
      case "audioMessage":
        messageContent = {
          audio: buffer,
          mimetype: "audio/mp4",
          ptt: match.quoted.ptt || false
        };
        break;
      case "documentMessage":
        messageContent = {
          document: buffer,
          fileName: match.quoted.fileName || "recovered_file",
          mimetype: match.quoted.mimetype || "application/octet-stream"
        };
        break;
      default:
        return client.sendMessage(from, {
          text: "❌ *Only image, video, audio, or document messages are supported.*"
        }, { quoted: message });
    }

    // Send recovered content to user's DM
    await client.sendMessage(message.sender, messageContent, options);
  } catch (error) {
    console.error("vv2 Error:", error);
    await client.sendMessage(from, {
      text: "❌ *Failed to retrieve message:*\n" + error.message
    }, { quoted: message });
  }
});
