/**
 * AI Career Assistant
 * Prominent sidebar section with:
 * - "Geza's AI Assistant" title, subtext & live online status
 * - Large gradient chat input (inspired by 21st.dev)
 * - Animated 3D-effect thinking orb (inspired by Dribbble)
 * - Appropriately sized answer bubble
 * - Full Multilingual Support: English ('en'), German ('de'), Hungarian ('hu')
 * - Dynamic architecture flowchart modal with localized explanations
 */

(function () {
  'use strict';

  var isLocalEnv = window.location.hostname === 'localhost' ||
                   window.location.hostname === '127.0.0.1' ||
                   window.location.hostname.endsWith('.local') ||
                   window.location.hostname.startsWith('192.168.');

  var CANDIDATE_ENDPOINTS = isLocalEnv ? [
    'http://Gezas-Mac-mini.local:5678/webhook/resume-chat',
    'http://192.168.1.128:5678/webhook/resume-chat',
    'http://192.168.1.248:5678/webhook/resume-chat',
    '/api/chat',
    'https://gezas-mac-mini.taild096ba.ts.net/webhook/resume-chat',
    'http://localhost:5678/webhook/resume-chat'
  ] : [
    '/api/chat',
    'https://gezas-mac-mini.taild096ba.ts.net/webhook/resume-chat'
  ];

  var activeEndpoint = CANDIDATE_ENDPOINTS[0];
  var sessionId = 'sess_' + Math.random().toString(36).substring(2, 10);
  var knowledgeBase = null;
  var currentLanguage = 'en';

  try {
    var storedLang = localStorage.getItem('preferred_language');
    if (storedLang && ['en', 'de', 'hu'].indexOf(storedLang) !== -1) {
      currentLanguage = storedLang;
    }
  } catch (e) {}

  var I18N = {
    en: {
      title: "Geza's AI Assistant",
      subtext: "ask me questions about Geza",
      placeholder: "Ask me questions about Geza...",
      online: "Online",
      archLink: "How this AI works · Architecture Flowchart",
      thinking: "Thinking",
      answeredIn: "⚡ Answered in ",
      answeredInSuffix: "s",
      verifiedProfile: "Verified Profile",
      qPrefix: "Q: ",
      close: "Close",
      pills: [
        { label: '💻 Software Development', query: 'How does Geza develop software?' },
        { label: '⚙️ ServiceNow Modules', query: 'What ServiceNow modules does Geza have experience with?' },
        { label: '🏆 Most Proud Of', query: 'What is Geza most proud of?' },
        { label: '⚡ OOB vs. Custom Code', query: "What is Geza's approach to Out-of-the-Box (OOB) vs. custom code?" }
      ],
      modal: {
        badge: "Architecture",
        badgeHighlight: "🔒 100% Private & Self-Hosted",
        heading: "How Geza's AI Assistant Works",
        subheading: "A simplified architecture walkthrough",
        step1Badge: "STEP 01",
        step1Title: "A Question is Asked",
        step1Desc: "A visitor or recruiter types a question into the website chat (e.g. <em>&ldquo;How many years of ServiceNow experience does Géza have?&rdquo;</em>).",
        step1Tag: "Visitor Browser",
        step1Subnote: "Clean input &middot; Browser",
        step2Badge: "STEP 02",
        step2Title: "Transmitted to Home Mac mini",
        step2Desc: "The question travels securely over an encrypted private mesh (n8n + Tailscale) directly to Géza's home Mac mini server in Vienna.",
        step2Tag: "Home Server",
        step2Subnote: "Mac mini M4 &middot; Encrypted",
        step3Badge: "STEP 03 &middot; CORE",
        step3Title: "Local LLM Constructs Answer",
        step3Desc: "A private AI model (Ollama) on the Mac mini retrieves verified resume details from an authentic knowledge base and constructs a factual answer.",
        step3Tag: "Local AI Model",
        step3Subnote: "Strictly grounded facts",
        step4Badge: "STEP 04",
        step4Title: "Answer Fed Back to Website",
        step4Desc: "The verified answer is fed back to the website in under 2 seconds, displaying cleanly in the conversation card with zero tracking.",
        step4Tag: "Real-Time Delivery",
        step4Subnote: "~1.8s response time",
        takeaway1Title: "Zero Third-Party Cloud Leaks",
        takeaway1Desc: "Your questions are never sent to external AI vendors like OpenAI or Google. Everything stays 100% private on Géza's own hardware.",
        takeaway2Title: "Anti-Hallucination Grounding",
        takeaway2Desc: "The model is strictly locked to Géza's real career milestones. It never invents certifications or exaggerates experience.",
        takeaway3Title: "Live Architectural Proof",
        takeaway3Desc: "Direct demonstration of Géza's enterprise skillset: secure tunneling, API automation (n8n), and local AI engineering.",
        footerHint: "Keyboard shortcut: Press <kbd>Esc</kbd> to exit",
        gotIt: "Got it, close"
      }
    },
    de: {
      title: "Gezas KI-Assistent",
      subtext: "stellen Sie mir Fragen zu Geza",
      placeholder: "Fragen zu Geza stellen...",
      online: "Online",
      archLink: "Funktionsweise der KI · Architektur-Ablaufdiagramm",
      thinking: "Denkt nach",
      answeredIn: "⚡ Beantwortet in ",
      answeredInSuffix: " s",
      verifiedProfile: "Verifiziertes Profil",
      qPrefix: "F: ",
      close: "Schließen",
      pills: [
        { label: '💻 Softwareentwicklung', query: 'Wie entwickelt Geza Software?' },
        { label: '⚙️ ServiceNow-Module', query: 'Mit welchen ServiceNow-Modulen hat Geza Erfahrung?' },
        { label: '🏆 Größter Stolz', query: 'Worauf ist Geza am meisten stolz?' },
        { label: '⚡ OOB vs. Custom Code', query: 'Wie ist Gezas Ansatz bei Standard (OOB) vs. individuellem Code?' }
      ],
      modal: {
        badge: "Architektur",
        badgeHighlight: "🔒 100% Privat & Selbst Gehostet",
        heading: "Wie Gezas KI-Assistent funktioniert",
        subheading: "Ein vereinfachter Architektur-Rundgang",
        step1Badge: "SCHRITT 01",
        step1Title: "Eine Frage wird gestellt",
        step1Desc: "Ein Besucher oder Recruiter tippt eine Frage in den Chat der Website ein (z. B. <em>„Wie viele Jahre ServiceNow-Erfahrung hat Géza?“</em>).",
        step1Tag: "Besucher-Browser",
        step1Subnote: "Saubere Eingabe &middot; Browser",
        step2Badge: "SCHRITT 02",
        step2Title: "Übertragung an den Heim-Mac-mini",
        step2Desc: "Die Frage wird sicher über ein verschlüsseltes privates Mesh-Netzwerk (n8n + Tailscale) direkt an Gézas Mac-mini-Server in Wien übertragen.",
        step2Tag: "Heim-Server",
        step2Subnote: "Mac mini M4 &middot; Verschlüsselt",
        step3Badge: "SCHRITT 03 &middot; KERN",
        step3Title: "Lokales LLM erstellt Antwort",
        step3Desc: "Ein privates KI-Modell (Ollama) auf dem Mac mini greift auf verifizierte Lebenslauf-Details zu und formuliert eine faktenbasierte Antwort.",
        step3Tag: "Lokales KI-Modell",
        step3Subnote: "Strikte Faktenbindung",
        step4Badge: "SCHRITT 04",
        step4Title: "Antwort zurück zur Website",
        step4Desc: "Die verifizierte Antwort wird in unter 2 Sekunden zurück an die Website übertragen und sauber ohne jegliches Tracking angezeigt.",
        step4Tag: "Echtzeit-Auslieferung",
        step4Subnote: "~1.8s Antwortzeit",
        takeaway1Title: "Keine Cloud-Datenweitergabe",
        takeaway1Desc: "Ihre Fragen werden niemals an externe KI-Anbieter wie OpenAI oder Google übermittelt. Alles bleibt 100% privat auf eigener Hardware.",
        takeaway2Title: "Schutz vor Halluzinationen",
        takeaway2Desc: "Das Modell ist strikt an Gézas reale Karrieremeilensteine gebunden. Es erfindet weder Zertifizierungen noch übertreibt es Erfahrungen.",
        takeaway3Title: "Praktischer Architekturbeweis",
        takeaway3Desc: "Direkte Demonstration von Gézas Kompetenzen: sicheres Tunneling, API-Automatisierung (n8n) und lokales KI-Engineering.",
        footerHint: "Tastaturkürzel: <kbd>Esc</kbd> drücken zum Schließen",
        gotIt: "Verstanden, schließen"
      }
    },
    hu: {
      title: "Géza AI Asszisztense",
      subtext: "tegyél fel kérdéseket Gézáról",
      placeholder: "Kérdezz Gézáról...",
      online: "Elérhető",
      archLink: "Hogyan működik ez az AI · Architektúra folyamatábra",
      thinking: "Gondolkodik",
      answeredIn: "⚡ Válaszolva ",
      answeredInSuffix: " mp alatt",
      verifiedProfile: "Hitelesített Profil",
      qPrefix: "K: ",
      close: "Bezárás",
      pills: [
        { label: '💻 Szoftverfejlesztés', query: 'Hogyan fejleszt szoftvert Géza?' },
        { label: '⚙️ ServiceNow Modulok', query: 'Milyen ServiceNow modulokban van tapasztalata Gézának?' },
        { label: '🏆 Legbüszkébb eredmény', query: 'Mire a legbüszkébb Géza?' },
        { label: '⚡ OOB vs. Egyedi Kód', query: 'Mi Géza hozzáállása az Out-of-the-Box (OOB) és az egyedi kód kérdéséhez?' }
      ],
      modal: {
        badge: "Architektúra",
        badgeHighlight: "🔒 100% Saját Kiszolgálón Fut",
        heading: "Hogyan működik Géza AI Asszisztense",
        subheading: "Egyszerűsített architektúra áttekintés",
        step1Badge: "01. LÉPÉS",
        step1Title: "Kérdés feltevése",
        step1Desc: "A látogató vagy toborzó kérdést ír be a weboldal csevegőjébe (pl. <em>„Hány év ServiceNow tapasztalattal rendelkezik Géza?”</em>).",
        step1Tag: "Látogatói Böngésző",
        step1Subnote: "Tiszta bemenet &middot; Böngésző",
        step2Badge: "02. LÉPÉS",
        step2Title: "Továbbítás az otthoni Mac minire",
        step2Desc: "A kérdés biztonságosan, titkosított privát hálózaton (n8n + Tailscale) fut be közvetlenül Géza bécsi Mac mini szerverére.",
        step2Tag: "Otthoni Szerver",
        step2Subnote: "Mac mini M4 &middot; Titkosított",
        step3Badge: "03. LÉPÉS &middot; KÖZPONTI",
        step3Title: "Helyi LLM összeállítja a választ",
        step3Desc: "A Mac minin futó privát AI modell (Ollama) hitelesített szakmai adatokat olvas be és tényszerű választ állít össze.",
        step3Tag: "Helyi AI Modell",
        step3Subnote: "Szigorúan tényalapú",
        step4Badge: "04. LÉPÉS",
        step4Title: "Válasz visszaküldése a weboldalra",
        step4Desc: "A hitelesített válasz kevesebb mint 2 másodpercen belül megjelenik a felületen, teljesen követés- és adatgyűjtés-mentesen.",
        step4Tag: "Valós idejű szállítás",
        step4Subnote: "~1.8s válaszidő",
        takeaway1Title: "Nulla Külső Felhős Adatszivárgás",
        takeaway1Desc: "A kérdések soha nem kerülnek külső AI szolgáltatókhoz (pl. OpenAI vagy Google). Minden 100%-ban privát marad Géza saját hardverén.",
        takeaway2Title: "Szigorú Tényalapú Működés",
        takeaway2Desc: "A modell kizárólag a valós szakmai eredményekre támaszkodik. Nem talál ki képesítéseket és nem túloz.",
        takeaway3Title: "Élő Architektúra Bizonyíték",
        takeaway3Desc: "Közvetlen demonstrációja Géza vállalati szakértelmének: biztonságos alagútkezelés, API automatizálás (n8n) és helyi AI mérnökség.",
        footerHint: "Gyorsbillentyű: <kbd>Esc</kbd> gomb a bezáráshoz",
        gotIt: "Értem, bezárás"
      }
    }
  };

  function getLangStrings() {
    return I18N[currentLanguage] || I18N.en;
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
  }

  function renderMarkdown(text) {
    if (!text) return '';
    var escaped = escapeHtml(text);
    // Bold: **text**
    escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Italic: *text*
    escaped = escaped.replace(/\*(.*?)\*/g, '<em>$1</em>');
    // Links: [text](url)
    escaped = escaped.replace(/\[(.*?)\]\((https?:\/\/.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Lists and line breaks
    var lines = escaped.split('\n');
    var inList = false;
    var html = [];

    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (line.startsWith('- ') || line.startsWith('* ')) {
        if (!inList) {
          html.push('<ul>');
          inList = true;
        }
        html.push('<li>' + line.substring(2) + '</li>');
      } else {
        if (inList) {
          html.push('</ul>');
          inList = false;
        }
        if (line.length > 0) {
          html.push('<p>' + line + '</p>');
        }
      }
    }
    if (inList) html.push('</ul>');
    return html.join('');
  }

  function loadKnowledgeBase(kbUrl) {
    if (knowledgeBase) return Promise.resolve(knowledgeBase);
    var url = kbUrl || (window.location.pathname.includes('/v') ? '../shared/knowledge-base.json' : 'shared/knowledge-base.json');
    return fetch(url)
      .then(function (res) { return res.json(); })
      .then(function (data) {
        knowledgeBase = data;
        return data;
      })
      .catch(function (err) {
        console.warn('[AIAssistant] Could not load knowledge base:', err);
        return null;
      });
  }

  function fallbackAnswer(question) {
    var q = question.toLowerCase();
    var t = getLangStrings();

    if (!knowledgeBase) {
      if (currentLanguage === 'de') {
        return "Géza Horváth ist ServiceNow Architect mit über 8 Jahren dedizierter Plattform-Erfahrung in Wien, Österreich. Kontaktieren Sie ihn direkt unter ghorvath@gmail.com oder auf [LinkedIn](https://www.linkedin.com/in/geza-horvath-16288a185).";
      } else if (currentLanguage === 'hu') {
        return "Horváth Géza ServiceNow Architekt több mint 8 év dedikált platformtapasztalattal Bécsben. Elérhetősége közvetlenül: ghorvath@gmail.com vagy [LinkedIn](https://www.linkedin.com/in/geza-horvath-16288a185).";
      }
      return "Géza Horváth is a ServiceNow Architect with 8+ years of dedicated platform experience based in Vienna, Austria. You can connect with him directly via email at ghorvath@gmail.com or on [LinkedIn](https://www.linkedin.com/in/geza-horvath-16288a185).";
    }

    var faqs = knowledgeBase.frequently_asked_recruiter_questions || [];
    if (currentLanguage !== 'en' && knowledgeBase.translations && knowledgeBase.translations[currentLanguage]) {
      faqs = knowledgeBase.translations[currentLanguage].frequently_asked_recruiter_questions || faqs;
    }

    for (var i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      var fq = faq.q.toLowerCase();
      if ((q.includes('year') || q.includes('how long') || q.includes('jahr') || q.includes('hány') || q.includes('tapasztalat')) && (fq.includes('year') || fq.includes('jahr') || fq.includes('tapasztalat'))) return faq.a;
      if ((q.includes('lead') || q.includes('title') || q.includes('role') || q.includes('titel') || q.includes('pozíció')) && (fq.includes('lead') || fq.includes('pozíció'))) return faq.a;
      if ((q.includes('integration') || q.includes('connect') || q.includes('api') || q.includes('rest') || q.includes('schnittstelle') || q.includes('integráció')) && (fq.includes('integration') || fq.includes('integráció'))) return faq.a;
      if ((q.includes('cmdb') || q.includes('discovery') || q.includes('csdm')) && fq.includes('cmdb')) return faq.a;
      if ((q.includes('cert') || q.includes('csa') || q.includes('cad') || q.includes('zertifikat') || q.includes('képesítés')) && (fq.includes('cert') || fq.includes('zertifikat') || fq.includes('tanúsítvány'))) return faq.a;
      if ((q.includes('location') || q.includes('remote') || q.includes('hybrid') || q.includes('vienna') || q.includes('wien') || q.includes('bécs') || q.includes('távmunka')) && (fq.includes('remote') || fq.includes('távmunka'))) return faq.a;
    }

    if (knowledgeBase.translations && knowledgeBase.translations[currentLanguage] && knowledgeBase.translations[currentLanguage].fallback_general) {
      return knowledgeBase.translations[currentLanguage].fallback_general;
    }

    if (currentLanguage === 'de') {
      return "Basierend auf Gézas verifiziertem Profil: ServiceNow Architect mit über 8 Jahren Erfahrung in Plattformarchitektur, Unternehmensintegrationen (Workday, Jira, Entra ID, BambooHR), CMDB/Discovery, HAM und Vulnerability Response. Kontaktieren Sie ihn direkt unter [ghorvath@gmail.com](mailto:ghorvath@gmail.com).";
    } else if (currentLanguage === 'hu') {
      return "Horváth Géza hitelesített szakmai profilja alapján: ServiceNow Architekt több mint 8 év tapasztalattal a platformarchitektúra, vállalati integrációk (Workday, Jira, Entra ID, BambooHR), CMDB/Discovery, HAM és Sérülékenységkezelés területén. Közvetlen kapcsolat: [ghorvath@gmail.com](mailto:ghorvath@gmail.com).";
    }

    return "Based on Géza's verified profile: ServiceNow Architect with 8+ years driving platform architecture, enterprise integrations (Workday, Jira, Entra ID, BambooHR), CMDB/Discovery, HAM, and Vulnerability Response. Contact him directly at [ghorvath@gmail.com](mailto:ghorvath@gmail.com).";
  }

  // Attempt fetch across candidate endpoints in order
  function queryBackend(question, endpoints, index) {
    if (index >= endpoints.length) {
      return Promise.reject(new Error('All backend endpoints unreachable'));
    }

    // Always ensure currentLanguage aligns with document html lang if set
    if (document.documentElement && document.documentElement.lang && ['en', 'de', 'hu'].indexOf(document.documentElement.lang) !== -1) {
      currentLanguage = document.documentElement.lang;
    }

    var targetUrl = endpoints[index];
    var controller = new AbortController();
    var timeoutId = setTimeout(function () { controller.abort(); }, 45000);

    return fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        question: question,
        language: currentLanguage,
        sessionId: sessionId,
        timestamp: new Date().toISOString()
      }),
      signal: controller.signal
    })
    .then(function (res) {
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      activeEndpoint = targetUrl;
      return { data: data, endpoint: targetUrl };
    })
    .catch(function (err) {
      clearTimeout(timeoutId);
      console.warn('[AIAssistant] Candidate unreachable: ' + targetUrl + ' (' + err.message + ')');
      return queryBackend(question, endpoints, index + 1);
    });
  }

  function updateWidgetText() {
    var container = document.getElementById('ai-cloud-container');
    if (!container) return;

    var t = getLangStrings();

    var titleEl = container.querySelector('.ai-section-title-text');
    if (titleEl) titleEl.textContent = t.title;

    var subtextEl = container.querySelector('.ai-section-subtext');
    if (subtextEl) subtextEl.textContent = t.subtext;

    var inputEl = container.querySelector('#ai-input-field');
    if (inputEl) inputEl.setAttribute('placeholder', t.placeholder);

    var statusEl = container.querySelector('.ai-status-label');
    if (statusEl) statusEl.textContent = t.online;

    var archBtnText = container.querySelector('.ai-arch-btn-text');
    if (archBtnText) archBtnText.innerHTML = t.archLink;

    // Update suggestion pills if enabled
    var pillsContainer = container.querySelector('#ai-suggestion-pills');
    if (pillsContainer) {
      pillsContainer.innerHTML = '';
      t.pills.forEach(function (pill) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ai-pill-btn';
        btn.textContent = pill.label;
        btn.addEventListener('click', function () {
          var input = container.querySelector('#ai-input-field');
          if (input) input.value = pill.query;
          handleSubmit(pill.query);
        });
        pillsContainer.appendChild(btn);
      });
    }

    // Update modal if currently rendered
    updateModalText();
  }

  function updateModalText() {
    var modal = document.getElementById('ai-arch-modal');
    if (!modal) return;

    var t = getLangStrings();
    var m = t.modal;

    var title = modal.querySelector('#ai-arch-modal-title');
    if (title) title.textContent = m.heading;

    var sub = modal.querySelector('.ai-arch-modal-subheading');
    if (sub) sub.textContent = m.subheading;

    var b1 = modal.querySelector('.ai-arch-badge-pill:not(.highlight)');
    if (b1) b1.textContent = m.badge;

    var b2 = modal.querySelector('.ai-arch-badge-pill.highlight');
    if (b2) b2.innerHTML = m.badgeHighlight;

    // Steps
    var steps = modal.querySelectorAll('.ai-flow-step');
    if (steps.length >= 4) {
      // Step 1
      steps[0].querySelector('.ai-step-badge').innerHTML = m.step1Badge;
      steps[0].querySelector('.ai-step-title').textContent = m.step1Title;
      steps[0].querySelector('.ai-step-desc').innerHTML = m.step1Desc;
      steps[0].querySelector('.ai-step-tag').textContent = m.step1Tag;
      steps[0].querySelector('.ai-step-subnote').innerHTML = m.step1Subnote;

      // Step 2
      steps[1].querySelector('.ai-step-badge').innerHTML = m.step2Badge;
      steps[1].querySelector('.ai-step-title').textContent = m.step2Title;
      steps[1].querySelector('.ai-step-desc').innerHTML = m.step2Desc;
      steps[1].querySelector('.ai-step-tag').textContent = m.step2Tag;
      steps[1].querySelector('.ai-step-subnote').innerHTML = m.step2Subnote;

      // Step 3
      steps[2].querySelector('.ai-step-badge').innerHTML = m.step3Badge;
      steps[2].querySelector('.ai-step-title').textContent = m.step3Title;
      steps[2].querySelector('.ai-step-desc').innerHTML = m.step3Desc;
      steps[2].querySelector('.ai-step-tag').textContent = m.step3Tag;
      steps[2].querySelector('.ai-step-subnote').innerHTML = m.step3Subnote;

      // Step 4
      steps[3].querySelector('.ai-step-badge').innerHTML = m.step4Badge;
      steps[3].querySelector('.ai-step-title').textContent = m.step4Title;
      steps[3].querySelector('.ai-step-desc').innerHTML = m.step4Desc;
      steps[3].querySelector('.ai-step-tag').textContent = m.step4Tag;
      steps[3].querySelector('.ai-step-subnote').innerHTML = m.step4Subnote;
    }

    // Takeaways
    var takeaways = modal.querySelectorAll('.ai-takeaway-card');
    if (takeaways.length >= 3) {
      takeaways[0].querySelector('.ai-takeaway-title').textContent = m.takeaway1Title;
      takeaways[0].querySelector('.ai-takeaway-desc').textContent = m.takeaway1Desc;

      takeaways[1].querySelector('.ai-takeaway-title').textContent = m.takeaway2Title;
      takeaways[1].querySelector('.ai-takeaway-desc').textContent = m.takeaway2Desc;

      takeaways[2].querySelector('.ai-takeaway-title').textContent = m.takeaway3Title;
      takeaways[2].querySelector('.ai-takeaway-desc').textContent = m.takeaway3Desc;
    }

    var hint = modal.querySelector('.ai-arch-footer-hint');
    if (hint) hint.innerHTML = m.footerHint;

    var gotItBtn = modal.querySelector('#ai-arch-modal-gotit');
    if (gotItBtn) gotItBtn.textContent = m.gotIt;
  }

  function initAssistant(options) {
    options = options || {};
    if (options.language && ['en', 'de', 'hu'].indexOf(options.language) !== -1) {
      currentLanguage = options.language;
    }
    loadKnowledgeBase(options.knowledgeBaseUrl);

    // Endpoints priority
    var endpointsToTry = [];
    if (options.endpoint) endpointsToTry.push(options.endpoint);
    CANDIDATE_ENDPOINTS.forEach(function (ep) {
      if (endpointsToTry.indexOf(ep) === -1) endpointsToTry.push(ep);
    });

    // Locate mounting point (prefer explicit #ai-cloud-container, then below .status-pill)
    var container = document.getElementById('ai-cloud-container');
    if (!container) {
      var anchor = document.querySelector('.status-pill') || document.querySelector('.sidebar-nav') || document.querySelector('.sidebar-actions') || document.querySelector('.contact-details');
      if (anchor && anchor.parentNode) {
        container = document.createElement('div');
        container.id = 'ai-cloud-container';
        anchor.parentNode.insertBefore(container, anchor.nextSibling);
      } else {
        container = document.createElement('div');
        container.id = 'ai-cloud-container';
        document.body.prepend(container);
      }
    }

    var t = getLangStrings();
    var showPills = Boolean(options.showPills);
    var pillsMarkup = showPills ? '<div class="ai-suggestion-pills" id="ai-suggestion-pills"></div>' : '';

    // Render Component HTML
    container.innerHTML = 
      '<div class="ai-assistant-container" aria-label="AI Assistant Section">' +
        '<div class="ai-section-header">' +
          '<div class="ai-titles">' +
            '<h3 class="ai-section-title">' +
              '<span class="ai-sparkle-icon">' +
                '<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">' +
                  '<path d="M12 0L14.6 9.4L24 12L14.6 14.6L12 24L9.4 14.6L0 12L9.4 9.4L12 0Z"/>' +
                '</svg>' +
              '</span>' +
              '<span class="ai-section-title-text">' + escapeHtml(t.title) + '</span>' +
            '</h3>' +
            '<p class="ai-section-subtext">' + escapeHtml(t.subtext) + '</p>' +
          '</div>' +
          '<div class="ai-status-badge" id="ai-status-badge">' +
            '<span class="ai-status-dot"></span>' +
            '<span class="ai-status-label">' + escapeHtml(t.online) + '</span>' +
          '</div>' +
        '</div>' +
        '<form class="ai-input-form" id="ai-input-form">' +
          '<input type="text" class="ai-input-field" id="ai-input-field" placeholder="' + escapeHtml(t.placeholder) + '" maxlength="200" autocomplete="off" />' +
          '<button type="submit" class="ai-send-btn" id="ai-send-btn" aria-label="Send question">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
              '<line x1="5" y1="12" x2="19" y2="12"></line>' +
              '<polyline points="12 5 19 12 12 19"></polyline>' +
            '</svg>' +
          '</button>' +
        '</form>' +
        pillsMarkup +
        '<div class="ai-stage" id="ai-stage" aria-live="polite"></div>' +
        '<div class="ai-arch-link-container">' +
          '<button type="button" class="ai-arch-trigger-btn" id="ai-arch-trigger-btn" aria-haspopup="dialog" aria-expanded="false" title="View AI Assistant Architecture Flowchart">' +
            '<span class="ai-arch-btn-icon">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<rect x="2" y="3" width="6" height="6" rx="1.5"/>' +
                '<rect x="16" y="3" width="6" height="6" rx="1.5"/>' +
                '<rect x="9" y="15" width="6" height="6" rx="1.5"/>' +
                '<path d="M5 9v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/>' +
                '<path d="M12 14v1"/>' +
              '</svg>' +
            '</span>' +
            '<span class="ai-arch-btn-text">' + t.archLink + '</span>' +
            '<span class="ai-arch-btn-arrow">&rarr;</span>' +
          '</button>' +
        '</div>' +
      '</div>';

    container.dataset.aiInitialized = 'true';

    var form = container.querySelector('#ai-input-form');
    var input = container.querySelector('#ai-input-field');
    var submitBtn = container.querySelector('#ai-send-btn');
    var pillsContainer = container.querySelector('#ai-suggestion-pills');
    var stage = container.querySelector('#ai-stage');
    var archTriggerBtn = container.querySelector('#ai-arch-trigger-btn');

    if (archTriggerBtn) {
      archTriggerBtn.addEventListener('click', function () {
        openArchitectureModal();
      });
    }

    // Populate quick pills only if explicitly enabled
    if (showPills && pillsContainer) {
      t.pills.forEach(function (pill) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'ai-pill-btn';
        btn.textContent = pill.label;
        btn.addEventListener('click', function () {
          input.value = pill.query;
          handleSubmit(pill.query);
        });
        pillsContainer.appendChild(btn);
      });
    }

    // Render 3D Thinking Orb (Processing State)
    function renderThinkingOrb() {
      var currentT = getLangStrings();
      stage.className = 'ai-stage active';
      stage.innerHTML = 
        '<div class="ai-thinking-card">' +
          '<div class="ai-orb-wrapper">' +
            '<div class="ai-orb-glow"></div>' +
            '<div class="ai-orb-core">' +
              '<div class="ai-orb-wave"></div>' +
            '</div>' +
          '</div>' +
          '<div class="ai-thinking-label">' +
            '<span>' + escapeHtml(currentT.thinking) + '</span>' +
            '<div class="ai-thinking-dots">' +
              '<span></span><span></span><span></span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    // Render Formed Answer Bubble
    function renderAnswerBubble(queryText, answerMarkdown, latencySec) {
      var currentT = getLangStrings();
      stage.className = 'ai-stage active';
      
      var latencyHtml = latencySec 
        ? '<span class="ai-bubble-latency">' + escapeHtml(currentT.answeredIn) + escapeHtml(latencySec) + escapeHtml(currentT.answeredInSuffix) + '</span>'
        : '<span class="ai-bubble-latency">' + escapeHtml(currentT.verifiedProfile) + '</span>';

      stage.innerHTML = 
        '<div class="ai-answer-bubble">' +
          '<div class="ai-bubble-header">' +
            '<span class="ai-question-tag" title="' + escapeHtml(queryText) + '">' + escapeHtml(currentT.qPrefix) + escapeHtml(queryText) + '</span>' +
            '<button type="button" class="ai-dismiss-btn" aria-label="' + escapeHtml(currentT.close) + '" title="' + escapeHtml(currentT.close) + '">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">' +
                '<line x1="18" y1="6" x2="6" y2="18"></line>' +
                '<line x1="6" y1="6" x2="18" y2="18"></line>' +
              '</svg>' +
            '</button>' +
          '</div>' +
          '<div class="ai-bubble-body">' +
            renderMarkdown(answerMarkdown) +
          '</div>' +
          '<div class="ai-bubble-footer">' +
            latencyHtml +
          '</div>' +
        '</div>';

      var dismissBtn = stage.querySelector('.ai-dismiss-btn');
      if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
          stage.className = 'ai-stage';
          stage.innerHTML = '';
        });
      }
    }

    function handleSubmit(question) {
      var q = (question || input.value || '').trim();
      if (!q) return;

      submitBtn.disabled = true;
      renderThinkingOrb();

      var startTime = Date.now();
      var prioritizedEndpoints = [activeEndpoint];
      endpointsToTry.forEach(function (ep) {
        if (prioritizedEndpoints.indexOf(ep) === -1) prioritizedEndpoints.push(ep);
      });

      queryBackend(q, prioritizedEndpoints, 0)
        .then(function (result) {
          submitBtn.disabled = false;
          var elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          var data = result.data;
          var answer = data.answer || data.response || data.text || "Thank you for asking. Please reach out to Géza directly at ghorvath@gmail.com.";
          renderAnswerBubble(q, answer, elapsedSec);
        })
        .catch(function (err) {
          submitBtn.disabled = false;
          console.warn('[AIAssistant] Falling back to verified knowledge base:', err);
          var fallback = fallbackAnswer(q);
          renderAnswerBubble(q, fallback, "0.1");
        });
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSubmit();
    });
  }

  // ==========================================================================
  // ARCHITECTURE FLOWCHART MODAL FRAME (Accessible, Centered, Multilingual)
  // ==========================================================================
  var lastFocusedElement = null;

  function createArchitectureModal() {
    var existingModal = document.getElementById('ai-arch-modal');
    if (existingModal) {
      updateModalText();
      return existingModal;
    }

    var t = getLangStrings();
    var m = t.modal;

    var modalWrapper = document.createElement('div');
    modalWrapper.id = 'ai-arch-modal';
    modalWrapper.className = 'ai-arch-modal-backdrop';
    modalWrapper.setAttribute('role', 'dialog');
    modalWrapper.setAttribute('aria-modal', 'true');
    modalWrapper.setAttribute('aria-labelledby', 'ai-arch-modal-title');
    modalWrapper.setAttribute('aria-hidden', 'true');
    modalWrapper.setAttribute('tabindex', '-1');

    modalWrapper.innerHTML = 
      '<div class="ai-arch-modal-frame" id="ai-arch-modal-frame" tabindex="0" role="document">' +
        '<!-- Modal Header -->' +
        '<div class="ai-arch-modal-header">' +
          '<div class="ai-arch-modal-titles">' +
            '<div class="ai-arch-badge-row">' +
              '<span class="ai-arch-badge-pill">' + escapeHtml(m.badge) + '</span>' +
              '<span class="ai-arch-badge-pill highlight">' + m.badgeHighlight + '</span>' +
            '</div>' +
            '<h2 id="ai-arch-modal-title" class="ai-arch-modal-heading">' + escapeHtml(m.heading) + '</h2>' +
            '<p class="ai-arch-modal-subheading">' + escapeHtml(m.subheading) + '</p>' +
          '</div>' +
          '<button type="button" class="ai-arch-close-btn" id="ai-arch-modal-close" aria-label="Close architecture popup" title="Close (Esc)">' +
            '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
              '<line x1="18" y1="6" x2="6" y2="18"></line>' +
              '<line x1="6" y1="6" x2="18" y2="18"></line>' +
            '</svg>' +
          '</button>' +
        '</div>' +

        '<!-- Modal Body -->' +
        '<div class="ai-arch-modal-body">' +

          '<!-- Simplified Layman Flowchart -->' +
          '<div class="ai-flowchart" aria-label="AI Architecture Flowchart">' +

            '<!-- Step 1: A Question is Asked -->' +
            '<div class="ai-flow-step" data-step="1">' +
              '<div class="ai-step-header">' +
                '<span class="ai-step-badge">' + m.step1Badge + '</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">' + escapeHtml(m.step1Title) + '</h3>' +
              '<p class="ai-step-desc">' + m.step1Desc + '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag">' + escapeHtml(m.step1Tag) + '</span>' +
                '<span class="ai-step-subnote">' + m.step1Subnote + '</span>' +
              '</div>' +
            '</div>' +

            '<!-- Flow Arrow 1 -> 2 -->' +
            '<div class="ai-flow-arrow" aria-hidden="true">' +
              '<span class="ai-arrow-line"></span>' +
              '<span class="ai-arrow-symbol">&rarr;</span>' +
            '</div>' +

            '<!-- Step 2: Transmitted to Home Mac mini Server -->' +
            '<div class="ai-flow-step" data-step="2">' +
              '<div class="ai-step-header">' +
                '<span class="ai-step-badge">' + m.step2Badge + '</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>' +
                    '<rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>' +
                    '<line x1="6" y1="6" x2="6.01" y2="6"></line>' +
                    '<line x1="6" y1="18" x2="6.01" y2="18"></line>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">' + escapeHtml(m.step2Title) + '</h3>' +
              '<p class="ai-step-desc">' + escapeHtml(m.step2Desc) + '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag">' + escapeHtml(m.step2Tag) + '</span>' +
                '<span class="ai-step-subnote">' + m.step2Subnote + '</span>' +
              '</div>' +
            '</div>' +

            '<!-- Flow Arrow 2 -> 3 -->' +
            '<div class="ai-flow-arrow" aria-hidden="true">' +
              '<span class="ai-arrow-line"></span>' +
              '<span class="ai-arrow-symbol">&rarr;</span>' +
            '</div>' +

            '<!-- Step 3: Local LLM Constructs Answer -->' +
            '<div class="ai-flow-step highlight-step" data-step="3">' +
              '<div class="ai-step-header">' +
                '<span class="ai-step-badge highlight">' + m.step3Badge + '</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.07 6.26 5 7.45V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.55c2.93-1.19 5-4.08 5-7.45a8 8 0 0 0-8-8z"/>' +
                    '<line x1="12" y1="9" x2="12" y2="13"/>' +
                    '<line x1="10" y1="11" x2="14" y2="11"/>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">' + escapeHtml(m.step3Title) + '</h3>' +
              '<p class="ai-step-desc">' + escapeHtml(m.step3Desc) + '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag accent">' + escapeHtml(m.step3Tag) + '</span>' +
                '<span class="ai-step-subnote">' + escapeHtml(m.step3Subnote) + '</span>' +
              '</div>' +
            '</div>' +

            '<!-- Flow Arrow 3 -> 4 -->' +
            '<div class="ai-flow-arrow" aria-hidden="true">' +
              '<span class="ai-arrow-line"></span>' +
              '<span class="ai-arrow-symbol">&rarr;</span>' +
            '</div>' +

            '<!-- Step 4: Answer is Fed Back to the Website -->' +
            '<div class="ai-flow-step" data-step="4">' +
              '<div class="ai-step-header">' +
                '<span class="ai-step-badge">' + m.step4Badge + '</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<polyline points="20 6 9 17 4 12"></polyline>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">' + escapeHtml(m.step4Title) + '</h3>' +
              '<p class="ai-step-desc">' + escapeHtml(m.step4Desc) + '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag">' + escapeHtml(m.step4Tag) + '</span>' +
                '<span class="ai-step-subnote">' + escapeHtml(m.step4Subnote) + '</span>' +
              '</div>' +
            '</div>' +

          '</div>' +

          '<!-- Layman / Recruiter Key Takeaways -->' +
          '<div class="ai-arch-takeaways">' +
            '<div class="ai-takeaway-card">' +
              '<div class="ai-takeaway-icon">🔒</div>' +
              '<div class="ai-takeaway-body">' +
                '<h4 class="ai-takeaway-title">' + escapeHtml(m.takeaway1Title) + '</h4>' +
                '<p class="ai-takeaway-desc">' + escapeHtml(m.takeaway1Desc) + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="ai-takeaway-card">' +
              '<div class="ai-takeaway-icon">🎯</div>' +
              '<div class="ai-takeaway-body">' +
                '<h4 class="ai-takeaway-title">' + escapeHtml(m.takeaway2Title) + '</h4>' +
                '<p class="ai-takeaway-desc">' + escapeHtml(m.takeaway2Desc) + '</p>' +
              '</div>' +
            '</div>' +
            '<div class="ai-takeaway-card">' +
              '<div class="ai-takeaway-icon">⚡</div>' +
              '<div class="ai-takeaway-body">' +
                '<h4 class="ai-takeaway-title">' + escapeHtml(m.takeaway3Title) + '</h4>' +
                '<p class="ai-takeaway-desc">' + escapeHtml(m.takeaway3Desc) + '</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<!-- Modal Footer -->' +
        '<div class="ai-arch-modal-footer">' +
          '<span class="ai-arch-footer-hint">' + m.footerHint + '</span>' +
          '<button type="button" class="ai-arch-close-action" id="ai-arch-modal-gotit">' + escapeHtml(m.gotIt) + '</button>' +
        '</div>' +

      '</div>';

    document.body.appendChild(modalWrapper);

    // Event listeners
    var closeBtn = modalWrapper.querySelector('#ai-arch-modal-close');
    var gotitBtn = modalWrapper.querySelector('#ai-arch-modal-gotit');
    
    if (closeBtn) closeBtn.addEventListener('click', closeArchitectureModal);
    if (gotitBtn) gotitBtn.addEventListener('click', closeArchitectureModal);

    modalWrapper.addEventListener('click', function (e) {
      if (e.target === modalWrapper) {
        closeArchitectureModal();
      }
    });

    modalWrapper.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeArchitectureModal();
        return;
      }

      if (e.key === 'Tab') {
        var focusable = modalWrapper.querySelectorAll('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
        if (focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === modalWrapper.querySelector('#ai-arch-modal-frame')) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    });

    return modalWrapper;
  }

  function openArchitectureModal() {
    var modal = createArchitectureModal();
    lastFocusedElement = document.activeElement;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ai-modal-open');

    var triggerBtn = document.getElementById('ai-arch-trigger-btn');
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'true');
    }

    // Set focus on frame or close button
    var frame = modal.querySelector('#ai-arch-modal-frame');
    var closeBtn = modal.querySelector('#ai-arch-modal-close');
    setTimeout(function () {
      if (frame && typeof frame.focus === 'function') {
        frame.focus();
      } else if (closeBtn) {
        closeBtn.focus();
      }
    }, 50);
  }

  function closeArchitectureModal() {
    var modal = document.getElementById('ai-arch-modal');
    if (!modal || !modal.classList.contains('is-open')) return;

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ai-modal-open');

    var triggerBtn = document.getElementById('ai-arch-trigger-btn');
    if (triggerBtn) {
      triggerBtn.setAttribute('aria-expanded', 'false');
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  window.ResumeChat = {
    init: initAssistant,
    openArchitecture: openArchitectureModal,
    closeArchitecture: closeArchitectureModal,
    setLanguage: function (lang) {
      if (['en', 'de', 'hu'].indexOf(lang) !== -1) {
        currentLanguage = lang;
        updateWidgetText();
      }
    },
    getLanguage: function () {
      return currentLanguage;
    }
  };

  // Safe auto-initialize when #ai-cloud-container is found
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      var container = document.getElementById('ai-cloud-container');
      if (container && !container.dataset.aiInitialized) {
        initAssistant();
      }
    });
  } else {
    var container = document.getElementById('ai-cloud-container');
    if (container && !container.dataset.aiInitialized) {
      initAssistant();
    }
  }
})();
