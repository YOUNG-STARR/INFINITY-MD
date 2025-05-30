const { cmd } = require('../command');

cmd({
    pattern: "remove",
    alias: ["kick", "k"],
    desc: "Remove a member from the group",
    category: "admin",
    react: "❌",
    filename: __filename
}, async (conn, mek, m, {
    from, q, isGroup, isBotAdmins, reply, quoted, senderNumber, groupAdmins
}) => {
    try {
        if (!isGroup) return reply("❌ This command can only be used in groups.");

        const botOwner = conn.user.id.split(":")[0];
        const isAdmin = groupAdmins.includes(senderNumber + "@s.whatsapp.net");

        if (!isAdmin && senderNumber !== botOwner) {
            return reply("🔒 *Only group admins or the bot owner can use this command.*");
        }

        if (!isBotAdmins) return reply("⚠️ *I need to be an admin to remove someone.*");

        let number;
        if (quoted) {
            number = quoted.sender.split("@")[0];
        } else if (q) {
            const match = q.match(/\d{6,}/);
            if (!match) return reply("❌ *Invalid number or mention.*");
            number = match[0];
        } else {
            return reply("❗ *Please mention, reply to a message, or provide a valid number.*");
        }

        const jid = number + "@s.whatsapp.net";

        await conn.groupParticipantsUpdate(from, [jid], "remove");
        await reply(`✅ *Successfully removed* @${number}`, { mentions: [jid] });

    } catch (error) {
        console.error("Remove command error:", error);
        reply("❌ *Failed to remove the member.*");
    }
});