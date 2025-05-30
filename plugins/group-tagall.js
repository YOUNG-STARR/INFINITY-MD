const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "To Tag all Members",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, groupAdmins, prefix, command, args, body }) => {
    try {
        if (!isGroup) return reply("❌ Cette commande est réservée aux groupes.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        if (!groupAdmins.includes(senderJid) && senderNumber !== botOwner) {
            return reply("❌ Seuls les administrateurs du groupe ou le propriétaire du bot peuvent utiliser cette commande.");
        }

        let groupInfo = await conn.groupMetadata(from).catch(() => null);
        if (!groupInfo) return reply("❌ Impossible de récupérer les informations du groupe.");

        let groupName = groupInfo.subject || "Groupe inconnu";
        let totalMembers = participants ? participants.length : 0;
        if (totalMembers === 0) return reply("❌ Aucun membre trouvé dans ce groupe.");

        let emojis = ['📢', '🔊', '🌐', '🔰', '❤‍🩹', '🤍', '🖤', '🩵', '📝', '💗', '🔖', '🪩', '📦', '🎉', '🛡️', '💸', '⏳', '🗿', '🚀', '❄️', '👨‍💻', '⚠️', '🔥'];
        let randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        let message = body.slice(body.indexOf(command) + command.length).trim();
        if (!message) message = "〘 🔔 Attention tout le monde ! 〙";

        let teks = `╭─❖「 *📢 TAGALL* 」\n│\n`;
        teks += `│ 🎯 *Groupe* : ${groupName}\n`;
        teks += `│ 👥 *Membres* : ${totalMembers}\n`;
        teks += `│ 💬 *Message* : ${message}\n│\n`;
        teks += `╰─⊷ *Mentions*\n\n`;

        for (let mem of participants) {
            if (!mem.id) continue;
            teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += `\n╭────[ 🔰 INFINITY-MD 🔰 ]────╮\n       Powered by SIRIUS\n╰────────────────────────────╯`;

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Erreur rencontrée !*\n\n${e.message || e}`);
    }
});
