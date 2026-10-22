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
│  │  3. Context Node: Injects localized profile (geza-cv-context.md / .de.md / .hu.md)│  │
│  │  4. Model Router: Routes to qwen2.5:7b (EN/DE) or hermes3:8b (HU)  │  │
│  │  5. HTTP Request Node: Calls Ollama localhost:11434               │  │
│  │  6. Response Formatter: Computes latency, builds JSON record      │  │
│  │  7. Persistence Node: Appends to ~/resume-ai/chat_inquiries.jsonl │  │
│  │  8. Webhook Response: Returns formatted JSON answer               │  │
│  └───────────────────────────────────┬───────────────────────────────┘  │
│                                      │                                  │
│                                      ▼                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     LOCAL OLLAMA INFERENCE                        │  │
│  │     Models: qwen2.5:7b (EN/DE) & hermes3:8b (HU) (4-bit Q4)       │  │
│  │         - Apple Silicon Metal Unified Memory Acceleration         │  │
│  │         - Footprint: ~4.7 GB RAM (leaves >6 GB free on 16GB Mac)  │  │
│  │         - Speed: 35-45 tokens/sec (sub-2s complete response)      │  │
│  └───────────────────────────────────────────────────────────────────┘  │
+─────────────────────────────────────────────────────────────────────────+
```

---

## 2. Multilingual Model Benchmarks on Mac mini M4 (16GB RAM)

With 16GB of Unified Memory, macOS and basic daemon processes reserve ~5-6 GB, leaving **~9-10 GB safely available for LLM weights and KV cache** without triggering memory swapping.

Live benchmarks were conducted on `Gezas-Mac-mini.local`:

| Model | Size & Quant | German Fluency | Hungarian Grammar & Morphology | RAM Usage | Deployment Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Qwen 2.5 7B** (`qwen2.5:7b`) | 7.6B (Q4_K_M) | **Flawless** (natural enterprise tone) | **Impaired** (exhibits vowel harmony errors like *"projektök"* and awkward case inflection) | ~4.7 GB | **Primary model for English and German** |
| **Hermes 3 8B** (`hermes3:8b` / Llama 3.1) | 8.0B (Q4_0) | **Very Good** | **Flawless** (accurate vowel harmony, natural Hungarian sentence structure) | ~4.7 GB | **Primary model for Hungarian** (Already installed on Mac mini) |
| **Llama 3.1 8B** (`llama3.1:8b`) | 8.0B (Q4_K_M) | **Very Good** | **Very Good** | ~4.9 GB | Excellent alternative multilingual all-rounder |
| **Mistral NeMo 12B** (`mistral-nemo:12b`) | 12.2B (Tekken Tokenizer) | **Excellent** | **Very Good** | ~7.1 GB | High-quality European multilingual model, higher VRAM footprint |
| **Qwen 2.5 14B** (`qwen2.5:14b`) | 14.7B (Q4_K_M) | **Superb** | **Good** | ~9.0 GB | Tighter memory fit on 16GB system when running alongside n8n |

### Dynamic Model Routing in n8n:
The n8n workflow reads the incoming `language` parameter (`en`, `de`, `hu`):
- If `language === 'hu'`, Ollama invokes `hermes3:8b` with `geza-cv-context.hu.md`.
- If `language === 'de'` or `language === 'en'`, Ollama invokes `qwen2.5:7b` with the corresponding language context.

---

## 3. Strict Anti-Hallucination Grounding Strategy

Rather than using complex chunked vector RAG (which frequently causes retrieval misses on aggregated queries like *"How many total years has he worked in ServiceNow?"*), this system uses **Full In-Context Grounding**:

1. **Native Context Files:** Separate, verified profile dossiers in each language (`geza-cv-context.md`, `geza-cv-context.de.md`, `geza-cv-context.hu.md`) eliminate translation latency and translation inaccuracies.
2. **Context Sizing:** The complete verified resume profile totals under 12 KB (~2,500 tokens).
3. **Deterministic Guardrails:** The complete profile is directly injected into the system prompt with strict negative boundary rules:
   - Must answer only from verified facts.
   - Refuses out-of-scope topics (general trivia, politics, compensation speculation).
   - Clarifies title distinction: ServiceNow Architect (not Lead).
   - Provides direct contact channels (`ghorvath@gmail.com`, LinkedIn) when information is not in the public profile.

---

## 4. Data Persistence Schema

Recruiter and visitor inquiries are logged to `~/resume-ai/chat_inquiries.jsonl`:

```json
{
  "timestamp": "2026-10-22T23:30:00.123Z",
  "sessionId": "sess_9k2m1b",
  "question": "Hány év ServiceNow tapasztalattal rendelkezik Géza?",
  "answer": "Géza Horváth 8+ év dedikált ServiceNow tapasztalattal rendelkezik (2018 óta), szenior fejlesztőtől ServiceNow architekt szintig.",
  "durationMs": 1420,
  "model": "hermes3:8b",
  "language": "hu"
}
```

---

## 5. File Inventory

```
Projects/
├── shared/
│   ├── chat-widget.js          # Universal multilingual chat widget
│   ├── chat-widget.css         # Theme-adaptive styles
│   └── knowledge-base.json     # Multilingual offline fallback knowledge base (EN/DE/HU)
├── n8n/
│   ├── geza-cv-context.md      # English profile dossier
│   ├── geza-cv-context.de.md   # German profile dossier
│   ├── geza-cv-context.hu.md   # Hungarian profile dossier
│   ├── resume-chat-workflow.json # n8n workflow with language & model routing
│   ├── contact-form-workflow.json # Recruiter contact form workflow
│   ├── setup-mac-mini.sh       # Ollama & Tailscale initialization script
│   └── README.md               # Mac mini setup guide
├── docs/
│   ├── AI-CHAT-ARCHITECTURE.md    # English architecture documentation
│   ├── AI-CHAT-ARCHITECTURE.de.md # German architecture documentation
│   └── AI-CHAT-ARCHITECTURE.hu.md # Hungarian architecture documentation
├── index.html                  # Main site with editorial language picker (EN | DE | HU)
├── script.js                   # Interactive behaviors & i18n translation engine
└── server.py                   # Development server with /api/chat & /api/contact proxies
```
