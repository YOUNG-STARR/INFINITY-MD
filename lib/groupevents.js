//Give Me Credit If Using This File Give Me Credit On Your Channel ✅ 
// Credits SIRIUS - INFINITY-MD 💜 

const { isJidGroup } = require('@whiskeysockets/baileys');
const config = require('../config');

const getContextInfo = (m) => {
    return {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
            newsletterJid: '120363328294650605@newsletter',
            newsletterName: '𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃',
            serverMessageId: 143,
        },
    };
};

const defaultGoodbyeImage = 'https://files.catbox.moe/nfykjn.jpg';
const defaultPpUrls = [
    'https://i.ibb.co/KhYC4FY/1221bc0bdd2354b42b293317ff2adbcf-icon.png',
];

const GroupEvents = async (conn, update) => {
    try {
        const isGroup = isJidGroup(update.id);
        if (!isGroup) return;

        const metadata = await conn.groupMetadata(update.id);
        const participants = update.participants;
        const desc = metadata.desc || "Aucune description.";
        const groupMembersCount = metadata.participants.length;

        for (const num of participants) {
            const userName = num.split("@")[0];
            const timestamp = new Date().toLocaleString();

            if (update.action === "add" && config.WELCOME === "true") {
                let userPpUrl;
                try {
                    userPpUrl = await conn.profilePictureUrl(num, 'image');
                } catch {
                    userPpUrl = defaultPpUrls[Math.floor(Math.random() * defaultPpUrls.length)];
                }

                const WelcomeText = `╭━━〔 𝑾𝒆𝒍𝒄𝒐𝒎𝒆 👋 〕━━⬣\n` +
                    `┃┋👤 Bienvenue @${userName}\n` +
                    `┃┋👥 Groupe : *${metadata.subject}*\n` +
                    `┃┋📌 Membres : *${groupMembersCount}*\n` +
                    `┃┋🕒 Heure d'entrée : *${timestamp}*\n` +
                    `┃┋📖 Description : ${desc}\n` +
                    `╰━➤ *> 𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙎𝙄𝙍𝙄𝙐𝙎**`;

                await conn.sendMessage(update.id, {
                    image: { url: userPpUrl },
                    caption: WelcomeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "remove" && config.WELCOME === "true") {
                const GoodbyeText = `╭━━〔 𝑮𝒐𝒐𝒅𝒃𝒚𝒆 😔 〕━━⬣\n` +
                    `┃┋👤 @${userName} a quitté le groupe.\n` +
                    `┃┋📉 Membres restants : *${groupMembersCount}*\n` +
                    `┃┋🕒 Heure du départ : *${timestamp}*\n` +
                    `╰━➤ *> 𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙎𝙄𝙍𝙄𝙐𝙎*`;

                await conn.sendMessage(update.id, {
                    image: { url: defaultGoodbyeImage },
                    caption: GoodbyeText,
                    mentions: [num],
                    contextInfo: getContextInfo({ sender: num }),
                });

            } else if (update.action === "demote" && config.ADMIN_EVENTS === "true") {
                const demoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*🎗️ Admin Event*\n\n` +
                          `@${demoter} a retiré @${userName} des admins.\n` +
                          `🕒 *Heure* : ${timestamp}\n` +
                          `👥 *Groupe* : ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });

            } else if (update.action === "promote" && config.ADMIN_EVENTS === "true") {
                const promoter = update.author.split("@")[0];
                await conn.sendMessage(update.id, {
                    text: `*🛡️ Admin Event*\n\n` +
                          `@${promoter} a promu @${userName} en tant qu'admin.\n` +
                          `🕒 *Heure* : ${timestamp}\n` +
                          `👥 *Groupe* : ${metadata.subject}`,
                    mentions: [update.author, num],
                    contextInfo: getContextInfo({ sender: update.author }),
                });
            }
        }
    } catch (err) {
        console.error('Group event error:', err);
    }
};

module.exports = GroupEvents;
