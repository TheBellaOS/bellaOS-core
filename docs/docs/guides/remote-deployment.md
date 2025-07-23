---
sidebar_position: 13
---

# Deploying BellaOS to Production

A guide to deploying and maintaining an [BellaOS](https://github.com/bellaOS/bella) agent in a production environment.

## Assumptions

- Freshly installed Ubuntu 22.04 LTS
- RAM >= 4GB
- Disk space >= 20GB
- You have a user, not root, with sudo access that can ssh into the server

## Basic System Setup

A slightly opinionated list of tools that we need to install.

```bash
sudo apt update
sudo apt -y upgrade
sudo apt -y install \
    neovim \
    curl \
    git \
    unzip \
    zip \
    ntp \
    ufw \
    python3 \
    python3-pip
```

Configure and enable firewall.

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp
```

If you want to publicly expose the API, you can do so with:
```bash
sudo ufw allow 3000/tcp
```

Enable the firewall.

```bash
sudo ufw --force enable
```

Note: For a Discord bot, no additional ports need to be opened. The bot makes outbound connections to Discord's servers which are allowed by default.

### Locale

The following ensures that your agent's date and time matches yours. Adjust to suit.

```bash
sudo timedatectl set-timezone Europe/London
sudo locale-gen en_GB.UTF-8 > /dev/null
sudo update-locale LANG=en_GB.UTF-8
```

### Service user

Create a system user called `bella` with a home directory of `/opt/bellaos`.

```bash
sudo useradd -r -s /bin/bash -d /opt/bellaos -m bella
sudo chown -R bella:bella /opt/bellaos
sudo chmod 750 /opt/bellaos
```

## Install dependencies and configure the agent

Switch to the `bella` user and clone the repository. 

```bash
sudo su - bella # this puts you in /opt/bellaos

git clone https://github.com/bellaOS/bella.git
```

Switch to the latest release branch.
```bash
cd bella
git checkout $(git describe --tags --abbrev=0)
```

You can see which release you're on using `git status`.

```bash
bella@parzival:~$ git status
HEAD detached at v0.25.6-alpha.1
```

Install nvm.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
export NVM_DIR="$HOME/.nvm"
. "$NVM_DIR/nvm.sh"
```

Install the correct version of Node.js using nvm.
```bash
nvm install v23.3.0
nvm use v23.3.0
```

Install pnpm globally and verify the installation:
```bash
# Install pnpm
npm install -g pnpm
pnpm setup
source ~/.bashrc

# Verify pnpm installation and path
which pnpm
# Should output something like: /opt/bellaos/.local/share/pnpm/pnpm
```

Install and build the workspace.
```bash
pnpm install --no-frozen-lockfile
pnpm build
```

### Configure Environment
```bash
# Copy example environment file
cp -v .env.example .env
```
Make changes to the `.env` file for your production environment as required. 

For example, your `.env` might look like this for a simple Discord bot:
```bash
USE_CHARACTER_STORAGE=true

# Discord Configuration
DISCORD_APPLICATION_ID=...
DISCORD_API_TOKEN=...

# AI Provider Keys
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...
```

Setup a default character and storage for the character's state.
```bash
cd characters
ln -svf snoop.character.json default.character.json
cd ..
mkdir -p data/memory/default
chmod 750 data
```

### Shell Environment Setup

We need to properly configure the shell environment for the `bella` user so nvm/pnpm works:

```bash
sudo tee /opt/bellaos/.profile << 'EOL'
# NVM setup
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

# pnpm setup
export PNPM_HOME="$HOME/.local/share/pnpm"
case ":$PATH:" in
  *":$PNPM_HOME:"*) ;;
  *) export PATH="$PNPM_HOME:$PATH" ;;
esac
EOL
```

Set ownership of the profile file.

```bash
sudo chown bella:bella /opt/bellaos/.profile
```

### `systemd` Service

To enable bella to start automatically on boot, we need to create a systemd service.

Logout as `bella` using `CTRL-D`, which should drop you 
back into your user with sudo access.

Create the systemd service file:

```bash
sudo tee /etc/systemd/system/bella.service << 'EOL'
[Unit]
Description=Bella AI Chat Agent
After=network.target

[Service]
Type=simple
User=bella
WorkingDirectory=/opt/bellaos/bella

# Environment setup
Environment=NODE_ENV=production
Environment=HOME=/opt/bellaos
Environment=HTTP_PORT=3000
Environment=PATH=/opt/bellaos/.local/share/pnpm:/usr/local/bin:/usr/bin:/bin
Environment=NVM_DIR=/opt/bellaos/.nvm

# Source NVM and start app
ExecStart=/bin/bash -c '. $NVM_DIR/nvm.sh && exec pnpm start --characters="characters/default.character.json"'

# Logging
StandardOutput=append:/var/log/bella/bella.log
StandardError=append:/var/log/bella/bella-error.log

# Restart configuration
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOL
```

Create the log directory.
```bash
sudo mkdir -p /var/log/bella
sudo chown -R bella:bella /var/log/bella
```

Enable and start the service:
```bash
sudo systemctl daemon-reload
sudo systemctl enable bella
sudo systemctl start bella
```

The API should now be running on port 3000. Note that external access to this port is blocked by default unless you explicitly allowed it in the firewall configuration during basic system setup.

If you need to troubleshoot, you can:
```bash
# Check service status
sudo systemctl status bella

# View service logs with journald
sudo journalctl -u bella -f
```

## FAQ

### How do I run multiple agents?
Create separate characterfiles or Docker containers for each agent with unique configurations and credentials.

### What are the resource requirements?
Minimum >=4GB recommended and 20G disk space is recommended. CUDA optional unless using local LLMs.
