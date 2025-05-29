const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    desc: "Check bot's response speed.",
    category: "main",
    react: "🚀",
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const startTime = Date.now();
        const loadingMsg = await conn.sendMessage(from, { text: "🔄 *Calculating speed...*" });
        const endTime = Date.now();
        const ping = endTime - startTime;

        const result = `
╭━━〔 *𝑷𝑰𝑵𝑮 𝑹𝑬𝑺𝑼𝑳𝑻* 〕━━⬣
┃💠 *Bot Name* : 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃
┃⚡ *Speed* : ${ping} ms
┃🔗 *Status* : Online ✅
╰━━━━━━━━━━━━━━⬣
        `.trim();

        await conn.sendMessage(from, { text: result }, { quoted: loadingMsg });
    } catch (e) {
        console.error(e);
        reply(`❌ An error occurred:\n${e}`);
    }
});
