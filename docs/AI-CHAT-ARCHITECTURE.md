# Architecture Documentation: AI Resume Chat Assistant

**Owner:** Géza Horváth — ServiceNow Architect  
**Host Architecture:** Mac mini M4 (16GB Unified Memory, Gezas-Mac-mini.local)  
**Selected Production Ingress:** Option A — Tailscale Funnel (`https://<node>.<tailnet>.ts.net`)  
**Current Testing Mode:** Local Network Multi-Device Testing (`http://192.168.1.155:3000`)  
**Orchestration:** n8n Workflow  
**Inference Engine:** Ollama with `qwen2.5:7b-instruct`  
**Persistence:** Append-only JSONL (`chat_inquiries.jsonl`)  
**Frontends:** Original (Cream), Editorial (`/v3-mavrk/`), 21st.dev (`/v5-sidebar/`)

---

## Deployment Strategy: Option A (Tailscale Funnel)

Option A was confirmed as the target production deployment pattern:
- **Mac mini M4** runs `tailscale funnel --bg 5678`.
- Tailscale assigns a public HTTPS vanity endpoint (e.g. `https://gezas-mac-mini.<tailnet>.ts.net/webhook/resume-chat`) with automated SSL/TLS termination and DDoS mitigation.
- The website can be deployed statically anywhere (GitHub Pages, Vercel, Netlify, or standard web server) without requiring the hosting server or visitors to be on Tailscale.
- For current development, local network testing uses mDNS (`Gezas-Mac-mini.local`) and the local dev server reverse proxy (`/api/chat`).

---

## 1. System Architecture

```
+─────────────────────────────────────────────────────────────────────────+
│                           CLIENT BROWSER                                │
│                                                                         │
│  [Original (Cream)]      [Editorial (/v3-mavrk/)]    [21st.dev (/v5-)]  │
│          ▲                          ▲                        ▲          │
│          └──────────────────────────┼────────────────────────┘          │
│                                     │                                   │
│                        Floating AI Chat Widget                          │
│                      (shared/chat-widget.js & css)                      │
│                  - Quick prompt suggestion chips                        │
│                  - Adaptive color theming                               │
│                  - Client-side verified fallback                        │
+─────────────────────────────────────┼───────────────────────────────────+
                                      │ HTTPS POST (JSON)
                                      ▼
+─────────────────────────────────────────────────────────────────────────+
│                       TAILSCALE FUNNEL (INGRESS)                        │
│           Public HTTPS Endpoint: https://<node>.<tailnet>.ts.net        │
│          - Zero open ports on home router                               │
│          - End-to-end encrypted mesh routing                            │
│          - Automatic SSL/TLS termination                                │
+─────────────────────────────────────┼───────────────────────────────────+
                                      │ Forward to port 5678
                                      ▼
+─────────────────────────────────────────────────────────────────────────+
│               ALWAYS-ON HOST: MAC MINI M4 (16GB UNIFIED RAM)             │
│                     Hostname: Gezas-Mac-mini.local                      │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                          n8n WORKFLOW                             │  │
│  │                                                                   │  │
│  │  1. Webhook Node: POST /webhook/resume-chat                       │  │
│  │  2. Sanitizer Node: Bounds question (max 300 chars)               │  │
│  │  3. Context Node: Injects verified profile (knowledge-base.json)  │  │
│  │  4. HTTP Request Node: Calls Ollama localhost:11434               │  │
│  │  5. Response Formatter: Computes latency, builds JSON record      │  │
│  │  6. Persistence Node: Appends to ~/resume-ai/chat_inquiries.jsonl │  │
│  │  7. Webhook Response: Returns formatted JSON answer               │  │
│  └───────────────────────────────────┬───────────────────────────────┘  │
│                                      │                                  │
│                                      ▼                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     LOCAL OLLAMA INFERENCE                        │  │
│  │            Model: qwen2.5:7b-instruct (4-bit Q4_K_M)              │  │
│  │         - Apple Silicon Metal Unified Memory Acceleration         │  │
│  │         - Footprint: ~4.7 GB RAM (leaves >6 GB free)              │  │
│  │         - Speed: 35-45 tokens/sec (sub-2.5s complete response)    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
+─────────────────────────────────────────────────────────────────────────+
```

---

## 2. Strict Anti-Hallucination Grounding Strategy

Rather than using complex chunked vector RAG (which frequently causes retrieval misses on aggregated queries like *"How many total years has he worked in ServiceNow?"*), this system uses **Full In-Context Grounding**:

1. **Context Sizing:** The complete verified resume profile and pre-screened recruiter FAQs total **under 15 KB** (~2,500 tokens).
2. **Deterministic Coverage:** The complete profile is directly injected into the system prompt with strict negative boundary guardrails:
   - Must answer only from verified facts.
   - Refuses out-of-scope topics (general trivia, politics, compensation speculation).
   - Clarifies title distinction: ServiceNow Architect (not Lead).
   - Provides direct contact channels (`ghorvath@gmail.com`, LinkedIn) when information is not in the public profile.

---

## 3. Data Persistence Schema

Recruiter and visitor inquiries are logged to `~/resume-ai/chat_inquiries.jsonl`:

```json
{
  "timestamp": "2026-10-18T22:50:00.123Z",
  "sessionId": "sess_9k2m1b",
  "question": "How many years of ServiceNow experience does he have?",
  "answer": "Géza has 8+ years of dedicated, hands-on experience in the ServiceNow ecosystem, working from Senior Developer up to ServiceNow Architect.",
  "durationMs": 1380,
  "model": "qwen2.5:7b"
}
```

---

## 4. Frontend Integration & Color Themes

The floating drawer is implemented in Vanilla JavaScript and modern CSS:
- **Original (`/`):** Inherits warm cream canvas (`#FCFBF4`), deep slate typography, and warm amber accents.
- **Editorial (`/v3-mavrk/`):** Inherits high-contrast editorial poster styling with black borders, serif headlines, and red accents.
- **21st.dev (`/v5-sidebar/`):** Dynamically reacts to dark/light mode toggle with shadcn design tokens.

---

## 5. File Inventory

```
Projects/
├── shared/
│   ├── chat-widget.js          # Universal modular chat widget
│   ├── chat-widget.css         # Theme-adaptive styles
│   └── knowledge-base.json     # Ground truth verified resume & FAQ data
├── n8n/
│   ├── resume-chat-workflow.json # Ready-to-import n8n workflow
│   ├── setup-mac-mini.sh       # Ollama & Tailscale initialization script
│   ├── transfer-to-mac.sh      # SCP deployment script to Gezas-Mac-mini.local
│   └── README.md               # Mac mini setup guide
├── docs/
│   └── AI-CHAT-ARCHITECTURE.md # Architecture & technical documentation
├── index.html                  # Original Cream site with integrated chat
├── v3-mavrk/index.html         # Editorial site with integrated chat
└── v5-sidebar/index.html       # 21st.dev site with integrated chat
```
