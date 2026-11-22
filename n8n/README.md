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

## Automated Workflows

### 1. Recruiter & Opportunity Contact Workflow
- **Webhook Endpoint**: `http://Gezas-Mac-mini.local:5678/webhook/contact-submit`
- **Trigger**: Client submits the recruiter contact form at the bottom of the page (`#contact`)
- **Process**:
  1. Validates incoming submission fields (Name, Email, Message, Company, Role scope, Phone)
  2. Generates unique reference code (`sub_...`)
  3. Executes `save_contact.js` to persist safely into **SQLite Database** (`~/resume-ai/contacts.sqlite`)
  4. Appends audit log entry to `~/resume-ai/contacts.jsonl`
  5. Sends high-priority formatted HTML notification email to `ghorvath@gmail.com` with one-click reply
  6. Responds with JSON success confirmation to the browser

#### SQLite Schema (`~/resume-ai/contacts.sqlite`):
```sql
CREATE TABLE contacts (
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
);
```

---

### 2. AI Career Assistant Workflow
- **Webhook Endpoint**: `http://Gezas-Mac-mini.local:5678/webhook/resume-chat`
- **Trigger**: Visitor or recruiter asks a question in the career assistant
- **Process**:
  1. Webhook Trigger receives question (max 300 chars)
  2. Reads CV & Context Dossier dynamically (`~/.n8n-files/geza-cv-context.md`)
  3. Extracts text and constructs grounded system prompt
  4. Calls Ollama (`http://localhost:11434/api/generate`) with Qwen 2.5 7B
  5. Appends inquiry to `~/resume-ai/chat_inquiries.jsonl`
  6. Responds with JSON answer to client

---

## Logged Inquiries & Submissions
- **Contact Inquiries**: `~/resume-ai/contacts.sqlite` & `~/resume-ai/contacts.jsonl`
- **Chat Inquiries**: `~/resume-ai/chat_inquiries.jsonl`

