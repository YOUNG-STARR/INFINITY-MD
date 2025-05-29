
<p align="center">
  <img src="https://files.catbox.moe/mrndkz.jpg" width="300"/>
</p>

<h1 align="center">INFINITY-MD - WhatsApp Bot</h1>

> Bot WhatsApp multipurpose, puissant, rapide et flexible basé sur [Baileys](https://github.com/adiwajshing/Baileys).

---

### 🚀 Générer une Session

Clique ici pour générer ta SESSION_ID :  
PAIR CODE // QR CODE 

**[Générer la Session ID](https://infinity-generate-sessionid.onrender.com)**

---

### 🔗 Liens Utiles

- 📢 **Channel officiel WhatsApp** : [INFINITY-MD Channel](https://whatsapp.com/channel/0029Van0rwb5Ejy2o769hi0J)
- 💬 **Groupe de support WhatsApp** : [INFINITY-MD Support Group](https://chat.whatsapp.com/H7w5OJVOHcr4xn5ow2Jt9v)

---

### ⚙️ Configuration `.env` File

```env
SESSION_ID="MEGALODON~MD~"
AUTO_READ_STATUS=true
STATUS_READ_MSG="*Status Seen By MEGALODON-MD ⚡*"
AUTO_STATUS_REPLY=false
AUTO_REJECT_CALLS=false
MODE="public"
WELCOME=false
AUTO_READ_MESSAGES=false
AUTO_TYPING=false
OWNER_NAME="MEGALODON-MD"
OWNER_NUMBER="50934960331"
AUTO_RECORDING=false
ALWAYS_ONLINE=false
AUTO_BLOCK=true
AUTO_REACT=false
PREFIX="."
```

---

### ⚙️ GitHub Actions – `.github/workflows/deploy.yml`

```yaml
name: Node.js CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main
  schedule:
    - cron: '0 */6 * * *'

jobs:
  build:

    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [20.x]

    steps:
    - name: Checkout repository
      uses: actions/checkout@v3

    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Install FFmpeg
      run: sudo apt-get install -y ffmpeg

    - name: Start application with timeout
      run: |
        timeout 21590s npm start  # Limite l'exécution à 5h 59m 50s

    - name: Save state (Optional)
      run: |
        ./save_state.sh
```

---

### ✨ Développé par

**SIRIUS**  
_“Powered by SIRIUS”_
