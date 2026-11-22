/**
 * Multilingual Translations Dictionary for Geza Horvath Portfolio
 * Languages supported: English ('en'), German ('de'), Hungarian ('hu')
 */

const TRANSLATIONS = {
  en: {
    // Document
    page_title: "Geza Horvath — Lead ServiceNow Architect & Technical Lead",
    meta_description: "Lead ServiceNow Architect & Technical Lead with 8+ years driving platform architecture, enterprise integrations, and modern workflow automation.",

    // Top Navigation
    nav_about: "About",
    nav_experience: "Experience",
    nav_competencies: "Competencies",
    nav_credentials: "Credentials & Education",
    nav_credentials_short: "Credentials",
    nav_contact: "Contact",

    // Sidebar Bio & Identity
    author_role: "Lead ServiceNow Architect & Technical Lead",
    author_lead: "Platform Governance, Architecture & Agentic Engineering",
    status_pill: "Available for Opportunities (Hybrid / On-Site)",
    location_text: "Vienna Area (Pressbaum), Austria",

    // Resume Download (Respective to selected viewing language)
    resume_download_btn: "Download Resume (PDF)",
    resume_pdf_url: "docs/Geza%20Horvath%20-%20Resume%20(English).pdf?v=factual1",
    resume_pdf_filename: "Geza Horvath - Resume (English).pdf",
    resume_download_title: "Download Geza Horvath's Resume (English PDF)",
    resume_alt_label: "DE PDF",
    resume_alt_pdf_url: "docs/Geza%20Horvath%20-%20Lebenslauf.pdf?v=factual1",
    resume_alt_pdf_filename: "Geza Horvath - Lebenslauf.pdf",
    resume_alt_download_title: "Download German CV (Lebenslauf PDF)",

    // Key Interests Strip (Above the Fold)
    interest_1_title: "ServiceNow",
    interest_1_desc: "8+ years Platform Experience",
    interest_2_title: "Automation",
    interest_2_desc: "Agentic workflows",
    interest_3_title: "Business applications",
    interest_3_desc: "Integrations",
    interest_4_title: "Process Design",
    interest_4_desc: "and Development",
    metric_1_label: "ServiceNow",
    metric_1_focus: "8+ years Platform Experience",
    metric_2_label: "Automation",
    metric_2_focus: "Agentic workflows",
    metric_3_label: "Business applications",
    metric_3_focus: "Integrations",
    metric_4_label: "Process Design",
    metric_4_focus: "and Development",

    // Section 1: About
    section_about: "About",
    section_about_subtitle: "Platform Architecture & Agentic Automation",
    about_p1: "<strong>Lead ServiceNow Architect &amp; Technical Lead with 8+ years</strong> driving platform architecture, enterprise integrations, and modern workflow automation. Configured and provisioned a 6-instance ServiceNow estate, focusing architectural ownership on the primary production and sub-production IT Service Desk environments while establishing Azure SSO and access baselines across remaining instances. Core platform governance spans <strong>ITSM, CMDB/Discovery, HAM, and Vulnerability Response</strong>.",
    about_p2: "Engineered local VS Code development workflows and custom Model Context Protocol (MCP) integrations, enabling direct extraction and analysis of ServiceNow instance context with LLMs for streamlined development. Also built automated <strong>n8n LLM workflows</strong> to reduce manual operational overhead. Based in the Vienna area (Pressbaum) with valid Austrian work status, ready for hybrid or on-site engagement.",

    // Section 2: Experience
    section_experience: "Experience",
    exp_ontinue_period: "2023-02 &mdash; Present",
    exp_ontinue_role: "ServiceNow Architect & Tech Lead · Ontinue",
    exp_ontinue_loc: "Vienna (Remote/Hybrid)",
    exp_ontinue_b1: "<strong>Platform Ownership &amp; Security:</strong> Direct technical roadmap, platform governance, and continuous upgrades across enterprise IT instances; engineered CMDB/Discovery baselines and Vulnerability Response pipelines integrating Tenable and Nessus scanners.",
    exp_ontinue_b2: "<strong>Technical Leadership &amp; Mentoring:</strong> Technically guide and mentor a core team of 1&ndash;2 senior ServiceNow engineers; steer architectural standards, ticket scoping, and code reviews while coordinating delivery within an 8+ developer external partner ecosystem.",
    exp_ontinue_b3: "<strong>Developer Tooling &amp; MCP Workflows:</strong> Built practical local VS Code workflows and custom Model Context Protocol (MCP) integrations connecting IDE tools and LLMs to ServiceNow metadata and schemas for faster debugging, code inspection, and GlideScript development.",
    exp_ontinue_b4: "<strong>Enterprise AI &amp; Workflow Automation:</strong> Architected asynchronous n8n LLM workflows chaining intelligence APIs with structured prompts, automating deduplication, task queue execution, and high-volume record enrichment.",
    exp_ontinue_b5: "<strong>Automated HR Lifecycle &amp; Integrations:</strong> Engineered end-to-end user onboarding and offboarding synchronization pipelines connecting BambooHR, ServiceNow, and Microsoft Entra ID (Azure AD) via Power Automate and REST webhooks.",
    exp_ontinue_b6: "<strong>Data Integration &amp; Middleware:</strong> Collaborated with integration engineers to build and maintain bidirectional data flows and ETL syncs between ServiceNow, middleware (Cloudomation, Jitterbit), and corporate data warehouses.",

    exp_open_period: "2022-05 &mdash; 2023-02",
    exp_open_role: "ServiceNow Architect – Business Applications · Open Systems",
    exp_open_loc: "Vienna (Hybrid)",
    exp_open_b1: "<strong>Multi-Instance Provisioning:</strong> Configured and provisioned a 6-instance ServiceNow estate during the spin-off, establishing Azure SSO, basic group setups, RBAC baselines, and update-set pipelines while centering architectural ownership on the primary production and sub-production IT Service Desk instances.",
    exp_open_b2: "<strong>Corporate Spin-Off Execution:</strong> Partnered with engineering leadership on platform separation during the Ontinue spin-off from Open Systems, directly designing and executing the decoupling and data migration of the ServiceNow estate.",
    exp_open_b3: "<strong>Instance Governance &amp; Handover:</strong> Established baseline cloning runbooks and release gates, executing a structured operational handover of auxiliary departmental instances to external partners.",

    exp_tri_period: "2018-08 &mdash; 2022-04",
    exp_tri_role: "Senior ServiceNow Developer & Technical Lead · Tricentis GmbH",
    exp_tri_loc: "Vienna, Austria",
    exp_tri_b1: "<strong>Enterprise Integrations &amp; Toolchain:</strong> Engineered mission-critical bi-directional REST integrations connecting ServiceNow with Workday, Jira, Cornerstone, and Coveo AI Search within an Agile/Scrum delivery model.",
    exp_tri_b2: "<strong>AI Search &amp; Portal Enhancements:</strong> Spearheaded customer and support portal enhancements over 3+ years, integrating Coveo AI unified search to index disparate documentation repositories and optimize knowledge discovery.",
    exp_tri_b3: "<strong>Complex Schema Migrations:</strong> Planned and executed high-risk database transitions, including an ITSM-to-CSM schema migration and legacy M&amp;A acquisition data consolidations.",
    exp_tri_b4: "<strong>Codebase Stabilization &amp; Technical Remediation:</strong> Audited and refactored failing custom code and data schema architectures delivered by an external vendor under tight deadlines to stabilize the platform for production cutover.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Early Career Operations · Service24 GmbH & Avis Budget Group",
    exp_early_r1: "<strong>Mobility Manager</strong> (Service24 GmbH, 2016&ndash;2018) &bull; <strong>Customer Care Specialist</strong> (Avis Budget Group, 2015&ndash;2016) &ndash; Process optimization, international operations, and workflow logistics.",
    tag_ops: "Process Optimization",
    tag_incident: "International Operations",
    tag_customer: "Workflow Logistics",

    // Section 3: Competencies
    section_competencies: "Competencies",
    comp_title_1: "Platform Architecture & Governance",
    comp_desc_1: "Multi-Instance Topology, Release Governance, Cloning Runbooks, Scoped Applications, ATF Automated Regression Testing, Upgrades & Skipped-Record Resolution, RBAC.",
    comp_title_2: "IT Operations & Modules",
    comp_desc_2: "ITSM, CMDB Baselines, Discovery (MID Servers, Azure Cloud, Agent Client Collector), Service Graph Connectors, Hardware Asset Management (HAM), Vulnerability Response (Tenable/Nessus).",
    comp_title_3: "AI & Agentic Engineering",
    comp_desc_3: "Custom Model Context Protocol (MCP) Server Wrappers, In-IDE VS Code Agent Toolchains, n8n LLM Workflows, Context Parsing, Code Review Automation, Prompt Engineering.",
    comp_title_4: "Integrations & Identity",
    comp_desc_4: "Scripted REST APIs, Webhooks, Microsoft Entra ID (Azure AD), BambooHR, Power Automate, Jitterbit, Cloudomation (Python ETL), SQL Data Warehousing, Git Version Control.",

    // Section 4: Credentials & Education
    section_credentials: "Credentials & Education",
    heading_certifications: "Certifications",
    cert_1: "<strong>Develop Generative AI Applications</strong> &mdash; IBM (Coursera, 2026)",
    cert_2: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow",
    cert_3: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow",
    cert_4: "<strong>Python Programming &amp; Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Education",
    edu_1: "<strong>Junior Java Programmer</strong> &middot; Braining Hub Budapest (Intensive 5-Month)",
    edu_2: "<strong>M.A. International Relations</strong> &middot; Corvinus University of Budapest",
    edu_3: "<strong>B.S. Security &amp; Defense Policy</strong> &middot; Zrínyi Miklós National Defence University",

    // Section 5: Contact
    section_contact: "Contact",
    contact_badge: "Direct Inquiries · Open to Opportunities",
    contact_title: "Let's Connect & Build",
    contact_subtitle: "Whether you are evaluating a senior ServiceNow architecture mandate, a greenfield platform setup, enterprise integration program, or consulting advisory, leave your details below and I'll get back to you promptly.",
    label_name: "Your Name",
    ph_name: "e.g. Sarah Jenkins",
    label_email: "Work / Direct Email",
    ph_email: "e.g. sarah@enterprise.com",
    label_company: "Company / Organization",
    ph_company: "e.g. Global Tech Solutions",
    label_role: "Inquiring About / Opportunity Type",
    opt_role_1: "Full-time ServiceNow Architecture",
    opt_role_2: "Automations / Agentic workflows",
    opt_role_3: "Contract / Consulting Program",
    label_phone: "Phone Number",
    label_optional: "(Optional)",
    ph_phone: "e.g. +43 660 ... / +1 ...",
    label_message: "Message / Role Scope",
    ph_message: "Tell me about the mandate, platform landscape, challenges, or timeline...",
    btn_submit: "Send Message",
    btn_submitting: "Sending...",
    hint_direct: "Or reach out directly:",
    err_name: "Please enter your name",
    err_email: "Please enter a valid email address",
    err_message: "Please enter a message",
    status_success: "Thank you for reaching out! Your inquiry has been received. I'll get back to you promptly.",
    status_error: "Unable to deliver message right now. Please email directly to ghorvath@gmail.com.",

    // Footer & Toast
    footer_text: "Built with clean HTML &amp; Vanilla CSS. Powered by a local LLM on a Mac mini via n8n.",
    toast_copied: "Copied {label} to clipboard!"
  },

  de: {
    // Dokument
    page_title: "Geza Horvath — Lead ServiceNow Architect & Technical Lead",
    meta_description: "Lead ServiceNow Architect & Technical Lead mit über 8 Jahren Erfahrung in Plattformarchitektur, Enterprise-Integrationen und moderner Prozessautomatisierung.",

    // Hauptnavigation
    nav_about: "Über mich",
    nav_experience: "Erfahrung",
    nav_competencies: "Kompetenzen",
    nav_credentials: "Qualifikationen & Ausbildung",
    nav_credentials_short: "Qualifikationen",
    nav_contact: "Kontakt",

    // Seitenleiste Bio & Identität
    author_role: "Lead ServiceNow Architect & Technical Lead",
    author_lead: "Plattform-Governance, Architektur & Agentic Engineering",
    status_pill: "Verfügbar für Einsätze (Hybrid / Vor-Ort)",
    location_text: "Raum Wien (Pressbaum), Österreich",

    // Lebenslauf-Download (Entsprechend der gewählten Sprache)
    resume_download_btn: "Lebenslauf herunterladen (PDF)",
    resume_pdf_url: "docs/Geza%20Horvath%20-%20Lebenslauf.pdf?v=factual1",
    resume_pdf_filename: "Geza Horvath - Lebenslauf.pdf",
    resume_download_title: "Geza Horvaths Lebenslauf herunterladen (Deutsch PDF)",
    resume_alt_label: "EN PDF",
    resume_alt_pdf_url: "docs/Geza%20Horvath%20-%20Resume%20(English).pdf?v=factual1",
    resume_alt_pdf_filename: "Geza Horvath - Resume (English).pdf",
    resume_alt_download_title: "Englischen Lebenslauf herunterladen (Resume PDF)",

    // Key Interests Strip (Above the Fold)
    interest_1_title: "ServiceNow",
    interest_1_desc: "8+ Jahre Plattform-Erfahrung",
    interest_2_title: "Automatisierung",
    interest_2_desc: "Agentic Workflows",
    interest_3_title: "Business-Applikationen",
    interest_3_desc: "Integrationen",
    interest_4_title: "Prozessdesign",
    interest_4_desc: "und Entwicklung",
    metric_1_label: "ServiceNow",
    metric_1_focus: "8+ Jahre Plattform-Erfahrung",
    metric_2_label: "Automatisierung",
    metric_2_focus: "Agentic Workflows",
    metric_3_label: "Business-Applikationen",
    metric_3_focus: "Integrationen",
    metric_4_label: "Prozessdesign",
    metric_4_focus: "und Entwicklung",

    // Abschnitt 1: Über mich
    section_about: "Über mich",
    section_about_subtitle: "Plattformarchitektur & Agentic Automation",
    about_p1: "<strong>Lead ServiceNow Architect &amp; Technical Lead mit über 8 Jahren Erfahrung</strong> in Plattformarchitektur, Enterprise-Integrationen und moderner Prozessautomatisierung. Konfiguration und Bereitstellung einer 6-Instanzen-ServiceNow-Landschaft mit architektonischem Fokus auf die produktiven und Sub-Produktions-IT-Service-Desk-Umgebungen sowie Baseline-Einrichtung von Azure-SSO und Gruppenberechtigungen für weitere Instanzen. Die Plattform-Governance umfasst <strong>ITSM-, CMDB/Discovery-, HAM- und Vulnerability-Response-Umgebungen</strong>.",
    about_p2: "Entwicklung lokaler VS-Code-Entwicklungs-Pipelines und MCP-Integrationen (Model Context Protocol), um ServiceNow-Instanzkontexte direkt für LLM-gestützte Analysen und Entwicklungen bereitzustellen. Ergänzend Umsetzung automatisierter <strong>n8n-LLM-Workflows</strong> zur Reduktion des operativen Aufwands. Wohnhaft im Raum Wien (Pressbaum) mit uneingeschränkter Arbeitserlaubnis für Österreich; verfügbar für hybride oder Vor-Ort-Einsätze.",

    // Abschnitt 2: Berufserfahrung
    section_experience: "Berufserfahrung",
    exp_ontinue_period: "2023-02 &mdash; Heute",
    exp_ontinue_role: "ServiceNow Architect & Tech Lead · Ontinue",
    exp_ontinue_loc: "Wien (Remote/Hybrid)",
    exp_ontinue_b1: "<strong>Plattform-Governance &amp; IT-Sicherheit:</strong> Gesamtverantwortung für die technische Roadmap, Plattform-Governance und kontinuierliche Upgrades der Enterprise-Instanzen; Etablierung von CMDB/Discovery-Baselines sowie Implementierung von Vulnerability-Response-Pipelines mit nativer Einbindung von Tenable- und Nessus-Scannern.",
    exp_ontinue_b2: "<strong>Fachliche Führung &amp; Delivery:</strong> Fachliche Leitung und Mentoring eines Kernteams aus 1&ndash;2 Senior ServiceNow Engineers; Steuerung von Code-Reviews, Ticket-Scoping und Architektur-Governance in enger Abstimmung mit dem Head of Business Applications und über 8 externen Entwicklern.",
    exp_ontinue_b3: "<strong>Developer Tooling &amp; MCP-Workflows:</strong> Entwicklung lokaler VS-Code-Workflows und eigener Model-Context-Protocol-(MCP)-Integrationen zur Anbindung von IDE-Tools und LLMs an ServiceNow-Metadaten und -Schemas für schnelleres Debugging, Code-Inspektion und GlideScript-Entwicklung.",
    exp_ontinue_b4: "<strong>Enterprise-KI &amp; Workflow-Automatisierung:</strong> Architektur asynchroner n8n-LLM-Workflows mit strukturierter Prompt-Verkettung moderner KI-APIs zur automatisierten Deduplizierung, Abarbeitung von Aufgaben-Queues und intelligenten Datenanreicherung großer Datenbestände.",
    exp_ontinue_b5: "<strong>Automatisiertes Identity Lifecycle Management:</strong> Konzeption und Implementierung robuster End-to-End-Prozesse für das Mitarbeiter-On- und -Offboarding mit nahtloser Synchronisierung zwischen BambooHR, ServiceNow und Microsoft Entra ID (Azure AD) via Power Automate und REST-Webhooks.",
    exp_ontinue_b6: "<strong>Datenintegration &amp; Middleware:</strong> Zusammenarbeit mit Integrationsspezialisten zur Umsetzung und Betreuung bidirektionaler Datenflüsse zwischen ServiceNow, Middleware (Cloudomation, Jitterbit) und nachgelagerten Data Warehouses.",

    exp_open_period: "2022-05 &mdash; 2023-02",
    exp_open_role: "ServiceNow Architect – Business Applications · Open Systems",
    exp_open_loc: "Wien (Hybrid)",
    exp_open_b1: "<strong>Multi-Instanz-Bereitstellung:</strong> Konfiguration und Bereitstellung einer 6-Instanzen-ServiceNow-Landschaft im Zuge der Ausgliederung mit Baseline-Einrichtung von Azure-SSO, Gruppenberechtigungen (RBAC) und Update-Set-Pipelines sowie architektonischem Fokus auf die produktiven und Sub-Produktions-IT-Service-Desk-Instanzen.",
    exp_open_b2: "<strong>Corporate-Spin-Off-Umsetzung:</strong> Technische Entkopplung und Datenmigration der ServiceNow-Landschaft während der Ausgliederung von Ontinue aus Open Systems in enger Abstimmung mit dem Management.",
    exp_open_b3: "<strong>Instanzen-Governance &amp; Übergabe:</strong> Erstellung standardisierter Klon-Runbooks und Release-Gates sowie strukturierte operative Übergabe von Fachbereichs-Instanzen an externe Partner.",

    exp_tri_period: "2018-08 &mdash; 2022-04",
    exp_tri_role: "Senior ServiceNow Developer & Technical Lead · Tricentis GmbH",
    exp_tri_loc: "Wien, Österreich",
    exp_tri_b1: "<strong>Enterprise-Integrationen &amp; Toolchain:</strong> Konzeption und Implementierung unternehmenskritischer, bidirektionaler REST-Schnittstellen zwischen ServiceNow, Workday, Jira, Cornerstone und Coveo AI Search im Rahmen agiler Scrum-Zyklen.",
    exp_tri_b2: "<strong>KI-Suche &amp; Portal-Optimierung:</strong> Mehrjährige kontinuierliche Weiterentwicklung des Kunden- und Support-Portals; Anbindung der KI-basierten Unified Search von Coveo zur übergreifenden Erschließung heterogener Wissensdatenbanken.",
    exp_tri_b3: "<strong>Komplexe Schema-Migrationen:</strong> Planung und Durchführung anspruchsvoller Datenbanktransformationen, einschließlich einer Migration von ITSM auf CSM sowie Datenkonsolidierungen infolge strategischer M&amp;A-Akquisitionen.",
    exp_tri_b4: "<strong>Plattform-Sanierung &amp; Code-Refactoring:</strong> Technische Due Diligence und tiefgreifendes Refactoring fehlerhafter Custom-Code- und Datenarchitekturen eines externen Dienstleisters unter strikten Fristen zur planmäßigen Stabilisierung des Go-Lives.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Frühere Stationen im operativen Bereich · Service24 GmbH & Avis Budget Group",
    exp_early_r1: "<strong>Mobility Manager</strong> (Service24 GmbH, 2016&ndash;2018) &bull; <strong>Customer Care Specialist</strong> (Avis Budget Group, 2015&ndash;2016) &ndash; Prozessoptimierung, internationale operative Steuerung und Workflow-Logistik.",
    tag_ops: "Prozessoptimierung",
    tag_incident: "Internationale Steuerung",
    tag_customer: "Workflow-Logistik",

    // Abschnitt 3: Kompetenzen
    section_competencies: "Kompetenzen",
    comp_title_1: "Plattformarchitektur & Governance",
    comp_desc_1: "Multi-Instance-Topologie, Release-Governance, Klon-Runbooks, Scoped Applications, ATF (Automated Test Framework) Regressionstests, Upgrade-Management & Skipped-Record-Resolution, RBAC.",
    comp_title_2: "IT-Operations & Module",
    comp_desc_2: "ITSM, CMDB-Baselines, Discovery (MID Server, Azure Cloud, Agent Client Collector), Service Graph Connectors, Hardware Asset Management (HAM), Vulnerability Response (Tenable/Nessus).",
    comp_title_3: "KI & Agentic Engineering",
    comp_desc_3: "Eigene Model Context Protocol (MCP) Server-Wrapper, In-IDE VS-Code-Agent-Toolchains, n8n-LLM-Workflows, Kontext-Parsing, automatisierte Code-Reviews, Prompt Engineering.",
    comp_title_4: "Integrationen & Identity",
    comp_desc_4: "Scripted REST APIs, Webhooks, Microsoft Entra ID (Azure AD), BambooHR, Power Automate, Jitterbit, Cloudomation (Python ETL), SQL Data Warehousing, Git Versionskontrolle.",

    // Abschnitt 4: Qualifikationen & Ausbildung
    section_credentials: "Qualifikationen & Ausbildung",
    heading_certifications: "Zertifizierungen",
    cert_1: "<strong>Develop Generative AI Applications</strong> &mdash; IBM (Coursera, 2026)",
    cert_2: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow",
    cert_3: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow",
    cert_4: "<strong>Python Programming &amp; Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Ausbildung",
    edu_1: "<strong>Junior Java Programmer</strong> &middot; Braining Hub Budapest (5-monatiges Intensivprogramm)",
    edu_2: "<strong>M.A. Internationale Beziehungen</strong> &middot; Corvinus-Universität Budapest",
    edu_3: "<strong>B.S. Sicherheits- und Verteidigungspolitik</strong> &middot; Nationale Verteidigungsuniversität Zrínyi Miklós",

    // Abschnitt 5: Kontakt
    section_contact: "Kontakt",
    contact_badge: "Direkte Anfragen · Offen für neue Möglichkeiten",
    contact_title: "Lassen Sie uns sprechen & aufbauen",
    contact_subtitle: "Ob Sie ein ServiceNow-Architekturmandat, einen Greenfield-Plattformaufbau, ein Integrationsprogramm oder eine strategische Beratung planen – hinterlassen Sie gerne Ihre Daten, und ich melde mich zeitnah bei Ihnen.",
    label_name: "Ihr Name",
    ph_name: "z. B. Dr. Michael Weber",
    label_email: "Geschäftliche / Direkte E-Mail",
    ph_email: "z. B. michael@unternehmen.de",
    label_company: "Unternehmen / Organisation",
    ph_company: "z. B. Tech Solutions GmbH",
    label_role: "Art der Anfrage / Rollentyp",
    opt_role_1: "Festanstellung als ServiceNow Architect",
    opt_role_2: "Automatisierung / Agentic Workflows",
    opt_role_3: "Freiberufliches Mandat / Beratung",
    label_phone: "Telefonnummer",
    label_optional: "(Optional)",
    ph_phone: "z. B. +43 660 ... / +49 ...",
    label_message: "Nachricht / Rollenrahmen",
    ph_message: "Beschreiben Sie das Mandat, die Plattformlandschaft, Herausforderungen oder den Zeitplan...",
    btn_submit: "Nachricht senden",
    btn_submitting: "Wird gesendet...",
    hint_direct: "Oder direkt kontaktieren:",
    err_name: "Bitte geben Sie Ihren Namen ein",
    err_email: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    err_message: "Bitte geben Sie eine Nachricht ein",
    status_success: "Vielen Dank für Ihre Nachricht! Ihre Anfrage ist eingegangen. Ich werde mich zeitnah bei Ihnen melden.",
    status_error: "Nachricht konnte derzeit nicht übermittelt werden. Bitte schreiben Sie direkt an ghorvath@gmail.com.",

    // Footer & Toast
    footer_text: "Erstellt mit sauberem HTML &amp; Vanilla CSS. Angetrieben von einem lokalen LLM auf einem Mac mini via n8n.",
    toast_copied: "{label} in die Zwischenablage kopiert!"
  },

  hu: {
    // Dokumentum
    page_title: "Horváth Géza — Lead ServiceNow Architekt & Technikai Vezető",
    meta_description: "Lead ServiceNow Architekt & Technikai Vezető több mint 8 év tapasztalattal a platformarchitektúra, vállalati integrációk és modern munkafolyamat-automatizálás területén.",

    // Felső navigáció
    nav_about: "Rólam",
    nav_experience: "Tapasztalat",
    nav_competencies: "Kompetenciák",
    nav_credentials: "Képesítések & Tanulmányok",
    nav_credentials_short: "Képesítések",
    nav_contact: "Kapcsolat",

    // Oldalsáv Bio & Identitás
    author_role: "Lead ServiceNow Architekt & Technical Lead",
    author_lead: "Platform-governance, Architektúra & Agentic AI",
    status_pill: "Nyitott új lehetőségekre (Hibrid / Helyszíni)",
    location_text: "Bécs környéke (Pressbaum), Ausztria",

    // Önéletrajz letöltése (A kiválasztott nyelvnek megfelelően)
    resume_download_btn: "Önéletrajz letöltése (PDF · EN)",
    resume_pdf_url: "docs/Geza%20Horvath%20-%20Resume%20(English).pdf?v=factual1",
    resume_pdf_filename: "Geza Horvath - Resume (English).pdf",
    resume_download_title: "Horváth Géza angol nyelvű önéletrajzának letöltése (PDF)",
    resume_alt_label: "DE PDF",
    resume_alt_pdf_url: "docs/Geza%20Horvath%20-%20Lebenslauf.pdf?v=factual1",
    resume_alt_pdf_filename: "Geza Horvath - Lebenslauf.pdf",
    resume_alt_download_title: "Német nyelvű önéletrajz letöltése (Lebenslauf PDF)",

    // Key Interests Strip (Above the Fold)
    interest_1_title: "ServiceNow",
    interest_1_desc: "8+ év platformtapasztalat",
    interest_2_title: "Automatizáció",
    interest_2_desc: "Agentic munkafolyamatok",
    interest_3_title: "Üzleti alkalmazások",
    interest_3_desc: "Integrációk",
    interest_4_title: "Folyamattervezés",
    interest_4_desc: "és fejlesztés",
    metric_1_label: "ServiceNow",
    metric_1_focus: "8+ év platformtapasztalat",
    metric_2_label: "Automatizáció",
    metric_2_focus: "Agentic munkafolyamatok",
    metric_3_label: "Üzleti alkalmazások",
    metric_3_focus: "Integrációk",
    metric_4_label: "Folyamattervezés",
    metric_4_focus: "és fejlesztés",

    // 1. szakasz: Rólam
    section_about: "Rólam",
    section_about_subtitle: "Platformarchitektúra & Agentic Automatizáció",
    about_p1: "<strong>Lead ServiceNow Architekt &amp; Technikai Vezető több mint 8 év tapasztalattal</strong> a platformarchitektúra, vállalati integrációk és modern munkafolyamat-automatizálás területén. Egy 6 példányos ServiceNow környezet konfigurálása és kiépítése, architekturális fókusszal az éles és alárendelt (sub-prod) IT Service Desk környezetekre, miközben a többi példányon Azure SSO és jogosultsági alapbeállítások kerültek kialakításra. A platform-governance kiterjed az <strong>ITSM, CMDB/Discovery, HAM és Vulnerability Response</strong> modulokra.",
    about_p2: "Helyi VS Code fejlesztési munkafolyamatok és egyedi Model Context Protocol (MCP) integrációk kialakítása, lehetővé téve a ServiceNow példánykontextusok közvetlen kinyerését és LLM-alapú elemzését a hatékonyabb fejlesztés érdekében. Emellett automatizált <strong>n8n LLM munkafolyamatok</strong> megvalósítása az operatív adminisztrációs terhek csökkentésére. Bécs környékén (Pressbaum) él érvényes osztrák munkavállalási státusszal, készen hibrid vagy helyszíni munkavégzésre.",

    // 2. szakasz: Szakmai tapasztalat
    section_experience: "Szakmai Tapasztalat",
    exp_ontinue_period: "2023-02 &mdash; Jelenleg",
    exp_ontinue_role: "ServiceNow Architekt & Tech Lead · Ontinue",
    exp_ontinue_loc: "Bécs (Remote/Hibrid)",
    exp_ontinue_b1: "<strong>Platform-governance &amp; IT-biztonság:</strong> A technikai ütemterv, platform-governance és folyamatos frissítések (upgrades) teljes körű irányítása a vállalati IT példányokon; CMDB/Discovery alapok, valamint Tenable és Nessus szkennereket integráló Vulnerability Response folyamatok kiépítése.",
    exp_ontinue_b2: "<strong>Technikai Vezetés &amp; Mentorálás:</strong> 1&ndash;2 szenior ServiceNow mérnökből álló magcsapat szakmai vezetése és mentorálása; architekturális szabványok, ticket-scoping és kódellenőrzések (code review) irányítása, valamint a szállítás koordinálása egy 8+ fős külső partneri fejlesztői ökoszisztémával.",
    exp_ontinue_b3: "<strong>Fejlesztői Eszköztár &amp; MCP Munkafolyamatok:</strong> Gyakorlati helyi VS Code munkafolyamatok és egyedi Model Context Protocol (MCP) integrációk kiépítése, amelyek az IDE-eszközöket és LLM-eket a ServiceNow metaadataihoz és sémáihoz kapcsolják a gyorsabb hibakeresés, kódvizsgálat és GlideScript fejlesztés érdekében.",
    exp_ontinue_b4: "<strong>Vállalati AI &amp; Munkafolyamat-automatizálás:</strong> Aszinkron n8n LLM munkafolyamatok tervezése intelligens API-k és strukturált promptok láncolásával az automatizált deduplikációhoz, feladatsorok (task queues) végrehajtásához és nagy volumenű adatgazdagításhoz.",
    exp_ontinue_b5: "<strong>Automatizált HR Életciklus &amp; Integrációk:</strong> Teljes körű (end-to-end) felhasználói be- és kiléptetési szinkronizációs folyamatok kiépítése a BambooHR, ServiceNow és Microsoft Entra ID (Azure AD) összekapcsolásával Power Automate és REST webhookok segítségével.",
    exp_ontinue_b6: "<strong>Adatintegráció &amp; Middleware:</strong> Együttműködés integrációs mérnökökkel a ServiceNow, a köztes réteg (Cloudomation, Jitterbit) és a vállalati adattárházak közötti kétirányú adatáramlások és ETL-szinkronizációk kialakításában és karbantartásában.",

    exp_open_period: "2022-05 &mdash; 2023-02",
    exp_open_role: "ServiceNow Architekt – Üzleti Alkalmazások · Open Systems",
    exp_open_loc: "Bécs (Hibrid)",
    exp_open_b1: "<strong>Többpéldányos Kiépítés:</strong> Egy 6 példányos ServiceNow környezet konfigurálása és előkészítése a kiválás során: Azure SSO, alapvető csoport- és jogosultsági (RBAC) alapbeállítások, valamint Update Set folyamatok kialakítása, az éles és sub-prod IT Service Desk példányok közvetlen architekturális tulajdonlásával.",
    exp_open_b2: "<strong>Corporate Spin-Off Megvalósítás:</strong> Együttműködés a műszaki vezetéssel az Ontinue Open Systems-ből történő kiválása során a platform szétválasztásában, közvetlenül megtervezve és végrehajtva a ServiceNow környezet technikai leválasztását és adatmigrációját.",
    exp_open_b3: "<strong>Példány-governance &amp; Átadás:</strong> Standardizált klónozási runbookok és release-gate-ek kidolgozása, valamint a szakági példányok strukturált operatív átadása külső partnereknek.",

    exp_tri_period: "2018-08 &mdash; 2022-04",
    exp_tri_role: "Senior ServiceNow Fejlesztő & Technikai Vezető · Tricentis GmbH",
    exp_tri_loc: "Bécs, Ausztria",
    exp_tri_b1: "<strong>Vállalati Integrációk &amp; Eszköztár:</strong> Üzletileg kritikus, kétirányú REST integrációk tervezése és megvalósítása a ServiceNow, Workday, Jira, Cornerstone és Coveo AI Search rendszerek között agilis Scrum szállítási modellben.",
    exp_tri_b2: "<strong>AI Keresés &amp; Portálfejlesztés:</strong> Az ügyfél- és támogatói portál több mint 3 éven át tartó továbbfejlesztésének vezetése; a Coveo AI egységes kereső (unified search) integrálása a heterogén dokumentációs tárházak indexelésére és a tudáskeresés optimalizálására.",
    exp_tri_b3: "<strong>Összetett Sémamigrációk:</strong> Magas kockázatú adatbázis-transzformációk megtervezése és végrehajtása, beleértve az ITSM-ről CSM-re történő sémamigrációt és a stratégiai M&amp;A cégfelvásárlásokból származó adatok konszolidációját.",
    exp_tri_b4: "<strong>Kódbázis-stabilizáció &amp; Technikai Helyreállítás:</strong> Külső beszállító által szállított hibás egyedi kódok és adatséma-architektúrák technikai átvilágítása (audit) és mélyreható refaktorálása szoros határidők mellett a platform éles átállásának (production cutover) stabilizálására.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Korábbi Operatív Pályafutás · Service24 GmbH & Avis Budget Group",
    exp_early_r1: "<strong>Mobility Manager</strong> (Service24 GmbH, 2016&ndash;2018) &bull; <strong>Customer Care Specialist</strong> (Avis Budget Group, 2015&ndash;2016) &ndash; Folyamatoptimalizálás, nemzetközi operatív irányítás és munkafolyamat-logisztika.",
    tag_ops: "Folyamatoptimalizálás",
    tag_incident: "Nemzetközi műveletek",
    tag_customer: "Munkafolyamat-logisztika",

    // 3. szakasz: Kompetenciák
    section_competencies: "Kompetenciák",
    comp_title_1: "Platformarchitektúra & Governance",
    comp_desc_1: "Többpéldányos (Multi-Instance) topológia, Release Governance, klónozási runbookok, Scoped Applications, ATF automatizált regressziós tesztelés, Upgrade-menedzsment & Skipped-Record feloldás, RBAC.",
    comp_title_2: "IT-Operations & Modulok",
    comp_desc_2: "ITSM, CMDB-alapok, Discovery (MID szerverek, Azure Cloud, Agent Client Collector), Service Graph Connectors, Hardware Asset Management (HAM), Vulnerability Response (Tenable/Nessus).",
    comp_title_3: "AI & Agentic Engineering",
    comp_desc_3: "Egyedi Model Context Protocol (MCP) szerver-wrapperek, In-IDE VS Code Agent eszköztárak, n8n LLM munkafolyamatok, kontextus-feldolgozás (Context Parsing), automatizált kódellenőrzés, Prompt Engineering.",
    comp_title_4: "Integrációk & Identitás",
    comp_desc_4: "Scripted REST API-k, Webhookok, Microsoft Entra ID (Azure AD), BambooHR, Power Automate, Jitterbit, Cloudomation (Python ETL), SQL adattárházak (Data Warehousing), Git verziókezelés.",

    // 4. szakasz: Képesítések & Tanulmányok
    section_credentials: "Képesítések & Tanulmányok",
    heading_certifications: "Képesítések & Tanúsítványok",
    cert_1: "<strong>Develop Generative AI Applications</strong> &mdash; IBM (Coursera, 2026)",
    cert_2: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow",
    cert_3: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow",
    cert_4: "<strong>Python Programming &amp; Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Tanulmányok",
    edu_1: "<strong>Junior Java Programozó</strong> &middot; Braining Hub Budapest (5 hónapos intenzív képzés)",
    edu_2: "<strong>M.A. Nemzetközi Kapcsolatok</strong> &middot; Budapesti Corvinus Egyetem",
    edu_3: "<strong>B.S. Biztonság- és Védelempolitika</strong> &middot; Zrínyi Miklós Nemzetvédelmi Egyetem",

    // 5. szakasz: Kapcsolat
    section_contact: "Kapcsolat",
    contact_badge: "Közvetlen megkeresések · Nyitott új lehetőségekre",
    contact_title: "Lépjünk kapcsolatba & építsünk együtt",
    contact_subtitle: "Akár szenior ServiceNow platformarchitektúrát, zöldmezős környezet felépítését, integrációs programot vagy tanácsadói szerepkört tervez, adja meg adatait, és hamarosan jelentkezem.",
    label_name: "Az Ön Neve",
    ph_name: "pl. Kovács Péter",
    label_email: "Munkahelyi / Közvetlen E-mail",
    ph_email: "pl. peter@vallalat.hu",
    label_company: "Cég / Szervezet",
    ph_company: "pl. Globális Megoldások Kft.",
    label_role: "Érdeklődés tárgya / Szerepkör típusa",
    opt_role_1: "Főállású ServiceNow Architekt pozíció",
    opt_role_2: "Automatizáció / Agentic munkafolyamatok",
    opt_role_3: "Projektalapú megbízás / Tanácsadás",
    label_phone: "Telefonszám",
    label_optional: "(Opcionális)",
    ph_phone: "pl. +43 660 ... / +36 ...",
    label_message: "Üzenet / Megbízás részletei",
    ph_message: "Írja le a megbízást, a platformkörnyezetet, a kihívásokat vagy a tervezett időkeretet...",
    btn_submit: "Üzenet küldése",
    btn_submitting: "Küldés folyamatban...",
    hint_direct: "Vagy közvetlen elérhetőség:",
    err_name: "Kérjük, adja meg a nevét",
    err_email: "Kérjük, adjon meg érvényes e-mail címet",
    err_message: "Kérjük, írjon üzenetet",
    status_success: "Köszönöm megkeresését! Üzenetét sikeresen megkaptam, hamarosan válaszolok.",
    status_error: "Az üzenetet jelenleg nem sikerült elküldeni. Kérjük, írjon közvetlenül a ghorvath@gmail.com címre.",

    // Lábléc & Értesítés
    footer_text: "Készült tiszta HTML és Vanilla CSS alapokon. Helyi Mac mini LLM és n8n meghajtással.",
    toast_copied: "{label} másolva a vágólapra!"
  }
};

// Export for usage in script.js and modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TRANSLATIONS;
}
