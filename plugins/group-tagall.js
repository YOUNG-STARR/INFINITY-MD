const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall","toutmoun"],
    desc: "Tag all members of the group",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ This command is only available in groups.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ Only group admins or the bot owner can use this command.");
        }

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Failed to fetch group information.");

        let groupName = groupInfo.subject || "Unknown Group";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ No members found in this group.");

        let emojis = ['📢', '🔊', '🌐', '🔰', '❤️', '🤍', '🖤', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '❄️', '👨‍💻', '⚠️', '🔥'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "📣 *Hey everyone!*";

        let teks = `╭───⌈  *${groupName.toUpperCase()}*  ⌋───╮\n` +
                   `│\n` +
                   `├ 📌 *Group* : ${groupName}\n` +
                   `├ 👥 *Members* : ${totalMembers}\n` +
                   `├ 💬 *Message* : ${message}\n` +
                   `│\n` +
                   `├───⊷ *👤 MENTIONS*\n`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `│ ${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += `╰────────⌈ 🔱 *INFINITY-MD* 🔱 ⌋`;

        await conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ An error occurred!\n\n${e.message || e}`);
    }
});