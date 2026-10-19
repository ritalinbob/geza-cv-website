# AI Resume Chat Assistant — Mac mini M4 Deployment Guide

This directory contains the self-contained backend package for running Géza Horváth's recruiter-facing AI Chat Assistant on his **Mac mini M4** (`Gezas-Mac-mini.local`).

---

## Architecture Overview

```
Client Browser (Website)
   │
   ▼
Tailscale Funnel (https://your-mac-name.ts.net/webhook/resume-chat)
   │
   ▼
Mac mini M4: n8n Workflow (Port 5678)
   ├── 1. Validates & bounds recruiter question (max 300 chars)
   ├── 2. Injects system prompt + verified profile (knowledge-base.json)
   ├── 3. Calls Ollama (http://localhost:11434/api/generate) with Qwen 2.5 7B
   ├── 4. Appends inquiry to ~/resume-ai/chat_inquiries.jsonl
   └── 5. Responds with JSON answer to client
```

---

## Quick-Start on Mac mini M4

### Step 1: Deploy files to Mac mini
From this machine, run the automated transfer script:
```bash
bash /home/gezahorvath/Projects/n8n/transfer-to-mac.sh
```
*(Or transfer manually via scp to `gezahorvath@Gezas-Mac-mini.local:~/resume-ai/`)*

### Step 2: Initialize Ollama & Model on Mac mini
SSH into your Mac mini:
```bash
ssh gezahorvath@Gezas-Mac-mini.local
cd ~/resume-ai
chmod +x setup-mac-mini.sh
./setup-mac-mini.sh
```

### Step 3: Start n8n
If running n8n via Docker on the Mac mini:
```bash
docker run -d \
  --name n8n \
  --restart unless-stopped \
  -p 5678:5678 \
  -e N8N_DEFAULT_BINARY_DATA_MODE=filesystem \
  -v ~/.n8n:/home/node/.n8n \
  -v ~/resume-ai:/home/node/resume-ai \
  n8nio/n8n
```
Or if running directly via npm:
```bash
npx n8n
```

### Step 4: Import the Workflow
1. Open n8n in your browser: `http://localhost:5678` (or `http://Gezas-Mac-mini.local:5678`).
2. Go to **Workflows** -> click **Add Workflow** -> click the **...** menu -> select **Import from File**.
3. Choose `~/resume-ai/resume-chat-workflow.json`.
4. Toggle the workflow to **Active**.

### Step 5: Enable Tailscale Funnel for Public Ingress
To make the webhook securely accessible by the public website without port-forwarding:
```bash
tailscale funnel --bg 5678
```
Tailscale will display your public HTTPS URL (e.g., `https://macmini.<tailnet>.ts.net/webhook/resume-chat`).

Configure this URL in the portfolio website's `ResumeChat.init({ endpoint: "https://..." })`.

---

## Logged Inquiries
Every question asked by visitors or recruiters is appended to:
`~/resume-ai/chat_inquiries.jsonl`

Example record:
```json
{"timestamp":"2026-10-18T22:50:00Z","sessionId":"sess_8f3a9d","question":"How many years of ServiceNow experience does he have?","answer":"Géza has 8+ years of dedicated, hands-on experience in the ServiceNow ecosystem (since 2018)...","durationMs":1410,"model":"qwen2.5:7b"}
```
