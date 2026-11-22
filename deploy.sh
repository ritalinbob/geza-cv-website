#!/usr/bin/env bash
# ==============================================================================
# Deploy Geza CV Portfolio & AI Assistant to Production Server (217.144.53.66)
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_USER="${SERVER_USER:-hambrus}"
SERVER_HOST="${SERVER_HOST:-217.144.53.66}"
DEST_DIR="/home/${SERVER_USER}/geza-cv-website"

echo "--------------------------------------------------------"
echo "🚀 Deploying geza-cv-website to ${SERVER_USER}@${SERVER_HOST}:${DEST_DIR}..."
echo "--------------------------------------------------------"

# 1. Ensure target directory exists on server
ssh "${SERVER_USER}@${SERVER_HOST}" "mkdir -p ${DEST_DIR}"

# 2. Sync website files excluding git and temporary directories
rsync -avz --delete \
  --exclude '.git' \
  --exclude '.DS_Store' \
  --exclude 'n8n/database.sqlite' \
  --exclude 'n8n/contacts.sqlite' \
  "${SCRIPT_DIR}/" \
  "${SERVER_USER}@${SERVER_HOST}:${DEST_DIR}/"

# 3. Ensure server.py is executable
ssh "${SERVER_USER}@${SERVER_HOST}" "chmod +x ${DEST_DIR}/server.py"

# 4. Manage PM2 process for geza-cv
ssh "${SERVER_USER}@${SERVER_HOST}" 'bash -s' << 'EOF'
  set -e
  export PATH=/opt/homebrew/bin:/usr/local/bin:/usr/bin:$PATH

  # Check if pm2 is managing geza-cv
  if pm2 describe geza-cv > /dev/null 2>&1; then
    echo "🔄 Restarting geza-cv PM2 process..."
    pm2 restart geza-cv
  else
    echo "▶️ Starting geza-cv PM2 process on port 3030..."
    cd /home/hambrus/geza-cv-website
    PORT=3030 pm2 start server.py --name "geza-cv" --interpreter python3
    pm2 save
  fi

  echo "Current PM2 status:"
  pm2 list
EOF

echo "--------------------------------------------------------"
echo "✅ Application files synced and PM2 process active!"
echo "--------------------------------------------------------"
