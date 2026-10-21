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
   ├── 1. Webhook Trigger receives question (max 300 chars)
   ├── 2. Reads CV & Context Dossier dynamically (~/.n8n-files/geza-cv-context.md)
   ├── 3. Extracts text and constructs grounded system prompt
   ├── 4. Calls Ollama (http://localhost:11434/api/generate) with Qwen 2.5 7B
   ├── 5. Appends inquiry to ~/resume-ai/chat_inquiries.jsonl
   └── 6. Responds with JSON answer to client
```

---

## Quick-Start on Mac mini M4

### Step 1: Deploy files to Mac mini
From this machine, run the automated transfer script:
```bash
./n8n/transfer-to-mac.sh
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
If running n8n via PM2 on the Mac mini:
```bash
pm2 restart n8n-server
```
Or if running directly:
```bash
n8n start
```

### Step 4: Workflow & Dynamic Context File
The workflow reads `geza-cv-context.md` from disk on every invocation. 
Whenever you update your CV or add more personality/work-style context to `geza-cv-context.md`, simply transfer it:
```bash
scp n8n/geza-cv-context.md gezahorvath@Gezas-Mac-mini.local:~/resume-ai/
```
The AI model will immediately begin answering with the latest file content on its very next prompt without needing workflow re-imports or restarts!

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
