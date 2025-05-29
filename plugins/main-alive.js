const { cmd } = require('../command');
const os = require("os");
const axios = require("axios");
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "alive",
    alias: ["bot", "live"],
    desc: "Check bot is alive or not",
    category: "main",
    react: "♾️",
    filename: __filename
},
async (conn, mek, m, { from, sender, reply }) => {
    try {
        const caption = `
╭━━〔 🧬 𝙎𝙔𝙎𝙏𝙀𝙈 𝙎𝙏𝘼𝙏𝙐𝙎 ━━◉
┃✨ 𝘽𝙤𝙩 𝙎𝙩𝙖𝙩𝙪𝙨: 𝗔𝗖𝗧𝗜𝗩𝗘 & 𝗢𝗡𝗟𝗜𝗡𝗘
┃🧠 𝘿𝙚𝙫: 𝙎𝙄𝙍𝙄𝙐𝙎 𝘾𝙔𝘽𝙀𝙍
┃⚡ 𝙑𝙚𝙧𝙨𝙞𝙤𝙣: 𝟏.𝟎.𝟎
┃🛠️ 𝙋𝙧𝙚𝙛𝙞𝙭: [${config.PREFIX}]
┃📳 𝙈𝙤𝙙𝙚: [${config.MODE}]
┃💻 𝙃𝙤𝙨𝙩: ${os.hostname()}
┃⏱️ 𝙐𝙥𝙩𝙞𝙢𝙚: ${runtime(process.uptime())}
╰─────〔 🚀 ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙎𝙄𝙍𝙄𝙐𝙎 𝙏𝙀𝘾𝙃 〕────◉*
        `.trim();

        const thumbnailBuffer = await axios.get('https://files.catbox.moe/nfykjn.jpg', { responseType: 'arraybuffer' }).then(res => res.data);

        await conn.sendMessage(from, {
            text: caption,
            contextInfo: {
                externalAdReply: {
                    title: "𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃",
                    body: "© 𝐩𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐒𝐢𝐫𝐢𝐮𝐬",
                    mediaType: 1,
                    previewType: "PHOTO",
                    renderLargerThumbnail: true,
                    thumbnail: thumbnailBuffer,
                    mediaUrl: "https://wa.me/50939103464",
                    sourceUrl: "https://wa.me/50939103464"
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Alive Error:", e);
        reply(`An error occurred: ${e.message}`);
    }
});
