# Bella

<div align="center">
  <img src="/docs/static/img/bella_banner.jpg" alt="Bella Banner" width="100%" />
</div>

<div align="center">

📑 [Technical Report](https://arxiv.org/pdf/2501.06781) | 📖 [Documentation](https://bellaos.github.io/bella/) | 🎯 [Examples](https://github.com/thejoven/awesome-bella)

</div>

## 🌍 README Traductions

[中文说明](i18n/readme/README_CN.md) | [日本語の説明](i18n/readme/README_JA.md) | [한국어 설명](i18n/readme/README_KOR.md) | [Persian](i18n/readme/README_FA.md) | [Français](i18n/readme/README_FR.md) | [Português](i18n/readme/README_PTBR.md) | [Türkçe](i18n/readme/README_TR.md) | [Русский](i18n/readme/README_RU.md) | [Español](i18n/readme/README_ES.md) | [Italiano](i18n/readme/README_IT.md) | [ไทย](i18n/readme/README_TH.md) | [Deutsch](i18n/readme/README_DE.md) | [Tiếng Việt](i18n/readme/README_VI.md) | [עִברִית](i18n/readme/README_HE.md) | [Tagalog](i18n/readme/README_TG.md) | [Polski](i18n/readme/README_PL.md) | [Arabic](i18n/readme/README_AR.md) | [Hungarian](i18n/readme/README_HU.md) | [Srpski](i18n/readme/README_RS.md) | [Română](i18n/readme/README_RO.md) | [Nederlands](i18n/readme/README_NL.md) | [Ελληνικά](i18n/readme/README_GR.md)

## 🚩 Vue d'ensemble

<div align="center">
  <img src="https://github.com/bellaOS/bella/blob/develop/docs/static/img/bella_diagram.png" alt="Bella Diagram" width="100%" />
</div>

## ✨ Fonctionnalités

-   🛠 Support des connecteurs Discord/ Twitter / Telegram
-   🔗 Support des différents modèles d'IA (Llama, Grok, OpenAI, Anthropic, etc.)
-   👥 Gestion de plusieurs agents et assistance
-   📚 Import et interactions avec différents types de documents simplifiés
-   💾 Accès aux données en mémoire et aux documents stockés
-   🚀 Grande personnalisation possible : création de nouveaux clients et de nouvelles actions
-   📦 Simplicité d'utilisation

## Tutoriels vidéo

[AI Agent Dev School](https://www.youtube.com/watch?v=ArptLpQiKfI&list=PLx5pnFXdPTRzWla0RaOxALTSTnVq53fKL)

## 🎯 Cas d'usage

-   🤖 Chatbot
-   🕵 Agents autonomes
-   📈 Processus automatisés
-   🎮 PNJ interactifs
-   🧠 Trading automatisé

# Premiers pas

**Pré-requis (obligatoire) :**

-   [Python 2.7+](https://www.python.org/downloads/)
-   [Node.js 23+](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
-   [pnpm](https://pnpm.io/installation)

> **Note pour Windows :** [WSL 2](https://learn.microsoft.com/en-us/windows/wsl/install-manual) est requis

### Utiliser le starter (recommandé)

```bash
git clone https://github.com/bellaos/bella-starter.git
cd bella-starter
cp .env.example .env
pnpm i && pnpm build && pnpm start
```

### Démarrer manuellement Bella (recommandé uniquement si vous savez ce que vous faites)

#### Consulter la dernière version

```bash
# Cloner le dépôt
git clone https://github.com/bellaos/bella.git

# Ce projet évolue rapidement, c'est pourquoi nous vous recommandons de consulter la dernière version.
git checkout $(git describe --tags --abbrev=0)
# Si la procédure ci-dessus ne vérifie pas la dernière version, cela devrait fonctionner:
# git checkout $(git describe --tags `git rev-list --tags --max-count=1`)
```

### Editer le fichier .env

-   Copier le fichier d'exemple .env.example et le remplir avec les valeurs adéquates

```bash
cp .env.example .env
```

### Modifier les fichiers personnage

1. Ouvrir le document `packages/core/src/defaultCharacter.ts` afin de modifier le personnage par défaut

2. Pour ajouter des personnages personnalisés :
    - Lancer la commande `pnpm start --characters="path/to/your/character.json"`
    - Plusieurs fichiers personnages peuvent être ajoutés en même temps

### Lancer Bella

Après avoir terminé la configuration et les fichiers personnage, lancer le bot en tapant la ligne de commande suivante:

```bash
pnpm i
pnpm build
pnpm start

# Le projet étant régulièrement mis à jour, il vous faudra parfois le nettoyer avant de recommencer à travailler dessus
pnpm clean
```

---

### Interagir via le navigateur

-   Ouvrez un autre terminal, allez dans le même répertoire, exécutez la commande ci-dessous, puis cliquer sur l'URL pour discuter avec votre agent.

```bash
pnpm start:client
```

> Lisez ensuite la [Documentation](https://bellaos.github.io/bella/) pour savoir comment personnaliser votre Bella.

---

### Démarrer automatiquement Bella

Le script de démarrage permet de configurer et d'exécuter Bella de manière automatisée :

```bash
sh scripts/start.sh
```

Pour des instructions détaillées sur l'utilisation du script de démarrage, y compris la gestion des caractère et le dépannage, voir notre [start-script](/docs/docs/guides/start-script.md).

**Note** : Le script de démarrage gère automatiquement toutes les dépendances, la configuration de l'environnement et la gestion des caractères.

---

#### Ressources additionnelles

Il vous faudra peut-être installer Sharp.
S'il y a une erreur lors du lancement du bot, essayez d'installer Sharp comme ceci :

```bash
pnpm install --include=optional sharp
```

---

### Modifier le caractère

1. Ouvrez `packages/core/src/defaultCharacter.ts` pour modifier le caractère par défaut. Décommentez et éditez.

2. Pour charger des caractères personnalisés :
    - Utilisez `pnpm start --characters="path/to/your/character.json"`.
    - Plusieurs fichiers de caractères peuvent être chargés simultanément
3. Se connecter avec X (Twitter)
    - changez `"clients" : []` en `"clients" : ["twitter"]` dans le fichier de caractères pour se connecter à X

---

#### Exigences supplémentaires

Il se peut que vous deviez installer Sharp. Si vous voyez une erreur au démarrage, essayez de l'installer avec la commande suivante :

```bash
pnpm install --include=optional sharp
```

---

### Démarrer Bella avec Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/bellaos/bella/tree/main)

---

### Déployer Bella en un clic

Utilisez [Fleek](https://fleek.xyz/bella/) pour déployer Bella en un seul clic. Cela ouvre Bella aux non-développeurs et fournit les options suivantes pour construire votre agent :

1. Commencer par un modèle
2. Créer un fichier de caractères à partir de zéro
3. Télécharger un fichier de personnage pré-fabriqué

Cliquez [ici](https://fleek.xyz/bella/) pour commencer!

---

### Communauté et réseaux sociaux

-   [GitHub](https://github.com/bellaos/bella/issues). Pour partager les bugs découverts lors de l'utilisation d'Bella, et proposer de nouvelles fonctionnalités.
-   [Discord](https://discord.gg/ai16z). Pour partager ses applications et rencontrer la communauté.

## Contributeurs

<a href="https://github.com/bellaos/bella/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=bellaos/bella" />
</a>

## Historique d'étoiles

[![Star History Chart](https://api.star-history.com/svg?repos=bellaos/bella&type=Date)](https://star-history.com/#bellaos/bella&Date)
