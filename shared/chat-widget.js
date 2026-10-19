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

    // Locate mounting point (just below sidebar-nav)
    var container = document.getElementById('ai-cloud-container');
    if (!container) {
      var nav = document.querySelector('.sidebar-nav') || document.querySelector('.sidebar-actions') || document.querySelector('.contact-details');
      if (nav && nav.parentNode) {
        container = document.createElement('div');
        container.id = 'ai-cloud-container';
        nav.parentNode.insertBefore(container, nav.nextSibling);
      } else {
        container = document.createElement('div');
        container.id = 'ai-cloud-container';
        document.body.prepend(container);
      }
    }

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
        '<div class="ai-suggestion-pills" id="ai-suggestion-pills"></div>' +
        '<div class="ai-stage" id="ai-stage" aria-live="polite"></div>' +
      '</div>';

    var form = container.querySelector('#ai-input-form');
    var input = container.querySelector('#ai-input-field');
    var submitBtn = container.querySelector('#ai-send-btn');
    var pillsContainer = container.querySelector('#ai-suggestion-pills');
    var stage = container.querySelector('#ai-stage');
    var statusBadge = container.querySelector('#ai-status-badge');

    // Populate quick pills
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

  window.ResumeChat = {
    init: initAssistant
  };
})();
