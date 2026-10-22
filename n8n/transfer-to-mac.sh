#!/usr/bin/env bash
# ==============================================================================
# Deploy AI Resume Chat & Recruiter Contact Automation to Mac mini M4
# Target: gezahorvath@Gezas-Mac-mini.local:~/resume-ai/
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

MAC_HOST="${MAC_HOST:-Gezas-Mac-mini.local}"
MAC_USER="${MAC_USER:-gezahorvath}"
DEST_DIR="~/resume-ai"

echo "--------------------------------------------------------"
echo "📡 Deploying AI Chat & Contact Automation to ${MAC_USER}@${MAC_HOST}..."
echo "--------------------------------------------------------"

# 1. Create remote directories
ssh "${MAC_USER}@${MAC_HOST}" "mkdir -p ${DEST_DIR} ~/.n8n-files"

# 2. Transfer workflows, scripts, context files, and knowledge base
scp "${SCRIPT_DIR}/resume-chat-workflow.json" \
    "${SCRIPT_DIR}/contact-form-workflow.json" \
    "${SCRIPT_DIR}/save_contact.js" \
    "${SCRIPT_DIR}/geza-cv-context.md" \
    "${SCRIPT_DIR}/geza-cv-context.de.md" \
    "${SCRIPT_DIR}/geza-cv-context.hu.md" \
    "${SCRIPT_DIR}/setup-mac-mini.sh" \
    "${SCRIPT_DIR}/README.md" \
    "${REPO_ROOT}/shared/knowledge-base.json" \
    "${MAC_USER}@${MAC_HOST}:${DEST_DIR}/"

# 3. Configure permissions and sandbox files
ssh "${MAC_USER}@${MAC_HOST}" 'bash -s' << 'EOF'
  set -e
  cp ~/resume-ai/geza-cv-context*.md ~/.n8n-files/
  chmod +x ~/resume-ai/setup-mac-mini.sh ~/resume-ai/save_contact.js

  # Ensure contacts SQLite schema exists
  sqlite3 ~/resume-ai/contacts.sqlite 'CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    submission_id TEXT UNIQUE,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    role_or_interest TEXT,
    phone TEXT,
    message TEXT NOT NULL,
    source TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );'

  # Import/update n8n workflows using Node 20 (required by n8n v2)
  NODE_BIN="/usr/local/bin/node"
  N8N_BIN="/usr/local/bin/n8n"

  $NODE_BIN $N8N_BIN import:workflow --input=/Users/gezahorvath/resume-ai/contact-form-workflow.json 2>/dev/null || true
  $NODE_BIN $N8N_BIN import:workflow --input=/Users/gezahorvath/resume-ai/resume-chat-workflow.json 2>/dev/null || true

  # Ensure Contact Form workflow is active
  CONTACT_WF_ID=$(sqlite3 ~/.n8n/database.sqlite "SELECT id FROM workflow_entity WHERE name LIKE '%Contact%Form%' ORDER BY updatedAt DESC LIMIT 1;")
  if [ -n "$CONTACT_WF_ID" ]; then
    echo "Publishing Contact Form Workflow ID: $CONTACT_WF_ID"
    $NODE_BIN $N8N_BIN publish:workflow --id="$CONTACT_WF_ID" 2>/dev/null || true
    sqlite3 ~/.n8n/database.sqlite "UPDATE workflow_entity SET active = 1 WHERE id = '$CONTACT_WF_ID';"
    sqlite3 ~/.n8n/database.sqlite "INSERT OR REPLACE INTO webhook_entity (workflowId, webhookPath, method, node, webhookId, pathLength) VALUES ('$CONTACT_WF_ID', 'contact-submit', 'POST', 'Webhook Trigger', '', 1);"
  fi

  # Ensure AI Resume Chat workflow is active (deactivate older duplicates)
  CHAT_WF_ID=$(sqlite3 ~/.n8n/database.sqlite "SELECT id FROM workflow_entity WHERE name LIKE '%Resume%Chat%' ORDER BY updatedAt DESC LIMIT 1;")
  if [ -n "$CHAT_WF_ID" ]; then
    echo "Publishing AI Resume Chat Workflow ID: $CHAT_WF_ID"
    sqlite3 ~/.n8n/database.sqlite "UPDATE workflow_entity SET active = 0 WHERE name LIKE '%Resume%Chat%' AND id != '$CHAT_WF_ID';"
    sqlite3 ~/.n8n/database.sqlite "UPDATE workflow_entity SET active = 1 WHERE id = '$CHAT_WF_ID';"
    $NODE_BIN $N8N_BIN publish:workflow --id="$CHAT_WF_ID" 2>/dev/null || true
    sqlite3 ~/.n8n/database.sqlite "DELETE FROM webhook_entity WHERE webhookPath = 'resume-chat';"
    sqlite3 ~/.n8n/database.sqlite "INSERT OR REPLACE INTO webhook_entity (workflowId, webhookPath, method, node, webhookId, pathLength) VALUES ('$CHAT_WF_ID', 'resume-chat', 'POST', 'Webhook Trigger', '', 1);"
  fi

  # Restart via PM2
  export PATH=/opt/homebrew/bin:/usr/local/bin:$PATH
  pm2 restart n8n-server --update-env
  pm2 save
EOF

echo "--------------------------------------------------------"
echo "✅ All workflows and scripts successfully deployed & live on ${MAC_HOST}!"
echo "Endpoints:"
echo " - AI Assistant:  http://${MAC_HOST}:5678/webhook/resume-chat"
echo " - Recruiter Form: http://${MAC_HOST}:5678/webhook/contact-submit"
echo "Database: ~/resume-ai/contacts.sqlite"
echo "--------------------------------------------------------"
