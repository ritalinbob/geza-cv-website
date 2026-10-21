#!/usr/bin/env bash
# ==============================================================================
# Transfer AI Resume Chat Bundle to Mac mini M4
# Target: gezahorvath@Gezas-Mac-mini.local:~/resume-ai/
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

MAC_HOST="${MAC_HOST:-Gezas-Mac-mini.local}"
MAC_USER="${MAC_USER:-gezahorvath}"
DEST_DIR="~/resume-ai"

echo "--------------------------------------------------------"
echo "📡 Deploying AI Chat Bundle to ${MAC_USER}@${MAC_HOST}..."
echo "--------------------------------------------------------"

# 1. Create remote directories
ssh "${MAC_USER}@${MAC_HOST}" "mkdir -p ${DEST_DIR} ~/.n8n-files"

# 2. Transfer workflow, setup script, context file, and knowledge base
scp "${SCRIPT_DIR}/resume-chat-workflow.json" \
    "${SCRIPT_DIR}/geza-cv-context.md" \
    "${SCRIPT_DIR}/setup-mac-mini.sh" \
    "${SCRIPT_DIR}/README.md" \
    "${REPO_ROOT}/shared/knowledge-base.json" \
    "${MAC_USER}@${MAC_HOST}:${DEST_DIR}/"

# 3. Copy context file to ~/.n8n-files so n8n file-reader node has sandbox access
ssh "${MAC_USER}@${MAC_HOST}" "cp ~/resume-ai/geza-cv-context.md ~/.n8n-files/geza-cv-context.md && chmod +x ${DEST_DIR}/setup-mac-mini.sh"

echo "✅ All files successfully deployed to ${MAC_HOST}:${DEST_DIR}/"
echo "Context file placed in ~/.n8n-files/geza-cv-context.md"
echo "--------------------------------------------------------"
