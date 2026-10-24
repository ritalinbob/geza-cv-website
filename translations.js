/**
 * Multilingual Translations Dictionary for Geza Horvath Portfolio
 * Languages supported: English ('en'), German ('de'), Hungarian ('hu')
 */

const TRANSLATIONS = {
  en: {
    // Document
    page_title: "Geza Horvath — ServiceNow Architect",
    meta_description: "ServiceNow Architect portfolio with 8+ years driving platform architecture, enterprise integrations, and cross-system automation.",

    // Top Navigation
    nav_about: "About",
    nav_experience: "Experience",
    nav_competencies: "Competencies",
    nav_credentials: "Credentials & Education",
    nav_credentials_short: "Credentials",
    nav_contact: "Contact",

    // Sidebar Bio
    author_role: "ServiceNow Architect",
    author_lead: "Enterprise ServiceNow Architect with 8+ years driving platform architecture, enterprise integrations, and cross-system automation.",
    status_pill: "8+ Years Platform Architecture · Open to Opportunities",
    location_text: "Pressbaum, Austria",

    // Section 1: About
    section_about: "About",
    about_p: "<strong>ServiceNow Architect with 8+ years</strong> driving <strong>platform architecture, enterprise integrations, and cross-system automation</strong>. Bootstrapped a <strong class=\"accent-color\">greenfield 6-instance ServiceNow landscape</strong>, steered platform decoupling through a corporate divestiture, and architected core <strong class=\"accent-color\">ITSM, CMDB/Discovery, HAM</strong>, and <strong class=\"accent-color\">Vulnerability Response</strong> solutions. Built an in-house <strong class=\"accent-color\">agentic AI engineering toolchain in VS Code</strong> adopted by the developer team to accelerate platform delivery.",

    // Section 2: Experience
    section_experience: "Experience",
    exp_ontinue_period: "2023 &mdash; Present",
    exp_ontinue_role: "ServiceNow Architect – Business Applications · Ontinue",
    exp_ontinue_loc: "Remote / Vienna, Austria",
    exp_ontinue_b1: "Lead ServiceNow platform architecture, roadmaps, and release governance following the corporate operational spin-off from Open Systems.",
    exp_ontinue_b2: "Architected and deployed <strong>ITSM, CMDB, Hardware Asset Management (HAM)</strong>, and <strong>Vulnerability Response (VR)</strong> integrated with Tenable and Nessus scanners.",
    exp_ontinue_b3: "Established continuous infrastructure discovery via <strong>MID Servers, Azure Cloud Discovery, Agent Client Collector (ACC)</strong>, and Service Graph Connectors.",
    exp_ontinue_b4: "Engineered cross-platform HR boarding automations connecting BambooHR, ServiceNow, and Microsoft Entra ID (Azure AD) via REST endpoints and Power Automate.",
    exp_ontinue_b5: "Built and deployed an in-house <strong>VS Code agentic AI toolchain</strong> with custom skills for automated code reviews and GlideScript generation, adopted team-wide to accelerate delivery.",
    exp_ontinue_b6: "Supervise Business Applications access governance, user management, and administrative operations in <strong>Salesforce</strong>.",
    exp_ontinue_b7: "Maintain data pipelines across Cloudomation (Python middleware) and Jitterbit, verifying ETL loads and troubleshooting data warehouse schemas using SQL.",

    exp_open_period: "2022 &mdash; 2023",
    exp_open_role: "ServiceNow Architect – Business Applications · Open Systems",
    exp_open_loc: "Hybrid / Vienna, Austria",
    exp_open_b1: "Bootstrapped the greenfield ServiceNow ecosystem by standing up and configuring <strong>6 initial instances</strong> with standardized security, ACLs, and update-set pipelines.",
    exp_open_b2: "Established baseline instance cloning runbooks, release gates, and platform upgrade procedures.",
    exp_open_b3: "Executed technical platform separation and infrastructure decoupling required for the operational spin-off into Ontinue.",

    exp_tri_period: "2018 &mdash; 2022",
    exp_tri_role: "Senior ServiceNow Developer · Tricentis GmbH",
    exp_tri_loc: "Vienna, Austria",
    exp_tri_b1: "Delivered high-availability platform solutions across ITSM and Custom Applications in an Agile/Scrum engineering team.",
    exp_tri_b2: "Engineered bi-directional REST integrations with core enterprise platforms: <strong>Workday, JIRA, Coveo AI Search</strong>, and <strong>Cornerstone</strong>.",
    exp_tri_b3: "Executed high-risk database migrations, including an ITSM-to-CSM schema migration and consolidating legacy acquisitions data into ServiceNow.",
    exp_tri_b4: "Rescued an external vendor's stalled implementation, refactoring broken scripts and data models under tight deadlines for production cutover.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Early Career Roles",
    exp_early_r1: "<strong>Mobility Manager</strong> &middot; Service24 GmbH (2016 &ndash; 2018)",
    exp_early_r2: "<strong>Customer Care Specialist</strong> &middot; Avis Budget Group (2015 &ndash; 2016)",
    tag_ops: "Operations Coordination",
    tag_incident: "Incident Management",
    tag_customer: "Customer Success",

    // Section 3: Competencies
    section_competencies: "Competencies",
    comp_title_1: "Platform Architecture & Governance",
    comp_desc_1: "6-Instance Multi-Environment Topology, Release Governance, Cloning Runbooks, Scoped Apps, ATF Test Suites, Instance Upgrades.",
    comp_title_2: "Modules & Operations",
    comp_desc_2: "ITSM, CMDB, Discovery (MID Servers, Azure Cloud, ACC), Service Graph Connectors, HAM, Vulnerability Response (Tenable, Nessus).",
    comp_title_3: "Integrations, Middleware & Data",
    comp_desc_3: "Scripted REST, Webhooks, Middleware (Cloudomation, Jitterbit), Relational Data Warehouses (SQL), IntegrationHub.",
    comp_title_4: "Enterprise Automation & Identity",
    comp_desc_4: "Microsoft Entra ID (Azure AD), BambooHR, Power Automate REST triggers, End-to-End Onboarding/Offboarding Automations.",
    comp_title_5: "AI & Engineering Tooling",
    comp_desc_5: "VS Code Agentic Development Pipelines, Custom Agent Skills, Modern JavaScript / GlideScript, Python (Foundational).",

    // Section 4: Credentials & Education
    section_credentials: "Credentials & Education",
    heading_certifications: "Certifications",
    cert_1: "<strong>Develop Generative AI Applications: Get Started</strong> &mdash; IBM (Coursera, 2026)",
    cert_2: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow (2020)",
    cert_3: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow (2019)",
    cert_4: "<strong>Python Programming (Parts 1 & 2) & Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Education",
    edu_1: "<strong>Junior Java Programmer</strong> (Intensive 5-Month Program) &middot; Braining Hub, Budapest (2017 &ndash; 2018)",
    edu_2: "<strong>Master of Arts: International Relations</strong> &middot; Corvinus University of Budapest (2012 &ndash; 2015)",
    edu_3: "<strong>Bachelor of Science: Security and Defense Policy</strong> &middot; Zrínyi Miklós National Defence University (2006 &ndash; 2009)",

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
    opt_role_2: "Contract / Consulting Program",
    opt_role_3: "Greenfield / Platform Decoupling",
    opt_role_4: "Integrations & Discovery / CMDB",
    opt_role_5: "General Leadership / Advisory",
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
    page_title: "Geza Horvath — ServiceNow Architect",
    meta_description: "ServiceNow Architect Portfolio mit über 8 Jahren Erfahrung in Plattformarchitektur, Unternehmensintegrationen und systemübergreifender Automatisierung.",

    // Hauptnavigation
    nav_about: "Über mich",
    nav_experience: "Erfahrung",
    nav_competencies: "Kompetenzen",
    nav_credentials: "Qualifikationen & Ausbildung",
    nav_credentials_short: "Qualifikationen",
    nav_contact: "Kontakt",

    // Seitenleiste Bio
    author_role: "ServiceNow Architect",
    author_lead: "Enterprise ServiceNow Architect mit über 8 Jahren Erfahrung in Plattformarchitektur, Unternehmensintegrationen und systemübergreifender Automatisierung.",
    status_pill: "8+ Jahre Plattformarchitektur · Offen für neue Möglichkeiten",
    location_text: "Pressbaum, Österreich",

    // Abschnitt 1: Über mich
    section_about: "Über mich",
    about_p: "<strong>ServiceNow Architect mit über 8 Jahren Erfahrung</strong> in der Leitung von <strong>Plattformarchitektur, Unternehmensintegrationen und systemübergreifender Automatisierung</strong>. Aufbau einer zukunftssicheren <strong class=\"accent-color\">Greenfield-ServiceNow-Landschaft mit 6 Instanzen</strong>, technische Plattform-Entflechtung im Rahmen einer Unternehmensabspaltung sowie Konzeption von Kernlösungen in <strong class=\"accent-color\">ITSM, CMDB/Discovery, HAM</strong> und <strong class=\"accent-color\">Vulnerability Response</strong>. Entwicklung einer internen <strong class=\"accent-color\">VS Code Agentic AI-Toolchain</strong>, die teamweit eingeführt wurde, um Plattform-Bereitstellungen zu beschleunigen.",

    // Abschnitt 2: Berufserfahrung
    section_experience: "Berufserfahrung",
    exp_ontinue_period: "2023 &mdash; Heute",
    exp_ontinue_role: "ServiceNow Architect – Business Applications · Ontinue",
    exp_ontinue_loc: "Remote / Wien, Österreich",
    exp_ontinue_b1: "Leitung der ServiceNow-Plattformarchitektur, Roadmaps und Release-Governance nach dem operativen Spin-off von Open Systems.",
    exp_ontinue_b2: "Konzeption und Bereitstellung von <strong>ITSM, CMDB, Hardware Asset Management (HAM)</strong> und <strong>Vulnerability Response (VR)</strong> mit Tenable- und Nessus-Scanner-Anbindung.",
    exp_ontinue_b3: "Etablierung kontinuierlicher Infrastruktur-Discovery mittels <strong>MID Servern, Azure Cloud Discovery, Agent Client Collector (ACC)</strong> und Service Graph Connectors.",
    exp_ontinue_b4: "Entwicklung plattformübergreifender HR-Boarding-Automatisierungen zur Anbindung von BambooHR, ServiceNow und Microsoft Entra ID (Azure AD) via REST und Power Automate.",
    exp_ontinue_b5: "Aufbau einer internen <strong>VS Code Agentic AI-Toolchain</strong> mit maßgeschneiderten Skills für automatische Code-Reviews und GlideScript-Generierung, teamweit eingeführt.",
    exp_ontinue_b6: "Überwachung der Governance für Business-Applications-Zugriffe, Benutzerverwaltung und Administration in <strong>Salesforce</strong>.",
    exp_ontinue_b7: "Pflege von Daten-Pipelines über Cloudomation (Python-Middleware) und Jitterbit, Verifizierung von ETL-Loads und Fehlerbehebung in Data Warehouses mittels SQL.",

    exp_open_period: "2022 &mdash; 2023",
    exp_open_role: "ServiceNow Architect – Business Applications · Open Systems",
    exp_open_loc: "Hybrid / Wien, Österreich",
    exp_open_b1: "Aufbau des Greenfield-ServiceNow-Ökosystems durch Konfiguration von <strong>6 Kerninstanzen</strong> mit standardisierter Sicherheit, ACLs und Update-Set-Pipelines.",
    exp_open_b2: "Etablierung standardisierter Klonprofil-Runbooks, Release-Gates und Plattform-Upgrade-Verfahren.",
    exp_open_b3: "Durchführung der technischen Plattform-Entflechtung und Datenmigrationen für den operativen Spin-off zu Ontinue.",

    exp_tri_period: "2018 &mdash; 2022",
    exp_tri_role: "Senior ServiceNow Developer · Tricentis GmbH",
    exp_tri_loc: "Wien, Österreich",
    exp_tri_b1: "Bereitstellung hochverfügbarer Plattformlösungen in ITSM und Custom Applications in einem agilen Scrum-Entwicklungsteam.",
    exp_tri_b2: "Entwicklung bidirektionaler REST-Integrationen mit zentralen Unternehmensplattformen: <strong>Workday, JIRA, Coveo AI Search</strong> und <strong>Cornerstone</strong>.",
    exp_tri_b3: "Durchführung geschäftskritischer Datenbankmigrationen, darunter eine ITSM-zu-CSM-Schemamigration und Konsolidierung von Übernahmedaten in ServiceNow.",
    exp_tri_b4: "Erfolgreiche Rettung und Sanierung einer gescheiterten externen Implementierung unter engem Zeitplan für den Produktionsstart.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Frühere berufliche Stationen",
    exp_early_r1: "<strong>Mobility Manager</strong> &middot; Service24 GmbH (2016 &ndash; 2018)",
    exp_early_r2: "<strong>Customer Care Specialist</strong> &middot; Avis Budget Group (2015 &ndash; 2016)",
    tag_ops: "Betriebskoordination",
    tag_incident: "Incident Management",
    tag_customer: "Kundenbetreuung",

    // Abschnitt 3: Kompetenzen
    section_competencies: "Kompetenzen",
    comp_title_1: "Plattformarchitektur & Governance",
    comp_desc_1: "Multi-Instanz-Topologie (6 Instanzen), Release-Governance, Klon-Runbooks, Scoped Apps, ATF-Test-Suites, Upgrades.",
    comp_title_2: "Module & Plattform-Betrieb",
    comp_desc_2: "ITSM, CMDB, Discovery (MID Server, Azure Cloud, ACC), Service Graph Connectors, HAM, Vulnerability Response (Tenable, Nessus).",
    comp_title_3: "Integrationen, Middleware & Daten",
    comp_desc_3: "Scripted REST, Webhooks, Middleware (Cloudomation, Jitterbit), Relationale Data Warehouses (SQL), IntegrationHub.",
    comp_title_4: "Unternehmensautomatisierung & Identität",
    comp_desc_4: "Microsoft Entra ID (Azure AD), BambooHR, Power Automate REST-Trigger, End-to-End Onboarding/Offboarding-Workflows.",
    comp_title_5: "KI & Entwicklungs-Tools",
    comp_desc_5: "VS Code Agentic Development Pipelines, maßgeschneiderte Agent Skills, Modernes JavaScript / GlideScript, Python (Grundlagen).",

    // Abschnitt 4: Qualifikationen & Ausbildung
    section_credentials: "Qualifikationen & Ausbildung",
    heading_certifications: "Zertifizierungen",
    cert_1: "<strong>Develop Generative AI Applications: Get Started</strong> &mdash; IBM (Coursera, 2026)",
    cert_2: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow (2020)",
    cert_3: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow (2019)",
    cert_4: "<strong>Python Programming (Parts 1 & 2) & Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Ausbildung",
    edu_1: "<strong>Junior Java Programmer</strong> (5-monatiges Intensivprogramm) &middot; Braining Hub, Budapest (2017 &ndash; 2018)",
    edu_2: "<strong>Master of Arts: Internationale Beziehungen</strong> &middot; Corvinus-Universität Budapest (2012 &ndash; 2015)",
    edu_3: "<strong>Bachelor of Science: Sicherheits- und Verteidigungspolitik</strong> &middot; Zrínyi Miklós Nationale Verteidigungsuniversität (2006 &ndash; 2009)",

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
    opt_role_1: "Festanstellung ServiceNow Architecture",
    opt_role_2: "Freiberufliches Mandat / Beratung",
    opt_role_3: "Greenfield / Plattform-Entflechtung",
    opt_role_4: "Integrationen & Discovery / CMDB",
    opt_role_5: "Allgemeine Führung / Advisory",
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
    page_title: "Horváth Géza — ServiceNow Architekt",
    meta_description: "ServiceNow Architekt portfólió több mint 8 év tapasztalattal platformarchitektúrában, vállalati integrációkban és rendszereken átívelő automatizálásban.",

    // Felső navigáció
    nav_about: "Rólam",
    nav_experience: "Tapasztalat",
    nav_competencies: "Kompetenciák",
    nav_credentials: "Képesítések & Tanulmányok",
    nav_credentials_short: "Képesítések",
    nav_contact: "Kapcsolat",

    // Oldalsáv Bio
    author_role: "ServiceNow Architekt",
    author_lead: "Enterprise ServiceNow Architect több mint 8 év tapasztalattal a platformarchitektúra, vállalati integrációk és rendszereken átívelő automatizálás területén.",
    status_pill: "8+ év platformarchitektúra · Nyitott új lehetőségekre",
    location_text: "Pressbaum, Ausztria",

    // 1. szakasz: Rólam
    section_about: "Rólam",
    about_p: "<strong>ServiceNow Architekt több mint 8 év tapasztalattal</strong> a <strong>platformarchitektúra, vállalati integrációk és rendszereken átívelő automatizálás</strong> területén. Zöldmezős beruházásként felépített egy <strong class=\"accent-color\">6 példányos ServiceNow környezetet</strong>, levezényelte a vállalati kiváláshoz kapcsolódó rendszerszétválasztást, valamint alapvető <strong class=\"accent-color\">ITSM, CMDB/Discovery, HAM</strong> és <strong class=\"accent-color\">Sérülékenységkezelési (VR)</strong> megoldásokat valósított meg. Kifejlesztett egy belső, <strong class=\"accent-color\">VS Code-alapú ágens AI fejlesztői eszköztárat</strong>, amelyet a teljes csapat átvett a platformszállítás felgyorsítására.",

    // 2. szakasz: Szakmai tapasztalat
    section_experience: "Szakmai Tapasztalat",
    exp_ontinue_period: "2023 &mdash; Jelenleg",
    exp_ontinue_role: "ServiceNow Architekt – Üzleti Alkalmazások · Ontinue",
    exp_ontinue_loc: "Remote / Bécs, Ausztria",
    exp_ontinue_b1: "A ServiceNow platformarchitektúra, műszaki ütemtervek és kiadási irányítás (Release Governance) vezetése az Open Systems-ből történt operatív kiválás után.",
    exp_ontinue_b2: "<strong>ITSM, CMDB, Hardver Eszközkezelés (HAM)</strong> és Tenable/Nessus szkennerekkel integrált <strong>Sérülékenységkezelés (VR)</strong> tervezése és bevezetése.",
    exp_ontinue_b3: "Folyamatos infrastruktúra-felderítés kiépítése <strong>MID szerverek, Azure Cloud Discovery, Agent Client Collector (ACC)</strong> és Service Graph Connectors segítségével.",
    exp_ontinue_b4: "Rendszereken átívelő HR beléptetési automatizációk fejlesztése a BambooHR, ServiceNow és Microsoft Entra ID (Azure AD) összekapcsolásával REST és Power Automate segítségével.",
    exp_ontinue_b5: "Egyedi <strong>VS Code ágens AI eszköztár</strong> kifejlesztése automatizált kódellenőrzésre és GlideScript generálásra, melyet a teljes fejlesztőcsapat átvett.",
    exp_ontinue_b6: "Üzleti alkalmazások hozzáférés-irányításának, felhasználókezelésének és adminisztrációjának felügyelete <strong>Salesforce-ban</strong>.",
    exp_ontinue_b7: "Adatfolyamatok karbantartása Cloudomation (Python köztesréteg) és Jitterbit rendszerekben, ETL betöltések ellenőrzése és adattárház-sémák hibakeresése SQL segítségével.",

    exp_open_period: "2022 &mdash; 2023",
    exp_open_role: "ServiceNow Architekt – Üzleti Alkalmazások · Open Systems",
    exp_open_loc: "Hibrid / Bécs, Ausztria",
    exp_open_b1: "Zöldmezős ServiceNow ökoszisztéma felépítése <strong>6 kezdeti példány</strong> konfigurálásával, szabványosított biztonsági beállításokkal, ACL-ekkel és update-set folyamatokkal.",
    exp_open_b2: "Alapszintű klónozási leírások, kiadási ellenőrzőpontok és platformfrissítési eljárások kidolgozása.",
    exp_open_b3: "A technikai platform-szétválasztás és infrastruktúra-szétválasztás lebonyolítása az Ontinue-ba történő operatív kiváláshoz.",

    exp_tri_period: "2018 &mdash; 2022",
    exp_tri_role: "Senior ServiceNow Fejlesztő · Tricentis GmbH",
    exp_tri_loc: "Bécs, Ausztria",
    exp_tri_b1: "Magas rendelkezésre állású platformmegoldások szállítása ITSM és egyedi alkalmazások területén agilis Scrum csapatban.",
    exp_tri_b2: "Kétirányú REST integrációk kiépítése alapvető vállalati rendszerekkel: <strong>Workday, JIRA, Coveo AI Search</strong> és <strong>Cornerstone</strong>.",
    exp_tri_b3: "Nagy kockázatú adatbázis-migrációk végrehajtása, beleértve az ITSM-CSM sémamigrációt és korábbi cégfelvásárlások adatainak konszolidációját.",
    exp_tri_b4: "Külső partner elakadt implementációjának helyreállítása hibás szkriptek és adatmodellek refaktorálásával szoros határidők mellett.",

    exp_early_period: "2015 &mdash; 2018",
    exp_early_title: "Korábbi Szakmai Pályafutás",
    exp_early_r1: "<strong>Mobilitási Menedzser</strong> &middot; Service24 GmbH (2016 &ndash; 2018)",
    exp_early_r2: "<strong>Ügyfélszolgálati Munkatárs</strong> &middot; Avis Budget Group (2015 &ndash; 2016)",
    tag_ops: "Operatív koordináció",
    tag_incident: "Incidenskezelés",
    tag_customer: "Ügyféltámogatás",

    // 3. szakasz: Kompetenciák
    section_competencies: "Kompetenciák",
    comp_title_1: "Platformarchitektúra & Irányítás",
    comp_desc_1: "6 példányos többkörnyezetes topológia, kiadási irányítás, klónozási leírások, Scoped alkalmazások, ATF tesztek, platformfrissítések.",
    comp_title_2: "Modulok & Üzemeltetés",
    comp_desc_2: "ITSM, CMDB, Discovery (MID szerverek, Azure Cloud, ACC), Service Graph Connectors, HAM, Sérülékenységkezelés (Tenable, Nessus).",
    comp_title_3: "Integrációk, Köztesréteg & Adatok",
    comp_desc_3: "Scripted REST, Webhookok, köztesréteg (Cloudomation, Jitterbit), relációs adattárházak (SQL), IntegrationHub.",
    comp_title_4: "Vállalati Automatizáció & Identitás",
    comp_desc_4: "Microsoft Entra ID (Azure AD), BambooHR, Power Automate REST triggerek, teljes körű be- és kiléptetési automatizáció.",
    comp_title_5: "AI & Fejlesztői Eszközök",
    comp_desc_5: "VS Code ágens fejlesztői folyamatok, egyedi ágens képességek, modern JavaScript / GlideScript, Python (alapok).",

    // 4. szakasz: Képesítések & Tanulmányok
    section_credentials: "Képesítések & Tanulmányok",
    heading_certifications: "Képesítések & Tanúsítványok",
    cert_1: "<strong>Develop Generative AI Applications: Get Started</strong> &mdash; IBM (Coursera, 2026)",
    cert_2: "<strong>Certified System Administrator (CSA)</strong> &mdash; ServiceNow (2020)",
    cert_3: "<strong>Certified Application Developer (CAD)</strong> &mdash; ServiceNow (2019)",
    cert_4: "<strong>Python Programming (Parts 1 & 2) & Principles of Computing</strong> &mdash; Rice University",
    heading_education: "Tanulmányok",
    edu_1: "<strong>Junior Java Programozó</strong> (5 hónapos intenzív képzés) &middot; Braining Hub, Budapest (2017 &ndash; 2018)",
    edu_2: "<strong>Master of Arts: Nemzetközi Kapcsolatok</strong> &middot; Budapesti Corvinus Egyetem (2012 &ndash; 2015)",
    edu_3: "<strong>Bachelor of Science: Biztonság- és Védelempolitika</strong> &middot; Zrínyi Miklós Nemzetvédelmi Egyetem (2006 &ndash; 2009)",

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
    opt_role_1: "Főállású ServiceNow Architektúra",
    opt_role_2: "Projektalapú megbízás / Tanácsadás",
    opt_role_3: "Zöldmezős bevezetés / Szétválasztás",
    opt_role_4: "Integrációk & Discovery / CMDB",
    opt_role_5: "Vezetői szerepkör / Stratégiai tanácsadás",
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
