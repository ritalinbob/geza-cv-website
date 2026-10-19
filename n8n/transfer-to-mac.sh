#!/usr/bin/env bash
# ==============================================================================
# Transfer AI Resume Chat Bundle to Mac mini M4
# Target: gezahorvath@Gezas-Mac-mini.local:~/resume-ai/
# ==============================================================================

set -e

MAC_HOST="Gezas-Mac-mini.local"
MAC_USER="gezahorvath"
DEST_DIR="~/resume-ai"

echo "--------------------------------------------------------"
echo "📡 Deploying AI Chat Bundle to ${MAC_USER}@${MAC_HOST}..."
echo "--------------------------------------------------------"

# 1. Create remote directory
ssh "${MAC_USER}@${MAC_HOST}" "mkdir -p ${DEST_DIR}"

# 2. Transfer workflow, setup script, and knowledge base
scp /home/gezahorvath/Projects/n8n/resume-chat-workflow.json \
    /home/gezahorvath/Projects/n8n/setup-mac-mini.sh \
    /home/gezahorvath/Projects/n8n/README.md \
    /home/gezahorvath/Projects/shared/knowledge-base.json \
    "${MAC_USER}@${MAC_HOST}:${DEST_DIR}/"

# 3. Make scripts executable on Mac mini
ssh "${MAC_USER}@${MAC_HOST}" "chmod +x ${DEST_DIR}/setup-mac-mini.sh"

echo "✅ All files successfully deployed to ${MAC_HOST}:${DEST_DIR}/"
echo "You can now SSH into your Mac mini and run:"
echo "  ssh ${MAC_USER}@${MAC_HOST}"
echo "  cd ~/resume-ai && ./setup-mac-mini.sh"
echo "--------------------------------------------------------"
