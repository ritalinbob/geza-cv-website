/**
 * Multilingual Translations Dictionary for Geza Horvath Portfolio
 * Languages supported: English ('en'), German ('de'), Hungarian ('hu')
 */

const TRANSLATIONS = {
  en: {
    // Document
    page_title: "Geza Horvath — ServiceNow Architect & Enterprise AI Automation Engineer",
    meta_description: "ServiceNow Architect & Enterprise AI Automation Engineer with 8+ years driving platform architecture, enterprise integrations, and cross-system automation.",

    // Top Navigation
    nav_about: "About",
    nav_experience: "Experience",
    nav_competencies: "Competencies",
    nav_credentials: "Credentials & Education",
    nav_credentials_short: "Credentials",
    nav_contact: "Contact",

    // Sidebar Bio & Identity
    author_role: "ServiceNow Architect & Enterprise AI Automation Engineer",
    author_lead: "Platform Governance, Architecture & Agentic Engineering",
    status_pill: "Available for Opportunities (Remote / Hybrid)",
    location_text: "Pressbaum (Vienna Area), Austria",

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
    about_p1: "<strong>ServiceNow Architect with 8+ years</strong> driving platform architecture, enterprise integrations, and cross-system automation. Bootstrapped a <strong>greenfield 6-instance ecosystem</strong>, led full infrastructure and data decoupling through an enterprise divestiture, and directs core <strong>ITSM, CMDB/Discovery, HAM, and Vulnerability Response</strong> environments.",
    about_p2: "Pioneers modern agentic engineering—building in-house <strong>VS Code MCP toolchains</strong> adopted team-wide to accelerate delivery and engineering automated <strong>n8n LLM workflows</strong> that eliminate operational overhead.",

    // Section 2: Experience
    section_experience: "Experience",
    exp_ontinue_period: "2023-02 &mdash; Present",
    exp_ontinue_role: "ServiceNow Architect – Business Applications · Ontinue",
    exp_ontinue_loc: "Remote / Vienna, Austria",
    exp_ontinue_b1: "<strong>Platform Ownership &amp; Security:</strong> Direct technical roadmap, platform governance, and continuous upgrades across enterprise IT instances; engineered CMDB/Discovery baselines and Vulnerability Response pipelines integrating Tenable and Nessus scanners.",
    exp_ontinue_b2: "<strong>Agentic Developer Tooling:</strong> Conceived and deployed an in-house VS Code agentic AI toolchain using custom MCP API wrappers, cutting development cycle times via automated code reviews and GlideScript generation.",
    exp_ontinue_b3: "<strong>Zero-Touch Automation:</strong> Built 100% automated HR boarding and offboarding lifecycle flows synchronizing BambooHR, ServiceNow, and Microsoft Entra ID via Power Automate and REST webhooks.",
    exp_ontinue_b4: "<strong>Data Integration &amp; Middleware:</strong> Maintain high-reliability data synchronization and ETL pipelines across Cloudomation (Python) and Jitterbit into downstream corporate data warehouses.",

    exp_open_period: "2022-05 &mdash; 2023-02",
    exp_open_role: "ServiceNow Architect – Business Applications · Open Systems",
    exp_open_loc: "Hybrid / Vienna, Austria",
    exp_open_b1: "<strong>Greenfield Architecture:</strong> Bootstrapped the core ServiceNow landscape from scratch, configuring 6 initial instances with hardened security controls, role hierarchies, and update-set deployment pipelines.",
    exp_open_b2: "<strong>Corporate Spin-Off Execution:</strong> Led platform decoupling, directory synchronization, and relational data migrations required for the operational spin-off into Ontinue without production downtime.",
    exp_open_b3: "<strong>Instance Governance &amp; Handover:</strong> Established baseline cloning runbooks and release gates, executing a structured operational handover of auxiliary departmental instances to external partners.",

    exp_tri_period: "2018-08 &mdash; 2022-04",
    exp_tri_role: "Senior ServiceNow Developer · Tricentis GmbH",
    exp_tri_loc: "Vienna, Austria",
    exp_tri_b1: "<strong>Enterprise Integrations:</strong> Engineered mission-critical bi-directional REST integrations connecting ServiceNow with Workday, JIRA, Cornerstone, and Coveo AI Search.",
    exp_tri_b2: "<strong>Complex Schema Migrations:</strong> Planned and executed high-risk database transitions, including an ITSM-to-CSM schema migration and legacy acquisition data consolidation.",
    exp_tri_b3: "<strong>Vendor Rescue:</strong> Refactored broken custom scripts and corrected underlying relational schemas under tight deadlines to recover a stalled external partner implementation.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Early Career Operations · Service24 GmbH & Avis Budget Group",
    exp_early_r1: "<strong>Mobility Manager</strong> (Service24, 2016&ndash;2018) &bull; <strong>Customer Care Specialist</strong> (Avis Budget Group, 2015&ndash;2016). Focus on process optimization, international operations, and workflow logistics.",
    tag_ops: "Process Optimization",
    tag_incident: "International Operations",
    tag_customer: "Workflow Logistics",

    // Section 3: Competencies
    section_competencies: "Competencies",
    comp_title_1: "Platform Architecture",
    comp_desc_1: "Multi-Instance Topology, Release Governance, Cloning Runbooks, Scoped Applications, ATF Automated Regression, Upgrade skipped-record resolution.",
    comp_title_2: "IT Operations & Modules",
    comp_desc_2: "ITSM, CMDB Baselines, Discovery (MID Servers, Azure Cloud, Agent Client Collector), Service Graph Connectors, HAM, Vulnerability Response (Tenable/Nessus).",
    comp_title_3: "AI & Agentic Engineering",
    comp_desc_3: "Custom MCP Server Wrappers, In-IDE Agent Toolchains, n8n LLM Workflows, Context Parsing, GlideScript Code Generation, Prompt Design.",
    comp_title_4: "Integrations & Identity",
    comp_desc_4: "Microsoft Entra ID (Azure AD), BambooHR, Power Automate, Scripted REST APIs, Webhooks, Jitterbit, Cloudomation (Python), SQL Warehouses.",

    // Section 4: Credentials & Education
    section_credentials: "Credentials & Education",
    heading_certifications: "Certifications",
    cert_1: "<strong>Develop Generative AI Applications: Get Started</strong> &mdash; IBM (2026)",
    cert_2: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow",
    cert_3: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow",
    cert_4: "<strong>Python Programming (Parts 1 &amp; 2) &amp; Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Education",
    edu_1: "<strong>Junior Java Programmer (Intensive Program)</strong> &middot; Braining Hub, Budapest (2017&ndash;2018)",
    edu_2: "<strong>Master of Arts: International Relations</strong> &middot; Corvinus University of Budapest",
    edu_3: "<strong>Bachelor of Science: Security &amp; Defense Policy</strong> &middot; Zrínyi Miklós National Defence University",

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
    page_title: "Geza Horvath — ServiceNow Architect & Enterprise AI Automation Engineer",
    meta_description: "ServiceNow Architect & Enterprise AI Automation Engineer mit über 8 Jahren Erfahrung in Plattformarchitektur, Unternehmensintegrationen und systemübergreifender Automatisierung.",

    // Hauptnavigation
    nav_about: "Über mich",
    nav_experience: "Erfahrung",
    nav_competencies: "Kompetenzen",
    nav_credentials: "Qualifikationen & Ausbildung",
    nav_credentials_short: "Qualifikationen",
    nav_contact: "Kontakt",

    // Seitenleiste Bio & Identität
    author_role: "ServiceNow Architect & Enterprise AI Automation Engineer",
    author_lead: "Plattform-Governance, Architektur & Agentic Engineering",
    status_pill: "Verfügbar für neue Möglichkeiten (Remote / Hybrid)",
    location_text: "Pressbaum (Wien Umgebung), Österreich",

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
    about_p1: "<strong>ServiceNow Architect mit über 8 Jahren Erfahrung</strong> in Plattformarchitektur, Unternehmensintegrationen und systemübergreifender Automatisierung. Aufbau eines <strong>zukunftssicheren Greenfield-Ökosystems mit 6 Instanzen</strong>, technische Plattform-Entflechtung im Rahmen einer Unternehmensabspaltung sowie Leitung von Kernumgebungen in <strong>ITSM, CMDB/Discovery, HAM und Vulnerability Response</strong>.",
    about_p2: "Pionier im modernen Agentic Engineering—Entwicklung interner <strong>VS Code MCP-Toolchains</strong>, die teamweit eingeführt wurden, um Bereitstellungszyklen zu beschleunigen, sowie automatisierten <strong>n8n LLM-Workflows</strong> zur Eliminierung operativer Mehraufwände.",

    // Abschnitt 2: Berufserfahrung
    section_experience: "Berufserfahrung",
    exp_ontinue_period: "2023-02 &mdash; Heute",
    exp_ontinue_role: "ServiceNow Architect – Business Applications · Ontinue",
    exp_ontinue_loc: "Remote / Wien, Österreich",
    exp_ontinue_b1: "<strong>Plattform-Governance &amp; Sicherheit:</strong> Leitung der technischen Roadmap, Governance und kontinuierlicher Upgrades für alle Enterprise-IT-Instanzen; Konzeption von CMDB/Discovery-Baselines und Vulnerability-Response-Pipelines mit Tenable- und Nessus-Scannern.",
    exp_ontinue_b2: "<strong>Agentic Developer Tooling:</strong> Konzeption und Bereitstellung einer internen VS Code Agentic AI-Toolchain mit maßgeschneiderten MCP-API-Wrappern zur Verkürzung der Entwicklungszyklen durch automatisierte Code-Reviews und GlideScript-Generierung.",
    exp_ontinue_b3: "<strong>Vollautomatisierung (Zero-Touch):</strong> Entwicklung vollständig automatisierter HR-Boarding- und Offboarding-Workflows zur Synchronisierung von BambooHR, ServiceNow und Microsoft Entra ID über Power Automate und REST-Webhooks.",
    exp_ontinue_b4: "<strong>Datenintegration &amp; Middleware:</strong> Betreuung hochverfügbarer Datensynchronisations- und ETL-Pipelines über Cloudomation (Python) und Jitterbit in nachgelagerte Unternehmens-Data-Warehouses.",

    exp_open_period: "2022-05 &mdash; 2023-02",
    exp_open_role: "ServiceNow Architect – Business Applications · Open Systems",
    exp_open_loc: "Hybrid / Wien, Österreich",
    exp_open_b1: "<strong>Greenfield-Architektur:</strong> Aufbau der ServiceNow-Kernlandschaft von Grund auf, Konfiguration der ersten 6 Instanzen mit gehärteten Sicherheitskontrollen, Rollenhierarchien und Update-Set-Deployment-Pipelines.",
    exp_open_b2: "<strong>Unternehmensabspaltung (Spin-off):</strong> Leitung der Plattform-Entflechtung, Verzeichnissynchronisation und relationalen Datenmigrationen für den operativen Spin-off zu Ontinue ohne Produktionsausfallzeiten.",
    exp_open_b3: "<strong>Instanz-Governance &amp; Übergabe:</strong> Etablierung standardisierter Cloning-Runbooks und Release-Gates sowie strukturierte operative Übergabe sekundärer Abteilungsinstanzen an externe Partner.",

    exp_tri_period: "2018-08 &mdash; 2022-04",
    exp_tri_role: "Senior ServiceNow Developer · Tricentis GmbH",
    exp_tri_loc: "Wien, Österreich",
    exp_tri_b1: "<strong>Unternehmensintegrationen:</strong> Entwicklung geschäftskritischer bidirektionaler REST-Integrationen zur Anbindung von ServiceNow an Workday, JIRA, Cornerstone und Coveo AI Search.",
    exp_tri_b2: "<strong>Komplexe Schemamigrationen:</strong> Planung und Durchführung risikoreicher Datenbankumstellungen, darunter eine ITSM-zu-CSM-Schemamigration und Konsolidierung von Daten aus Unternehmensübernahmen (M&amp;A) in ServiceNow.",
    exp_tri_b3: "<strong>Vendor Rescue (Projekt-Turnaround):</strong> Refactoring fehlerhafter Skripte und Bereinigung relationaler Schemata unter engem Zeitplan zur Rettung einer festgefahrenen externen Partnerimplementierung.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Frühere berufliche Stationen · Service24 GmbH & Avis Budget Group",
    exp_early_r1: "<strong>Mobility Manager</strong> (Service24, 2016&ndash;2018) &bull; <strong>Customer Care Specialist</strong> (Avis Budget Group, 2015&ndash;2016). Schwerpunkt auf Prozessoptimierung, internationalen Abläufen und Workflow-Logistik.",
    tag_ops: "Prozessoptimierung",
    tag_incident: "Internationale Abläufe",
    tag_customer: "Workflow-Logistik",

    // Abschnitt 3: Kompetenzen
    section_competencies: "Kompetenzen",
    comp_title_1: "Plattformarchitektur",
    comp_desc_1: "Multi-Instanz-Topologie, Release-Governance, Cloning-Runbooks, Scoped Applications, ATF automatisierte Regressionstests, Bereinigung von Skipped Records bei Upgrades.",
    comp_title_2: "IT-Betrieb & Module",
    comp_desc_2: "ITSM, CMDB-Baselines, Discovery (MID Server, Azure Cloud, Agent Client Collector), Service Graph Connectors, HAM, Vulnerability Response (Tenable/Nessus).",
    comp_title_3: "KI & Agentic Engineering",
    comp_desc_3: "Custom MCP Server Wrapper, In-IDE Agent Toolchains, n8n LLM-Workflows, Kontext-Parsing, GlideScript-Codegenerierung, Prompt Design.",
    comp_title_4: "Integrationen & Identität",
    comp_desc_4: "Microsoft Entra ID (Azure AD), BambooHR, Power Automate, Scripted REST APIs, Webhooks, Jitterbit, Cloudomation (Python), SQL Warehouses.",

    // Abschnitt 4: Qualifikationen & Ausbildung
    section_credentials: "Qualifikationen & Ausbildung",
    heading_certifications: "Zertifizierungen",
    cert_1: "<strong>Develop Generative AI Applications: Get Started</strong> &mdash; IBM (2026)",
    cert_2: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow",
    cert_3: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow",
    cert_4: "<strong>Python Programming (Parts 1 &amp; 2) &amp; Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Ausbildung",
    edu_1: "<strong>Junior Java Programmer (Intensivprogramm)</strong> &middot; Braining Hub, Budapest (2017&ndash;2018)",
    edu_2: "<strong>Master of Arts: Internationale Beziehungen</strong> &middot; Corvinus-Universität Budapest",
    edu_3: "<strong>Bachelor of Science: Sicherheits- und Verteidigungspolitik</strong> &middot; Zrínyi Miklós Nationale Verteidigungsuniversität",

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
    page_title: "Horváth Géza — ServiceNow Architekt & Enterprise AI Automatizálási Mérnök",
    meta_description: "ServiceNow Architekt & Enterprise AI Automatizálási Mérnök több mint 8 év tapasztalattal a platformarchitektúra, vállalati integrációk és rendszereken átívelő automatizálás területén.",

    // Felső navigáció
    nav_about: "Rólam",
    nav_experience: "Tapasztalat",
    nav_competencies: "Kompetenciák",
    nav_credentials: "Képesítések & Tanulmányok",
    nav_credentials_short: "Képesítések",
    nav_contact: "Kapcsolat",

    // Oldalsáv Bio & Identitás
    author_role: "ServiceNow Architekt & Enterprise AI Automation Engineer",
    author_lead: "Platform-governance, Architektúra & Agentic AI",
    status_pill: "Nyitott új lehetőségekre (Remote / Hibrid)",
    location_text: "Pressbaum (Bécs környéke), Ausztria",

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
    about_p1: "<strong>ServiceNow Architekt több mint 8 év tapasztalattal</strong> a platformarchitektúra, vállalati integrációk és rendszereken átívelő automatizálás területén. Zöldmezős (greenfield) környezetként épített fel egy <strong>6 példányos ServiceNow architektúrát</strong>, levezényelte a teljes infrastruktúra- és adatbázis-szétválasztást egy vállalati kiválás (carve-out) során, valamint kiemelt <strong>ITSM, CMDB/Discovery, HAM és Vulnerability Response</strong> rendszereket irányít.",
    about_p2: "Úttörő a modern Agentic AI fejlesztési megoldásokban—belső <strong>VS Code MCP eszköztárak</strong> fejlesztésével, melyeket a teljes csapat átvett a szállítási folyamatok felgyorsítására, valamint olyan automatizált <strong>n8n LLM munkafolyamatok</strong> megvalósításával, amelyek megszüntetik az operatív adminisztrációs terheket.",

    // 2. szakasz: Szakmai tapasztalat
    section_experience: "Szakmai Tapasztalat",
    exp_ontinue_period: "2023-02 &mdash; Jelenleg",
    exp_ontinue_role: "ServiceNow Architekt – Üzleti Alkalmazások · Ontinue",
    exp_ontinue_loc: "Remote / Bécs, Ausztria",
    exp_ontinue_b1: "<strong>Platform-governance &amp; Biztonság:</strong> A technikai ütemterv, platform-governance és folyamatos frissítések (upgrades) vezetése vállalati ServiceNow példányokon; CMDB/Discovery alapok és Tenable/Nessus szkennerekkel integrált Vulnerability Response folyamatok kiépítése.",
    exp_ontinue_b2: "<strong>Agentic Developer Tooling:</strong> Egyedi MCP API wrapper-ekre épülő belső VS Code Agentic AI eszköztár megtervezése és bevezetése, a fejlesztési ciklusidők csökkentése automatizált kódellenőrzéssel és GlideScript generálással.",
    exp_ontinue_b3: "<strong>Beavatkozás nélküli automatizáció:</strong> 100%-ban automatizált HR be- és kiléptetési életciklus-folyamatok építése a BambooHR, ServiceNow és Microsoft Entra ID szinkronizálásával Power Automate és REST webhookok segítségével.",
    exp_ontinue_b4: "<strong>Adatintegráció &amp; Middleware:</strong> Magas megbízhatóságú adatszinkronizációs és ETL folyamatok fenntartása Cloudomation (Python) és Jitterbit rendszereken keresztül a vállalati adattárházak felé.",

    exp_open_period: "2022-05 &mdash; 2023-02",
    exp_open_role: "ServiceNow Architekt – Üzleti Alkalmazások · Open Systems",
    exp_open_loc: "Hibrid / Bécs, Ausztria",
    exp_open_b1: "<strong>Greenfield architektúra:</strong> A ServiceNow alaprendszer kiépítése az alapoktól, 6 kezdeti példány konfigurálása megerősített biztonsági szabályokkal, szerepkör-hierarchiákkal és Update Set deployment folyamatokkal.",
    exp_open_b2: "<strong>Vállalati kiválás (Spin-off) lebonyolítása:</strong> A platform szétválasztásának, címtárszinkronizációjának és relációs adatmigrációinak vezetése az Ontinue-ba történő operatív kiváláshoz, termeléskiesés nélkül.",
    exp_open_b3: "<strong>Példány-governance &amp; Átadás:</strong> Alapszintű klónozási runbookok és release-gate-ek kidolgozása, kiegészítő osztályos példányok strukturált operatív átadása külső partnereknek.",

    exp_tri_period: "2018-08 &mdash; 2022-04",
    exp_tri_role: "Senior ServiceNow Fejlesztő · Tricentis GmbH",
    exp_tri_loc: "Bécs, Ausztria",
    exp_tri_b1: "<strong>Vállalati Integrációk:</strong> Üzletileg kritikus kétirányú REST integrációk kiépítése a ServiceNow és a Workday, JIRA, Cornerstone valamint Coveo AI Search között.",
    exp_tri_b2: "<strong>Összetett Sémamigrációk:</strong> Nagy kockázatú adatbázis-átállások megtervezése és végrehajtása, beleértve az ITSM-ről CSM-re történő sémamigrációt és korábbi cégfelvásárlások adatainak konszolidációját.",
    exp_tri_b3: "<strong>Beszállítói projekt mentése (Vendor Rescue):</strong> Hibás egyedi szkriptek refaktorálása és a mögöttes relációs adatmodellek javítása szoros határidők mellett egy elakadt külső partneri bevezetés helyreállítására.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Korábbi Szakmai Pályafutás · Service24 GmbH & Avis Budget Group",
    exp_early_r1: "<strong>Mobilitási Menedzser</strong> (Service24, 2016&ndash;2018) &bull; <strong>Ügyfélszolgálati Munkatárs</strong> (Avis Budget Group, 2015&ndash;2016). Fókuszban a folyamatoptimalizálás, a nemzetközi műveletek és a munkafolyamat-logisztika.",
    tag_ops: "Folyamatoptimalizálás",
    tag_incident: "Nemzetközi műveletek",
    tag_customer: "Munkafolyamat-logisztika",

    // 3. szakasz: Kompetenciák
    section_competencies: "Kompetenciák",
    comp_title_1: "Platformarchitektúra",
    comp_desc_1: "Többpéldányos topológia, Release Governance, klónozási runbookok, Scoped Applications, ATF automatizált regressziós tesztelés, Upgrade során kihagyott rekordok (skipped records) kezelése.",
    comp_title_2: "IT Üzemeltetés & Modulok",
    comp_desc_2: "ITSM, CMDB alapok, Discovery (MID szerverek, Azure Cloud, Agent Client Collector), Service Graph Connectors, HAM, Vulnerability Response (Tenable/Nessus).",
    comp_title_3: "AI & Agentic Engineering",
    comp_desc_3: "Egyedi MCP szerver wrapper-ek, IDE-be integrált Agentic eszköztárak, n8n LLM munkafolyamatok, kontextus-feldolgozás, GlideScript kódgenerálás, Prompt Design.",
    comp_title_4: "Integrációk & Identitás",
    comp_desc_4: "Microsoft Entra ID (Azure AD), BambooHR, Power Automate, Scripted REST API-k, Webhookok, Jitterbit, Cloudomation (Python), SQL adattárházak.",

    // 4. szakasz: Képesítések & Tanulmányok
    section_credentials: "Képesítések & Tanulmányok",
    heading_certifications: "Képesítések & Tanúsítványok",
    cert_1: "<strong>Develop Generative AI Applications: Get Started</strong> &mdash; IBM (2026)",
    cert_2: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow",
    cert_3: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow",
    cert_4: "<strong>Python Programming (Parts 1 &amp; 2) &amp; Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Tanulmányok",
    edu_1: "<strong>Junior Java Programozó (Intenzív képzés)</strong> &middot; Braining Hub, Budapest (2017&ndash;2018)",
    edu_2: "<strong>Master of Arts: Nemzetközi Kapcsolatok</strong> &middot; Budapesti Corvinus Egyetem",
    edu_3: "<strong>Bachelor of Science: Biztonság- és Védelempolitika</strong> &middot; Zrínyi Miklós Nemzetvédelmi Egyetem",

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
