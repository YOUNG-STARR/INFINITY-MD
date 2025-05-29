const config = require('../config');
const moment = require('moment-timezone');
const { cmd, commands } = require('../command');
const axios = require('axios');

function toSmallCaps(str) {
  const smallCaps = {
    A: 'ᴀ', B: 'ʙ', C: 'ᴄ', D: 'ᴅ', E: 'ᴇ', F: 'ғ', G: 'ɢ', H: 'ʜ',
    I: 'ɪ', J: 'ᴊ', K: 'ᴋ', L: 'ʟ', M: 'ᴍ', N: 'ɴ', O: 'ᴏ', P: 'ᴘ',
    Q: 'ǫ', R: 'ʀ', S: 's', T: 'ᴛ', U: 'ᴜ', V: 'ᴠ', W: 'ᴡ', X: 'x',
    Y: 'ʏ', Z: 'ᴢ'
  };
  return str.toUpperCase().split('').map(c => smallCaps[c] || c).join('');
}

cmd({
  pattern: "menu",
  alias: ["♾️", "mega", "allmenu"],
  use: '.menu',
  desc: "Show all bot commands",
  category: "menu",
  react: "♾️",
  filename: __filename
},
async (conn, mek, m, { from, reply }) => {
  try {
    const totalCommands = commands.length;
    const date = moment().tz("America/Port-au-Prince").format("dddd, DD MMMM YYYY");

    const uptime = () => {
      let sec = process.uptime();
      let h = Math.floor(sec / 3600);
      let m = Math.floor((sec % 3600) / 60);
      let s = Math.floor(sec % 60);
      return `${h}h ${m}m ${s}s`;
    };

    let menuText = `
━━━〔 INFINITY-MD PANEL 〕━━━╮
┃
┃ ⏤ Prefix       : [${config.PREFIX}]
┃ ⏤ Owner        : ${config.OWNER_NAME}
┃ ⏤ Commands     : 162+
┃ ⏤ Platform     : Linux
┃ ⏤ Memory       : 11.2 GB / 16 GB
┃ ⏤ Powered By   : SIRIUS
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭─〔 𝐂𝐀𝐓É𝐆𝐎𝐑𝐈𝐄𝐒 〕─╮
│ ☼ IA
│ ☼ Général
│ ☼ Groupe
│ ☼ Réactions
│ ☼ Téléchargement
│ ☼ Convertisseurs
│ ☼ Audio FX
│ ☼ Édition Image
│ ☼ Jeux
│ ☼ Hentai
│ ☼ Paramètres
│ ☼ Logos
│ ☼ Stickers
│ ☼ TTS
│ ☼ Weeb
╰────────────────────╯
───────────────────────

🔹 𝗚𝗲́𝗻𝗲́𝗿𝗮𝗹  
› menu  
› alive  
› ping  
› speed  
› owner  
› profile  
› runtime  
› uptime  
› repo  

🔹 𝓘𝓐  
› ai  
› gpt  
› gpt2  
› gpt3  
› gpt4  
› gptmini  
› chatbot  
› meta  
› blackbox  
› copilot  
› imagine  
› imagine2  
› fluxai  
› luma  
› crazy  

🔹 𝗚𝗿𝗼𝘂𝗽𝗲  
› tagall  
› hidetag  
› tagadmins  
› kickall  
› kickall2  
› kickall3  
› promote  
› demote  
› remove  
› add  
› kick  
› linkgc  
› grouplink  
› setwelcome  
› setgoodbye  
› revoke  
› updategname  
› updategdesc  
› ginfo  
› invite  
› joinrequests  
› allreq  
› mute  
› unmute  
› lockgc  
› unlockgc  
› disappear on  
› disappear off  
› disappear 7D,24H  

🔹 𝗥𝗲́𝗮𝗰𝘁𝗶𝗼𝗻𝘀  
› hug  
› kiss  
› slap  
› pat  
› poke  
› wink  
› blush  
› smile  
› highfive  
› handhold  
› cuddle  
› cry  
› happy  
› wave  
› kill  
› yeet  
› bonk  
› bite  
› glomp  
› dance  
› cringe  
› lick  
› smug  

🔹 𝗧𝗲́𝗹𝗲𝗰𝗵𝗮𝗿𝗴𝗲𝗺𝗲𝗻𝘁  
› facebook  
› fb2  
› instagram  
› insta  
› tiktok  
› tt2  
› tiks  
› twitter  
› mediafire  
› spotify  
› pinterest  
› play  
› play2  
› audio  
› video  
› video2  
› song  
› apk  
› apk2  
› ssweb  
› ytmp3  
› ytmp4  
› gdrive  
› darama  

🔹 𝗖𝗼𝗻𝘃𝗲𝗿𝘁𝗶𝘀𝘀𝗲𝘂𝗿𝘀  
› sticker  
› sticker2  
› emojimix  
› fancy  
› take  
› tomp3  
› tts  
› trt  
› base64  
› unbase64  
› binary  
› dbinary  
› tinyurl  
› urldecode  
› urlencode  
› url  
› repeat  
› ask  
› readmore  

🔹 𝗔𝘂𝗱𝗶𝗼 𝗙𝗫  
› deep  
› bass  
› slow  
› fast  
› audio  

🔹 𝗘́𝗱𝗶𝘁𝗶𝗼𝗻 𝗜𝗺𝗮𝗴𝗲  
› neonlight  
› blackpink  
› dragonball  
› 3dcomic  
› clouds  
› galaxy  
› hacker  
› paint  
› futuristic  
› america  
› naruto  
› sadgirl  
› eraser  
› sunset  
› leaf  
› sans  
› boom  
› devilwings  
› bulb  
› angelwings  
› zodiac  
› frozen  
› castle  
› tatoo  
› valorant  
› bear  
› typography  
› birthday  

🔹 𝗝𝗲𝘂𝘅  
› riddle  
› quizz  
› ttt  
› yesorno  
› poll  
› shapar  
› rate  
› insult  
› hack  
› ship  
› character  
› pickup  
› joke  
› hrt  
› hpy  
› syd  
› anger  
› shy  
› mon  
› cunfuzed  
› hand  
› hold  
› hifi  

🔹 𝗛𝗲𝗻𝘁𝗮𝗶  
› hwaifu  
› hneko  
› hmaid  
› hloli  

🔹 𝗣𝗮𝗿𝗮𝗺𝗲𝘁𝗿𝗲𝘀  
› setstatus  
› upload  
› setprefix  
› block  
› unblock  
› restart  
› shutdown  
› crazytech  
› listcmd  
› updatecmd  
› gjid  
› jid  
› fullpp  
› setpp  

🔹 𝗟𝗼𝗴𝗼𝘀  
› hacker  
› neon  
› luxury  
› paint  
› galaxy  
› sunset  

🔹 𝗦𝘁𝗶𝗰𝗸𝗲𝗿𝘀  
› sticker  
› sticker2  
› take  
› fancy  

🔹 𝗧𝗧𝗦  
› tts  
› trt  
› readmore  

🔹 𝗪𝗲𝗲𝗯  
› waifu  
› neko  
› animegirl  
› animegirl1  
› animegirl2  
› animegirl3  
› animegirl4  
› animegirl5  
› animenews  
› anime1  
› anime2  
› anime3  
› anime4  
› anime5  
› foxgirl  
› naruto  
› megnumin  
› maid  
› loli  
› garl  
› awoo  
› fack  
› truth  
› dare  

─────────────────  
> *Pour utiliser une commande, tapez !commande*

> ${config.DESCRIPTION}`;
    }

    menuText += `\n`;

    await conn.sendMessage(from, {
      image: { url: 'https://files.catbox.moe/qfr2f5.jp' },
      caption: menuText,
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363328294650605@newsletter',
          newsletterName: '𝐈𝐍𝐅𝐈𝐍𝐈𝐓𝐘-𝐌𝐃',
          serverMessageId: 143
        }
      }
    }, { quoted: mek });
    
  } catch (e) {
    console.error(e);
    reply(`❌ Error: ${e.message}`);
  }
});
