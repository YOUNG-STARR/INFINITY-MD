const config = require('../config')
const { cmd } = require('../command')
const { getBuffer, fetchJson } = require('../lib/functions')

cmd({
    pattern: "tagall",
    react: "🔊",
    alias: ["gc_tagall"],
    desc: "Tague tous les membres du groupe",
    category: "group",
    use: '.tagall [message]',
    filename: __filename
},
async (conn, mek, m, { from, participants, reply, isGroup, senderNumber, prefix, command, args }) => {
    try {
        if (!isGroup) return reply("❌ Cette commande est réservée aux groupes.");

        const botOwner = conn.user.id.split(":")[0];
        const senderJid = senderNumber + "@s.whatsapp.net";

        const groupMetadata = await conn.groupMetadata(from);
        const admins = groupMetadata.participants
            .filter(p => p.admin !== null)
            .map(p => p.id);

        if (!admins.includes(senderJid) && senderNumber !== botOwner)
            return reply("❌ Seuls les administrateurs du groupe ou le propriétaire du bot peuvent utiliser cette commande.");

        const groupName = groupMetadata.subject || "Groupe inconnu";
        const totalMembers = participants.length;
        const message = args.join(" ") || "〘 🔔 Attention tout le monde ! 〙";

        const emojis = ['📢','🔊','🌐','🔰','❤‍🩹','🤍','🖤','🩵','📝','💗','🔖','🪩','📦','🎉','🛡️','💸','⏳','🗿','🚀','❄️','👨‍💻','⚠️','🔥'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];

        let teks = `╭─❖「 *📢 TAGALL* 」\n│\n`;
        teks += `│ 🎯 *Groupe* : ${groupName}\n`;
        teks += `│ 👥 *Membres* : ${totalMembers}\n`;
        teks += `│ 💬 *Message* : ${message}\n│\n`;
        teks += `╰─⊷ *Mentions*\n\n`;

        for (let mem of participants) {
            teks += `${randomEmoji} @${mem.id.split('@')[0]}\n`;
        }

        teks += `\n╭────[ 🔰 INFINITY-MD 🔰 ]────╮\n       Powered by SIRIUS\n╰────────────────────────────╯`;

        conn.sendMessage(from, { text: teks, mentions: participants.map(a => a.id) }, { quoted: mek });

    } catch (e) {
        console.error("TagAll Error:", e);
        reply(`❌ *Erreur rencontrée !*\n\n${e.message || e}`);
    }
});
