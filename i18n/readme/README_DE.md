# Bella 🤖

<div align="center">
  <img src="/docs/static/img/bella_banner.jpg" alt="Bella Banner" width="100%" />
</div>

<div align="center">

📖 [Dokumentation](https://bellaos.github.io/bella/) | 🎯 [Beispiele](https://github.com/thejoven/awesome-bella)

</div>

## ✨ Funktionen

- 🛠️ Voll ausgestattete Konnektoren für Discord, Twitter und Telegram
- 👥 Multi-Agenten- und Raumunterstützung
- 📚 Einfache Verarbeitung und Interaktion mit deinen Dokumenten
- 💾 Abrufbarer Speicher und Dokumentenspeicher
- 🚀 Hochgradig erweiterbar – erstelle deine eigenen Aktionen und Clients
- ☁️ Unterstützt viele Modelle (lokales Llama, OpenAI, Anthropic, Groq usw.)
- 📦 Einfach funktionsfähig!

## 🎯 Anwendungsfälle

- 🤖 Chatbots
- 🕵️ Autonome Agenten
- 📈 Geschäftsprozessmanagement
- 🎮 NPCs in Videospielen
- 🧠 Handel

## 🚀 Schnelleinstieg

### Voraussetzungen

- [Python 2.7+](https://www.python.org/downloads/)
- [Node.js 23+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [pnpm](https://pnpm.io/installation)

> **Hinweis für Windows-Benutzer:** [WSL 2](https://learn.microsoft.com/de-de/windows/wsl/install-manual) ist erforderlich.

### Nutzung des Starters (Empfohlen)

```bash
git clone https://github.com/bellaos/bella-starter.git

cp .env.example .env

pnpm i && pnpm start
```

Lies dann die [Dokumentation](https://bellaos.github.io/bella/), um zu erfahren, wie du Bella anpassen kannst.

### Manuelles Starten von Bella (Nur empfohlen, wenn du genau weißt, was du tust)

```bash
# Repository klonen
git clone https://github.com/bellaos/bella.git

# Wechsle zur neuesten Version
# Dieses Projekt entwickelt sich schnell weiter, daher empfehlen wir, die neueste Version zu verwenden
git checkout $(git describe --tags --abbrev=0)
```

### Bella mit Gitpod starten

[![In Gitpod öffnen](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/bellaos/bella/tree/main)

### Bearbeite die .env-Datei

Kopiere .env.example nach .env und fülle die entsprechenden Werte aus.

```
cp .env.example .env
```

Hinweis: .env ist optional. Wenn du vorhast, mehrere unterschiedliche Agenten auszuführen, kannst du Geheimnisse über die Charakter-JSON übergeben.

### Bella automatisch starten

Dies führt alle notwendigen Schritte aus, um das Projekt einzurichten und den Bot mit dem Standardcharakter zu starten.

```bash
sh scripts/start.sh
```

### Charakterdatei bearbeiten

1. Öffne `agent/src/character.ts`, um den Standardcharakter zu bearbeiten. Kommentiere und bearbeite ihn.

2. Um benutzerdefinierte Charaktere zu laden:
    - Verwende `pnpm start --characters="path/to/your/character.json"`
    - Mehrere Charakterdateien können gleichzeitig geladen werden.
3. Verbinde mit X (Twitter)
    - Ändere `"clients": []` zu `"clients": ["twitter"]` in der Charakterdatei, um eine Verbindung mit X herzustellen.

### Bella manuell starten

```bash
pnpm i
pnpm build
pnpm start

# Das Projekt entwickelt sich schnell weiter. Manchmal musst du das Projekt bereinigen, wenn du es nach einiger Zeit erneut aufrufst.
pnpm clean
```

#### Zusätzliche Anforderungen

Möglicherweise musst du Sharp installieren. Wenn beim Starten ein Fehler auftritt, versuche es mit folgendem Befehl:

```
pnpm install --include=optional sharp
```

### Community & Kontakt

- [GitHub Issues](https://github.com/bellaos/bella/issues). Am besten geeignet für: Bugs, die du bei der Nutzung von Bella findest, und Feature-Vorschläge.
- [Discord](https://discord.gg/ai16z). Am besten geeignet für: das Teilen deiner Anwendungen und den Austausch mit der Community.

## Contributors

<a href="https://github.com/bellaos/bella/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bellaos/bella" />
</a>

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=bellaos/bella&type=Date)](https://star-history.com/#bellaos/bella&Date)
