const config = require('../config');
const moment = require('moment-timezone');
const fs = require('fs');
const { cmd, commands } = require('../command');
const axios = require('axios');

// Fonction pour transformer en petites majuscules (small caps)
function toSmallCaps(text) {
    const smallCapsMap = {
        a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ꜰ',
        g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ',
        m: 'ᴍ', n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ',
        s: 'ꜱ', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x',
        y: 'ʏ', z: 'ᴢ'
    };
    return text.toLowerCase().split('').map(c => smallCapsMap[c] || c).join('');
}

// Fonction uptime
function uptime() {
    let totalSeconds = process.uptime();
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = Math.floor(totalSeconds % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Fonction pour l'heure actuelle (optionnel : adapte ta timezone)
function getCurrentDateTime() {
    return moment().tz("Africa/Port-au-Prince").format("DD/MM/YYYY HH:mm");
}

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
┃ 🕒 ᴅᴀᴛᴇ : ${getCurrentDateTime()}
┃ ⏳ ʀᴜɴᴛɪᴍᴇ : ${uptime()}
┃ 🧭 ᴍᴏᴅᴇ : *${config.MODE}*
┃ 💠 ᴘʀᴇғɪx : [${config.PREFIX}]
┃ 📂 ᴄᴍᴅꜱ : ${commands.length}
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
            menuText += `\n╰───⟡`;
        }
        menuText += `\n\n> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/6zuzje.jpg' },
                caption: dec + menuText,
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
