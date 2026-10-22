# Architektur-Dokumentation: KI-Karriereassistent

**Inhaber:** Géza Horváth — ServiceNow Architect  
**Host-Architektur:** Mac mini M4 (16 GB Unified Memory, Gezas-Mac-mini.local)  
**Gewählter Produktions-Ingress:** Option A — Tailscale Funnel (`https://<node>.<tailnet>.ts.net`)  
**Aktueller Testmodus:** Lokales Netzwerk Multi-Device (`http://192.168.1.155:3000`)  
**Orchestrierung:** n8n Workflow  
**Inferenz-Engine:** Ollama mit `qwen2.5:7b-instruct` (Englisch/Deutsch) und `hermes3:8b` (Ungarisch/Mehrsprachig)  
**Persistenz:** Append-only JSONL (`chat_inquiries.jsonl`) & SQLite (`contacts.sqlite`)  
**Mehrsprachige Frontends:** Deutsch, Englisch, Ungarisch (Editorial Slate & Buff Theme)

---

## Bereitstellungsstrategie: Option A (Tailscale Funnel)

Option A ist die standardmäßige Produktionsbereitstellung:
- **Mac mini M4** führt `tailscale funnel --bg 5678` aus.
- Tailscale vergibt einen öffentlichen HTTPS-Endpunkt (z. B. `https://gezas-mac-mini.<tailnet>.ts.net/webhook/resume-chat`) mit automatisierter SSL/TLS-Terminierung und DDoS-Schutz.
- Die Portfolio-Website kann statisch gehostet werden (GitHub Pages, Vercel, Netlify oder beliebiger Webserver), ohne dass Besucher oder der Hosting-Server im Tailscale-Netzwerk sein müssen.
- Für lokale Entwicklung und Multi-Device-Tests wird mDNS (`Gezas-Mac-mini.local`) sowie der integrierte Python Reverse-Proxy (`/api/chat` und `/api/contact`) genutzt.

---

## 1. Systemarchitektur & Mehrsprachiger Ablauf

```
+─────────────────────────────────────────────────────────────────────────+
+                           CLIENT-BROWSER                                │
+                                                                         │
+   [Sprachauswahl: EN | DE | HU]  --->  Dynamische Umschaltung (i18n)    │
+                                                                         │
+                      Integrierter KI-Chat-Assistent                     │
+                      (shared/chat-widget.js & css)                      │
+                  - Schnelle Themenvorschläge (Pills)                    │
+                  - Mehrsprachige Benutzeroberfläche                     │
+                  - Übermittelt Sprachcode { language: "de" | "hu" }     │
+                  - Lokaler clientseitiger Fallback (Knowledge Base)     │
+─────────────────────────────────────┼───────────────────────────────────+
                                      │ HTTPS POST (JSON)
                                      ▼
+─────────────────────────────────────────────────────────────────────────+
│                       TAILSCALE FUNNEL (INGRESS)                        │
│           Öffentlicher HTTPS-Endpunkt: https://<node>.<tailnet>.ts.net  │
│          - Keine offenen Ports am Heim-Router                           │
│          - Ende-zu-Ende verschlüsseltes Mesh-Routing                    │
│          - Automatische SSL/TLS-Zertifikate                             │
+─────────────────────────────────────┼───────────────────────────────────+
                                      │ Weiterleitung an Port 5678
                                      ▼
+─────────────────────────────────────────────────────────────────────────+
│               ALWAYS-ON HOST: MAC MINI M4 (16GB UNIFIED RAM)             │
│                     Hostname: Gezas-Mac-mini.local                      │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                          n8n WORKFLOW                             │  │
│  │                                                                   │  │
│  │  1. Webhook Node: POST /webhook/resume-chat                       │  │
│  │  2. Sanitizer & Language Router: Prüft Frage & gewählte Sprache  │  │
│  │  3. Kontext-Injektion: Lädt passendes Dossier                     │  │
│  │     (geza-cv-context.md / .de.md / .hu.md)                        │  │
│  │  4. Modell-Routing:                                               │  │
│  │     - EN / DE: qwen2.5:7b (hohe Geschwindigkeit, exzellent)       │  │
│  │     - HU: hermes3:8b (fehlerfreie Grammatik & Vokalharmonie)      │  │
│  │  5. HTTP Request Node: Ruft Ollama localhost:11434                │  │
│  │  6. Response Formatter: Berechnet Latenz, formatiert Antwort      │  │
│  │  7. Logging: Schreibt in ~/resume-ai/chat_inquiries.jsonl         │  │
│  │  8. Webhook Response: Sendet JSON-Antwort an Browser zurück       │  │
│  └───────────────────────────────────┬───────────────────────────────┘  │
│                                      │                                  │
│                                      ▼                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     LOKALE OLLAMA INFERENZ                        │  │
│  │         Modelle: qwen2.5:7b & hermes3:8b (4-bit Q4)               │  │
│  │         - Apple Silicon Metal Unified Memory Beschleunigung       │  │
│  │         - RAM-Bedarf: ~4.7 GB (hinterlässt >6 GB freien Speicher) │  │
│  │         - Geschwindigkeit: 35-45 Tokens/Sekunde (Sub-2s Antwort)  │  │
│  └───────────────────────────────────────────────────────────────────┘  │
+─────────────────────────────────────────────────────────────────────────+
```

