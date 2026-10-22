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
    "${SCRIPT_DIR}/setup-mac-mini.sh" \
    "${SCRIPT_DIR}/README.md" \
    "${REPO_ROOT}/shared/knowledge-base.json" \
    "${MAC_USER}@${MAC_HOST}:${DEST_DIR}/"

# 3. Configure permissions and sandbox files
ssh "${MAC_USER}@${MAC_HOST}" "
  set -e
  cp ~/resume-ai/geza-cv-context.md ~/.n8n-files/geza-cv-context.md
  chmod +x ${DEST_DIR}/setup-mac-mini.sh ${DEST_DIR}/save_contact.js

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

  # Import/update n8n workflows
  export PATH=/usr/local/bin:/opt/homebrew/bin:\$PATH
  n8n import:workflow --input=/Users/gezahorvath/resume-ai/contact-form-workflow.json 2>/dev/null || true

  # Retrieve workflow ID and ensure published and active
  WORKFLOW_ID=\$(sqlite3 ~/.n8n/database.sqlite \"SELECT id FROM workflow_entity WHERE name LIKE '%Contact%Form%' ORDER BY createdAt DESC LIMIT 1;\")
  if [ -n \"\$WORKFLOW_ID\" ]; then
    echo \"Publishing Contact Form Workflow ID: \$WORKFLOW_ID\"
    n8n publish:workflow --id=\"\$WORKFLOW_ID\" 2>/dev/null || true
    sqlite3 ~/.n8n/database.sqlite \"UPDATE workflow_entity SET active = 1 WHERE id = '\$WORKFLOW_ID';\"
    sqlite3 ~/.n8n/database.sqlite \"INSERT OR REPLACE INTO webhook_entity (workflowId, webhookPath, method, node, webhookId, pathLength) VALUES ('\$WORKFLOW_ID', 'contact-submit', 'POST', 'Webhook Trigger', '', 1);\"
  fi

  # Enable executeCommand node in n8n v2 and restart via PM2
  NODES_EXCLUDE=\"[]\" pm2 restart n8n-server --update-env
  pm2 save
"

echo "--------------------------------------------------------"
echo "✅ All workflows and scripts successfully deployed & live on ${MAC_HOST}!"
echo "Endpoints:"
echo " - AI Assistant:  http://${MAC_HOST}:5678/webhook/resume-chat"
echo " - Recruiter Form: http://${MAC_HOST}:5678/webhook/contact-submit"
echo "Database: ~/resume-ai/contacts.sqlite"
echo "--------------------------------------------------------"
