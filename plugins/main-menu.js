const config = require('../config');
const moment = require('moment-timezone');
const fs = require('fs');
const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "menu",
    alias: ["allmenu", "fullmenu"],
    use: '.menu',
    desc: "Show all bot commands",
    category: "menu",
    react: "♾️",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q,
    isGroup, sender, senderNumber, botNumber2,
    botNumber, pushname, isMe, isOwner,
    groupMetadata, groupName, participants,
    groupAdmins, isBotAdmins, isAdmins, reply
}) => {
    try {
        let dec = `┏━〔 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃 ♾️ 〕━┓
┃ 🧑‍💻 ᴜꜱᴇʀ : @${m.sender.split("@")[0]}
┃ ⏳ ʀᴜɴᴛɪᴍᴇ : ${uptime()}
┃ 🧭 ᴍᴏᴅᴇ : *${config.MODE}*
┃ 💠 ᴘʀᴇғɪx : [${config.PREFIX}]
┃ 📂 ᴄᴍᴅꜱ : ${totalCommands}
┃ 👨‍🚀 ᴅᴇᴠ : *𝐒𝐈𝐑𝐈𝐔𝐒*
┃ 🧬 ᴠᴇʀꜱɪᴏɴ : *1.0.0*
┗━━━━━━━━━━━━━━━━━━━┛

『 𝐖𝐄𝐋𝐂𝐎𝐌𝐄 𝐓𝐎 𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃 』
`;

        let category = {};
        for (let cmd of commands) {
            if (!cmd.category) continue;
            if (!category[cmd.category]) category[cmd.category] = [];
            category[cmd.category].push(cmd);
        }

        const keys = Object.keys(category).sort();
        let menuText = '';
        for (let k of keys) {
            menuText += `\n\n⭓ *${k.toUpperCase()} MENU*`;
            const cmds = category[k].filter(c => c.pattern).sort((a, b) => a.pattern.localeCompare(b.pattern));
            cmds.forEach((cmd) => {
                const usage = cmd.pattern.split('|')[0];
                menuText += `\n│ ➤ \`${config.PREFIX}${toSmallCaps(usage)}\``;
            });
            menuText += `\n╰───⟡\n> ${config.DESCRIPTION}`;
        }

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/6zuzje.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363328294650605@newsletter',
                        newsletterName: config.BOT_NAME,
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: fs.readFileSync('./infinity00/menu.mp3'),
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`❌ Error: ${e}`);
    }
});
