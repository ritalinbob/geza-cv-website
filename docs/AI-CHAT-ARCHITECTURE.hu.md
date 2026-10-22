# Architektúra Dokumentáció: AI Karrier Asszisztens

**Tulajdonos:** Horváth Géza — ServiceNow Architekt  
**Kiszolgáló architektúra:** Mac mini M4 (16 GB Egyesített Memória, Gezas-Mac-mini.local)  
**Kiválasztott éles hozzáférés:** A opció — Tailscale Funnel (`https://<node>.<tailnet>.ts.net`)  
**Jelenlegi tesztkörnyezet:** Helyi hálózati többeszközös tesztelés (`http://192.168.1.155:3000`)  
**Munkafolyamat-vezérlés:** n8n Workflow  
**Inferencia motor:** Ollama `qwen2.5:7b-instruct` (angol/német) és `hermes3:8b` (magyar/többnyelvű)  
**Adattárolás:** Hozzáfűzéses JSONL (`chat_inquiries.jsonl`) & SQLite (`contacts.sqlite`)  
**Többnyelvű felület:** Angol, Német, Magyar (Editorial Slate & Buff stílus)

---

## Élesítési Stratégia: A Opció (Tailscale Funnel)

Az A opció került elfogadásra hivatalos éles működési modellként:
- A **Mac mini M4** futtatja a `tailscale funnel --bg 5678` parancsot.
- A Tailscale automatikus, publikus HTTPS címet biztosít (pl. `https://gezas-mac-mini.<tailnet>.ts.net/webhook/resume-chat`) beépített SSL/TLS titkosítással és DDoS védelemmel.
- A portfólió weboldal tetszőleges statikus tárhelyen futhat (GitHub Pages, Vercel, Netlify vagy saját szerver) anélkül, hogy a látogatóknak vagy a tárhelynek a Tailscale hálózaton kellene lenniük.
- Helyi fejlesztéshez az mDNS (`Gezas-Mac-mini.local`) és a beépített Python fordított proxy (`/api/chat` és `/api/contact`) szolgál.

---

## 1. Rendszerarchitektúra és Többnyelvű Működés

```
+─────────────────────────────────────────────────────────────────────────+
│                           LÁTOGATÓI BÖNGÉSZŐ                            │
│                                                                         │
│   [Nyelvválasztó: EN | DE | HU]  --->  Dinamikus felületváltás (i18n)   │
│                                                                         │
│                       Beépített AI Karrier Asszisztens                  │
│                        (shared/chat-widget.js & css)                    │
│                  - Gyors kérdésjavaslatok (Pills)                       │
│                  - Teljesen lefordított felhasználói felület            │
│                  - Nyelvkód küldése { language: "hu" | "de" }           │
│                  - Kliensoldali offline biztonsági tudásbázis           │
+─────────────────────────────────────┼───────────────────────────────────+
                                      │ HTTPS POST (JSON)
                                      ▼
+─────────────────────────────────────────────────────────────────────────+
│                       TAILSCALE FUNNEL (BEJÖVŐ KAPU)                    │
│           Publikus HTTPS Végpont: https://<node>.<tailnet>.ts.net       │
│          - Nulla nyitott port az otthoni routeren                       │
│          - Végpontok közötti titkosított hálózat                        │
│          - Automatikus SSL/TLS tanúsítvány                              │
+─────────────────────────────────────┼───────────────────────────────────+
                                      │ Továbbítás az 5678-as portra
                                      ▼
+─────────────────────────────────────────────────────────────────────────+
│               FOLYTONOSAN FUTÓ SZERVER: MAC MINI M4 (16GB RAM)          │
│                     Hálózatnév: Gezas-Mac-mini.local                    │
│                                                                         │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                          n8n WORKFLOW                             │  │
│  │                                                                   │  │
│  │  1. Webhook Node: POST /webhook/resume-chat                       │  │
│  │  2. Szanitálás & Nyelvi Útválasztás: Érvényesíti a kérdést/nyelvet│  │
│  │  3. Kontextus Betöltése: Megfelelő nyelvi dosszié olvasása        │  │
│  │     (geza-cv-context.md / .de.md / .hu.md)                        │  │
│  │  4. Intelligens Modellválasztás:                                  │  │
│  │     - EN / DE: qwen2.5:7b (gyors, kiváló német és angol)          │  │
│  │     - HU: hermes3:8b (hibátlan magyar nyelvtan & hangrend)        │  │
│  │  5. HTTP Request Node: Ollama hívás localhost:11434               │  │
│  │  6. Válasz Formázó: Késleltetés mérése és JSON összeállítása      │  │
│  │  7. Naplózás: Hozzáfűzés a ~/resume-ai/chat_inquiries.jsonl fájlba│  │
│  │  8. Webhook Válasz: Formázott JSON visszaküldése a böngészőnek    │  │
│  └───────────────────────────────────┬───────────────────────────────┘  │
│                                      │                                  │
│                                      ▼                                  │
│  ┌───────────────────────────────────────────────────────────────────┐  │
│  │                     HELYI OLLAMA INFERENCIA                       │  │
│  │         Modellek: qwen2.5:7b & hermes3:8b (4-bites Q4)            │  │
│  │         - Apple Silicon Metal Unified Memory hardveres gyorsítás  │  │
│  │         - Memóriahasználat: ~4.7 GB (több mint 6 GB szabad marad) │  │
│  │         - Sebesség: 35-45 token/másodperc (2 mp alatti válasz)    │  │
│  └───────────────────────────────────────────────────────────────────┘  │
+─────────────────────────────────────────────────────────────────────────+
```

