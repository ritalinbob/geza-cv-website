/**
 * AI Career Assistant
 * Prominent sidebar section with:
 * - "Geza's AI Assistant" title, subtext & live online status
 * - Large gradient chat input (inspired by 21st.dev)
 * - Animated 3D-effect thinking orb (inspired by Dribbble)
 * - Appropriately sized answer bubble
 * - No hardware / model name mentions in UI
 */

(function () {
  'use strict';

  var CANDIDATE_ENDPOINTS = [
    'http://Gezas-Mac-mini.local:5678/webhook/resume-chat',
    'http://192.168.1.248:5678/webhook/resume-chat',
    '/api/chat',
    'http://192.168.1.128:5678/webhook/resume-chat',
    'http://localhost:5678/webhook/resume-chat'
  ];

  var activeEndpoint = CANDIDATE_ENDPOINTS[0];
  var sessionId = 'sess_' + Math.random().toString(36).substring(2, 10);
  var knowledgeBase = null;

  var SUGGESTION_PILLS = [
    { label: '⚡ 8+ Yrs ServiceNow', query: 'How many years of ServiceNow experience does Géza have?' },
    { label: '🛠️ Architecture Projects', query: 'What enterprise architecture projects has he delivered?' },
    { label: '📜 Certifications', query: 'What certifications does Géza hold?' },
    { label: '🔌 Integrations', query: 'What systems and integrations has he connected to ServiceNow?' }
  ];

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
    if (!knowledgeBase) {
      return "Géza Horváth is a ServiceNow Architect with 8+ years of dedicated platform experience based in Vienna, Austria. You can connect with him directly via email at ghorvath@gmail.com or on [LinkedIn](https://www.linkedin.com/in/geza-horvath-16288a185).";
    }

    var faqs = knowledgeBase.frequently_asked_recruiter_questions || [];
    for (var i = 0; i < faqs.length; i++) {
      var faq = faqs[i];
      var fq = faq.q.toLowerCase();
      if ((q.includes('year') || q.includes('how long')) && fq.includes('years')) return faq.a;
      if ((q.includes('lead') || q.includes('title') || q.includes('role')) && fq.includes('lead')) return faq.a;
      if ((q.includes('integration') || q.includes('connect') || q.includes('api') || q.includes('rest')) && fq.includes('integration')) return faq.a;
      if ((q.includes('cmdb') || q.includes('discovery') || q.includes('csdm')) && fq.includes('cmdb')) return faq.a;
      if ((q.includes('cert') || q.includes('csa') || q.includes('cad')) && fq.includes('cert')) return faq.a;
      if ((q.includes('location') || q.includes('remote') || q.includes('hybrid') || q.includes('vienna')) && fq.includes('remote')) return faq.a;
    }

    if (q.includes('education') || q.includes('degree') || q.includes('study')) {
      return "Géza completed an intensive Junior Java Programmer program at Braining Hub, Budapest (2017-2018), holds an MA in International Relations from Corvinus University (2012-2015), and a BSc in Security & Defense Policy (2006-2009).";
    }

    return "Based on Géza's verified profile: ServiceNow Architect with 8+ years driving platform architecture, enterprise integrations (Workday, Jira, Entra ID, BambooHR), CMDB/Discovery, HAM, and Vulnerability Response. Contact him directly at [ghorvath@gmail.com](mailto:ghorvath@gmail.com).";
  }

  // Attempt fetch across candidates in order
  function queryBackend(question, endpoints, index) {
    if (index >= endpoints.length) {
      return Promise.reject(new Error('All backend endpoints unreachable'));
    }

    var targetUrl = endpoints[index];
    var controller = new AbortController();
    var timeoutId = setTimeout(function () { controller.abort(); }, 14000);

    return fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        question: question,
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

  function initAssistant(options) {
    options = options || {};
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
              'Geza\'s AI Assistant' +
            '</h3>' +
            '<p class="ai-section-subtext">ask me questions about Geza</p>' +
          '</div>' +
          '<div class="ai-status-badge" id="ai-status-badge">' +
            '<span class="ai-status-dot"></span>' +
            '<span class="ai-status-label">Online</span>' +
          '</div>' +
        '</div>' +
        '<form class="ai-input-form" id="ai-input-form">' +
          '<input type="text" class="ai-input-field" id="ai-input-field" placeholder="Ask me questions about Geza..." maxlength="200" autocomplete="off" />' +
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
            '<span class="ai-arch-btn-text">How this AI works &middot; Architecture Flowchart</span>' +
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
    var statusBadge = container.querySelector('#ai-status-badge');
    var archTriggerBtn = container.querySelector('#ai-arch-trigger-btn');

    if (archTriggerBtn) {
      archTriggerBtn.addEventListener('click', function () {
        openArchitectureModal();
      });
    }

    // Populate quick pills only if explicitly enabled
    if (showPills && pillsContainer) {
      SUGGESTION_PILLS.forEach(function (pill) {
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
            '<span>Thinking</span>' +
            '<div class="ai-thinking-dots">' +
              '<span></span><span></span><span></span>' +
            '</div>' +
          '</div>' +
        '</div>';
    }

    // Render Formed Answer Bubble
    function renderAnswerBubble(queryText, answerMarkdown, latencySec) {
      stage.className = 'ai-stage active';
      
      var latencyHtml = latencySec 
        ? '<span class="ai-bubble-latency">⚡ Answered in ' + escapeHtml(latencySec) + 's</span>'
        : '<span class="ai-bubble-latency">Verified Profile</span>';

      stage.innerHTML = 
        '<div class="ai-answer-bubble">' +
          '<div class="ai-bubble-header">' +
            '<span class="ai-question-tag" title="' + escapeHtml(queryText) + '">Q: ' + escapeHtml(queryText) + '</span>' +
            '<button type="button" class="ai-dismiss-btn" aria-label="Dismiss answer" title="Close">' +
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
  // ARCHITECTURE FLOWCHART MODAL FRAME (Accessible, Centered, Layman Focus)
  // ==========================================================================
  var lastFocusedElement = null;

  function createArchitectureModal() {
    var existingModal = document.getElementById('ai-arch-modal');
    if (existingModal) return existingModal;

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
              '<span class="ai-arch-badge-pill">Layman Architecture</span>' +
              '<span class="ai-arch-badge-pill highlight">🔒 100% Private &amp; Self-Hosted</span>' +
            '</div>' +
            '<h2 id="ai-arch-modal-title" class="ai-arch-modal-heading">How Geza\'s AI Assistant Works</h2>' +
            '<p class="ai-arch-modal-subheading">A simplified architecture walkthrough designed for HR, recruiters, and hiring managers.</p>' +
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
                '<span class="ai-step-badge">STEP 01</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">A Question is Asked</h3>' +
              '<p class="ai-step-desc">' +
                'A visitor or recruiter types a question into the website chat (e.g. <em>&ldquo;How many years of ServiceNow experience does Géza have?&rdquo;</em>).' +
              '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag">Visitor Browser</span>' +
                '<span class="ai-step-subnote">Clean input &middot; Browser</span>' +
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
                '<span class="ai-step-badge">STEP 02</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>' +
                    '<rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>' +
                    '<line x1="6" y1="6" x2="6.01" y2="6"></line>' +
                    '<line x1="6" y1="18" x2="6.01" y2="18"></line>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">Transmitted to Home Mac mini</h3>' +
              '<p class="ai-step-desc">' +
                'The question travels securely over an encrypted private mesh (n8n + Tailscale) directly to Géza\'s home Mac mini server in Vienna.' +
              '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag">Home Server</span>' +
                '<span class="ai-step-subnote">Mac mini M4 &middot; Encrypted</span>' +
              '</div>' +
            '</div>' +

            '<!-- Flow Arrow 2 -> 3 -->' +
            '<div class="ai-flow-arrow" aria-hidden="true">' +
              '<span class="ai-arrow-line"></span>' +
              '<span class="ai-arrow-symbol">&rarr;</span>' +
            '</div>' +

            '<!-- Step 3: Local LLM Fetches Details & Constructs Answer -->' +
            '<div class="ai-flow-step highlight-step" data-step="3">' +
              '<div class="ai-step-header">' +
                '<span class="ai-step-badge highlight">STEP 03 &middot; CORE</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<path d="M12 2a8 8 0 0 0-8 8c0 3.37 2.07 6.26 5 7.45V20a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.55c2.93-1.19 5-4.08 5-7.45a8 8 0 0 0-8-8z"/>' +
                    '<line x1="12" y1="9" x2="12" y2="13"/>' +
                    '<line x1="10" y1="11" x2="14" y2="11"/>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">Local LLM Constructs Answer</h3>' +
              '<p class="ai-step-desc">' +
                'A private AI model (Ollama) on the Mac mini retrieves verified resume details from an authentic knowledge base and constructs a factual answer.' +
              '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag accent">Local AI Model</span>' +
                '<span class="ai-step-subnote">Strictly grounded facts</span>' +
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
                '<span class="ai-step-badge">STEP 04</span>' +
                '<span class="ai-step-icon-wrap" aria-hidden="true">' +
                  '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                    '<polyline points="20 6 9 17 4 12"></polyline>' +
                  '</svg>' +
                '</span>' +
              '</div>' +
              '<h3 class="ai-step-title">Answer Fed Back to Website</h3>' +
              '<p class="ai-step-desc">' +
                'The verified answer is fed back to the website in under 2 seconds, displaying cleanly in the conversation card with zero tracking.' +
              '</p>' +
              '<div class="ai-step-footer">' +
                '<span class="ai-step-tag">Real-Time Delivery</span>' +
                '<span class="ai-step-subnote">&sim;1.8s response time</span>' +
              '</div>' +
            '</div>' +

          '</div>' +

          '<!-- Layman / Recruiter Key Takeaways -->' +
          '<div class="ai-arch-takeaways">' +
            '<div class="ai-takeaway-card">' +
              '<div class="ai-takeaway-icon">🔒</div>' +
              '<div class="ai-takeaway-body">' +
                '<h4 class="ai-takeaway-title">Zero Third-Party Cloud Leaks</h4>' +
                '<p class="ai-takeaway-desc">Your questions are never sent to external AI vendors like OpenAI or Google. Everything stays 100% private on Géza\'s own hardware.</p>' +
              '</div>' +
            '</div>' +
            '<div class="ai-takeaway-card">' +
              '<div class="ai-takeaway-icon">🎯</div>' +
              '<div class="ai-takeaway-body">' +
                '<h4 class="ai-takeaway-title">Anti-Hallucination Grounding</h4>' +
                '<p class="ai-takeaway-desc">The model is strictly locked to Géza\'s real career milestones. It never invents certifications or exaggerates experience.</p>' +
              '</div>' +
            '</div>' +
            '<div class="ai-takeaway-card">' +
              '<div class="ai-takeaway-icon">⚡</div>' +
              '<div class="ai-takeaway-body">' +
                '<h4 class="ai-takeaway-title">Live Architectural Proof</h4>' +
                '<p class="ai-takeaway-desc">Direct demonstration of Géza\'s enterprise skillset: secure tunneling, API automation (n8n), and local AI engineering.</p>' +
              '</div>' +
            '</div>' +
          '</div>' +

        '</div>' +

        '<!-- Modal Footer -->' +
        '<div class="ai-arch-modal-footer">' +
          '<span class="ai-arch-footer-hint">Keyboard shortcut: Press <kbd>Esc</kbd> to exit</span>' +
          '<button type="button" class="ai-arch-close-action" id="ai-arch-modal-gotit">Got it, close</button>' +
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

    // Set focus on the frame or close button
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
    closeArchitecture: closeArchitectureModal
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