---

## 2. Mehrsprachige Modellanalyse für Mac mini M4 (16 GB RAM)

Aufgrund der Hardware-Rahmenbedingungen (16 GB Unified Memory, davon ~9.5 GB sicher für LLM-Modelle nutzbar ohne Swap) wurden Praxistests durchgeführt:

| Modell | Parameter & Quant | Deutsch-Qualität | Ungarisch-Qualität | RAM-Bedarf | Empfehlung |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Qwen 2.5 7B** (`qwen2.5:7b`) | 7.6B (Q4_K_M) | **Exzellent** (flüssig, präzise, professionell) | **Eingeschränkt** (gelegentliche Vokalharmonie- und Beugungsfehler wie *„projektök“*) | ~4.7 GB | **Erste Wahl für DE & EN** |
| **Hermes 3 8B** (`hermes3:8b`) | 8.0B (Q4_0 / Llama 3.1 Basis) | **Sehr gut** (klar, strukturiert) | **Exzellent** (perfekte ungarische Grammatik, natürliche Satzstellung) | ~4.7 GB | **Erste Wahl für HU** |
| **Llama 3.1 8B** (`llama3.1:8b`) | 8.0B (Q4_K_M) | **Sehr gut** | **Sehr gut** | ~4.9 GB | Hervorragende Allround-Alternative |
| **Mistral NeMo 12B** (`mistral-nemo:12b`) | 12.2B (Tekken Tokenizer) | **Exzellent** | **Sehr gut** | ~7.1 GB | Starkes europäisches Modell, benötigt mehr VRAM |
| **Qwen 2.5 14B** (`qwen2.5:14b`) | 14.7B (Q4_K_M) | **Herausragend** | **Gut** | ~9.0 GB | Grenzwertig für 16 GB RAM bei gleichzeitigem n8n-Betrieb |

---

## 3. Grounding & Anti-Halluzinations-Strategie

Statt fehleranfälligem Chunk-RAG wird **Full In-Context Grounding** eingesetzt:
1. Das vollständige verifizierte Dossier liegt in den jeweiligen Sprachen vor:
   - `geza-cv-context.md` (Englisch)
   - `geza-cv-context.de.md` (Deutsch)
   - `geza-cv-context.hu.md` (Ungarisch)
2. Durch die Übergabe des muttersprachlichen Dossiers entfällt für das Modell die Notwendigkeit von Echtzeit-Fachübersetzungen, was semantische Fehler drastisch minimiert.
3. Klare Leitplanken: Bei Fragen außerhalb des verifizierten Profils verweist der Assistent direkt auf `ghorvath@gmail.com` oder LinkedIn.

---

## 4. Dateiverzeichnis

```
Projects/
├── shared/
│   ├── chat-widget.js          # Universelles, mehrsprachiges Chat-Widget
│   ├── chat-widget.css         # Theme-adaptive Stylesheets
│   └── knowledge-base.json     # Mehrsprachige Offline-Wissensbasis (EN/DE/HU)
├── n8n/
│   ├── geza-cv-context.md      # Englisches Master-Profildossier
│   ├── geza-cv-context.de.md   # Deutsches Profildossier
│   ├── geza-cv-context.hu.md   # Ungarisches Profildossier
│   ├── resume-chat-workflow.json # n8n-Workflow mit Sprach- & Modellrouting
│   ├── contact-form-workflow.json # Kontaktformular-Workflow
│   ├── setup-mac-mini.sh       # Initialisierungsskript für Mac mini M4
│   └── README.md               # Bereitstellungsdokumentation
├── docs/
│   ├── AI-CHAT-ARCHITECTURE.md    # Englische Dokumentation
│   ├── AI-CHAT-ARCHITECTURE.de.md # Deutsche Dokumentation
│   └── AI-CHAT-ARCHITECTURE.hu.md # Ungarische Dokumentation
├── index.html                  # Hauptseite mit Sprachwähler (EN | DE | HU)
├── script.js                   # Interaktive Logik & i18n Übersetzungssystem
└── server.py                   # Lokaler Webserver mit Chat- & Kontakt-Proxy
```
