const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, fetchJson } = require('../lib/functions')

cmd({
    pattern: "cosplay",
    react: "🧝",
    alias: ["cos"],
    desc: "Envoie une image de cosplay réaliste (non animé)",
    category: "fun",
    use: '.cosplay',
    filename: __filename
},
async (conn, mek, m, { from, reply }) => {
    try {
        const cosplayApi = "https://api.nekosapi.com/v1/images/cosplay"; // <-- Ex: API réaliste ou autre source
        const res = await fetchJson(cosplayApi);

        if (!res || !res.url) return reply("❌ Impossible de récupérer une image pour le moment.");

        const buffer = await getBuffer(res.url);
        await conn.sendMessage(from, { image: buffer, caption: "✨ Voici un cosplay réaliste !" }, { quoted: mek });

    } catch (err) {
        console.error(err);
        reply("❌ Une erreur est survenue.");
    }
});