---

## 2. Modellvizsgálat a Mac mini M4 (16 GB RAM) Hardveren

A Mac mini M4 hardverkorlátai (16 GB egyesített memória, melyből ~9.5 GB használható fel biztonságosan LLM futtatásra lapozófájl használata nélkül) alapján valós teszteket végeztünk mindhárom nyelven:

| Modell | Paraméterméret | Német Minőség | Magyar Minőség | RAM Igény | Értékelés |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Qwen 2.5 7B** (`qwen2.5:7b`) | 7.6B (Q4_K_M) | **Kiváló** (természetes, szabatos, udvarias) | **Korlátozott** (előfordulnak ragozási és hangrendi hibák, pl. *„projektök”*) | ~4.7 GB | **Első számú választás angolhoz és némethez** |
| **Hermes 3 8B** (`hermes3:8b`) | 8.0B (Llama 3.1 finomhangolás) | **Nagyon jó** (strukturált) | **Kiváló** (hibátlan magyar ragozás, természetes mondatszerkezet) | ~4.7 GB | **Első számú választás magyarhoz** |
| **Llama 3.1 8B** (`llama3.1:8b`) | 8.0B (Q4_K_M) | **Nagyon jó** | **Nagyon jó** | ~4.9 GB | Kiváló általános alternatíva |
| **Mistral NeMo 12B** (`mistral-nemo:12b`) | 12.2B (Tekken Tokenizer) | **Kiváló** | **Nagyon jó** | ~7.1 GB | Kiemelkedő európai nyelvi modell, de nagyobb a memóriaigénye |
| **Qwen 2.5 14B** (`qwen2.5:14b`) | 14.7B (Q4_K_M) | **Kiemelkedő** | **Jó** | ~9.0 GB | 16 GB RAM esetén szűkös egyéb háttérfolyamatok mellett |

---

## 3. Szigorú Tényalapú (Anti-Hallucinációs) Működés

A hagyományos, darabolt RAG helyett a rendszer **Teljes In-Context Megalapozást (Full In-Context Grounding)** alkalmaz:
1. A hitelesített szakmai profil és dosszié mindhárom nyelven rendelkezésre áll:
   - `geza-cv-context.md` (angol)
   - `geza-cv-context.de.md` (német)
   - `geza-cv-context.hu.md` (magyar)
2. Mivel a modell közvetlenül az adott nyelvű hiteles kontextust kapja, nem kell a műszaki szakkifejezéseket fordítania, így elkerülhető a félrefordítás.
3. Világos határok: Ha egy kérdés olyan adatra irányul, amely nem szerepel a hiteles profilban, az asszisztens udvariasan a közvetlen kapcsolatfelvételt javasolja (`ghorvath@gmail.com` vagy LinkedIn).

---

## 4. Fájlstruktúra

```
Projects/
├── shared/
│   ├── chat-widget.js          # Univerzális többnyelvű chat felület
│   ├── chat-widget.css         # Alkalmazkodó stíluslap
│   └── knowledge-base.json     # Többnyelvű offline tudásbázis (EN/DE/HU)
├── n8n/
│   ├── geza-cv-context.md      # Angol hiteles szakmai dosszié
│   ├── geza-cv-context.de.md   # Német szakmai dosszié
│   ├── geza-cv-context.hu.md   # Magyar szakmai dosszié
│   ├── resume-chat-workflow.json # n8n munkafolyamat nyelvi és modell-irányítással
│   ├── contact-form-workflow.json # Kapcsolatfelvételi munkafolyamat
│   ├── setup-mac-mini.sh       # Telepítő szkript Mac mini M4-re
│   └── README.md               # Telepítési és üzemeltetési útmutató
├── docs/
│   ├── AI-CHAT-ARCHITECTURE.md    # Angol nyelvű leírás
│   ├── AI-CHAT-ARCHITECTURE.de.md # Német nyelvű leírás
│   └── AI-CHAT-ARCHITECTURE.hu.md # Magyar nyelvű leírás
├── index.html                  # Főoldal stílusos nyelvválasztóval (EN | DE | HU)
├── script.js                   # Kliensoldali logika & i18n nyelvi motor
└── server.py                   # Helyi tesztszerver chat- és kontakt-proxyval
```
