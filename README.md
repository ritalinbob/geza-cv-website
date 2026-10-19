# Geza CV Website

Personal portfolio and interactive resume website for **Géza Horváth**, ServiceNow Architect.

Features three curated responsive design variants and a live, grounded **AI Career Assistant** backed by an n8n workflow and local LLM inference.

---

## 🎨 Portfolio Versions

1. **Original (Cream):** `/index.html` — Clean, warm off-white (`#FCFBF4`) canvas inspired by Brittany Chiang with slate & amber typography.
2. **Editorial:** `/v3-mavrk/` — Bold editorial poster layout inspired by Kyle Shanks (mavrK) with newsprint beige, serif headlines, and high-contrast accents.
3. **21st.dev:** `/v5-sidebar/` — Modern sticky profile sidebar layout inspired by shadcn / 21st.dev with dynamic dark/light mode toggle.

---

## 🤖 AI Career Assistant

Directly embedded in the left sidebar below the navigation:
- **Prominent Search-Like Input:** Enlarged gradient-bordered input with soft drop shadow.
- **Animated 3D Thinking Orb:** Multi-layered luminous fluid orb simulating real-time processing.
- **Grounded Responses:** Answers strictly from Géza's verified profile and FAQ data ([`shared/knowledge-base.json`](shared/knowledge-base.json)).
- **Orchestration & Backend:** Connected via n8n webhook ([`n8n/resume-chat-workflow.json`](n8n/resume-chat-workflow.json)) to local Ollama inference (`qwen2.5:7b`).

---

## 🚀 Running Locally

```bash
# Start the local development server with /api/chat reverse proxy
python3 server.py
```
Open [http://localhost:3000/](http://localhost:3000/) in your browser.

---

## 📁 Repository Structure

```
├── index.html              # Original Cream portfolio
├── styles.css              # Styles for Original Cream
├── script.js               # Interactive interactions & clipboard helpers
├── server.py               # Dev server with /api/chat reverse proxy
├── v3-mavrk/               # Editorial poster style portfolio
├── v5-sidebar/             # 21st.dev shadcn sidebar portfolio
├── shared/
│   ├── chat-widget.js      # Inline AI Assistant & thinking orb logic
│   ├── chat-widget.css     # Theme-adaptive styles for AI Assistant
│   └── knowledge-base.json # Single source of truth for resume & FAQ data
├── n8n/
│   ├── resume-chat-workflow.json # Exported n8n workflow definition
│   ├── setup-mac-mini.sh   # Mac mini M4 setup script
│   ├── transfer-to-mac.sh  # SCP deployment script
│   └── README.md           # Mac mini M4 deployment documentation
└── docs/
    └── AI-CHAT-ARCHITECTURE.md # Full architecture specification
```
