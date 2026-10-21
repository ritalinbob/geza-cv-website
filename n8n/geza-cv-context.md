# Geza Horvath
**ServiceNow Architect & Enterprise Business Applications Lead**  
Pressbaum / Vienna, Austria • +43 660 108 2050 • ghorvath@gmail.com • [linkedin.com/in/geza-horvath-16288a185](https://www.linkedin.com/in/geza-horvath-16288a185)

---

### Executive Profile
ServiceNow Architect and Enterprise Applications Lead with 8+ years directing multi-instance platform engineering, cross-system automation, and complex data migrations. Bootstrapped a greenfield multi-instance ServiceNow ecosystem, architected corporate divestiture splits across disparate data warehouses, and implemented core ITSM, CMDB/Discovery, HAM, and Vulnerability Response solutions. Built an in-house VS Code agentic AI toolchain and custom MCP API wrappers adopted team-wide to accelerate platform delivery, automate code review, and eliminate manual configuration overhead.

---

### Core Competencies

* **Platform Architecture & Governance:** Multi-Instance Topology, Release Governance, Upgrade Cycles (Sub-Prod to Prod skipped-record capture), Clone Profile Management, Scoped Apps, Idempotent ATF Suites.
* **Modules & Operations:** ITSM, CMDB, Discovery (MID Servers, Azure Cloud, ACC), Service Graph Connectors, HAM, Vulnerability Response (Tenable, Nessus).
* **Enterprise Automation & Identity:** Microsoft Entra ID (Azure AD), BambooHR, Power Automate REST triggers, Zero-Touch HR Boarding & Role Transfers, Automated RBAC Group Provisioning.
* **Integrations, Middleware & Data:** n8n, Cloudomation (Python), Jitterbit, Scripted REST, Webhooks, Relational Data Warehouses (SQL/Views), IntegrationHub.
* **AI & Engineering Tooling:** VS Code Agentic Development Pipelines, Custom Model Context Protocol (MCP) ServiceNow API Wrappers, Custom Agent Skills, Modern JavaScript / GlideScript, Python (Foundational).

---

### Professional Experience

#### **Ontinue** | *Remote / Vienna, Austria*
**ServiceNow Architect & Business Applications Lead** | **2023-02 – Present**
* Direct platform architecture, technical roadmaps, and upgrade governance for the ServiceNow landscape following the operational spin-off from Open Systems.
* Architected end-to-end **HR boarding operations** (onboarding, offboarding, cross-boarding): delivered catalog items that trigger automated multi-system flows syncing employee records across BambooHR, ServiceNow, and Entra ID via REST.
* Designed and deployed an automated **Salesforce Account Enrichment engine in n8n**, chaining public data APIs, ZoomInfo endpoints, deduplication logic, task queues, and structured LLM prompts.
* Deployed **ITSM**, **CMDB**, **Hardware Asset Management (HAM)**, and **Vulnerability Response (VR)** integrated with Tenable and Nessus scanners for automated task orchestration.
* Established continuous infrastructure discovery via **MID Servers**, **Azure Cloud Discovery**, **Agent Client Collector (ACC)**, and **Service Graph Connectors**.
* Built a custom **VS Code agentic development pipeline** using custom MCP API wrappers to sync artifacts directly with instances, bypassing repetitive UI navigation and accelerating team velocity.
* Supervise Business Applications access governance, user management, and administrative operations in **Salesforce**.
* Maintain data pipelines across **Cloudomation** (Python) and **Jitterbit**, verifying ETL loads and troubleshooting data warehouse schemas using SQL (TablePlus, SSMS).

#### **Open Systems** | *Hybrid / Vienna, Austria*
**ServiceNow Architect – Business Applications** | **2022-05 – 2023-02**
* Bootstrapped the greenfield platform architecture by configuring **4 core ServiceNow instances** with automated Azure user/group provisioning, executing a structured operational handover to external development partners.
* Architected the enterprise IT ServiceNow instance, implementing baseline ITSM workflows, security roles, and update-set pipelines.
* Led technical platform decoupling and cross-system data migrations across data warehouses and core business applications during the corporate spin-off into Ontinue.

#### **Tricentis GmbH** | *Vienna, Austria*
**Senior ServiceNow Developer** | **2018-08 – 2022-04**
* Delivered high-availability platform solutions across ITSM and Custom Applications in an Agile/Scrum engineering team.
* Engineered bi-directional REST integrations connecting ServiceNow with Workday, JIRA, Coveo AI Search, and Cornerstone.
* Executed enterprise-level database migrations, including an ITSM-to-CSM schema migration and consolidating legacy acquisitions data into ServiceNow.
* Rescued an external vendor's stalled implementation, refactoring broken custom scripts and data models under tight deadlines for successful production cutover.

#### **Early Career**
* **Mobility Manager** | Service24 GmbH (2016 – 2018) • **Customer Care Specialist** | Avis Budget Group (2015 – 2016)

---

### Certifications

* **Develop Generative AI Applications: Get Started** – IBM (Coursera, 2026)
* **Certified System Administrator (CSA)** – ServiceNow (2020)
* **Certified Application Developer (CAD)** – ServiceNow (2019)
* **Python Programming (Parts 1 & 2) & Principles of Computing** – Rice University

---

### Education

* **Junior Java Programmer (Intensive 5-Month Program)** | Braining Hub, Budapest (2017 – 2018)
* **Master of Arts: International Relations** | Corvinus University of Budapest (2012 – 2015)
* **Bachelor of Science: Security and Defense Policy** | Zrínyi Miklós National Defence University (2006 – 2009)

---
---

# Appendix: Context & Interview Dossier for AI Model

### 1. Notable Achievements & Key Projects
* **Greenfield Platform Launch & Handover (Open Systems):** Configured 4 initial core ServiceNow instances from the ground up, establishing automated Azure AD / Entra ID user provisioning, security policies, and group lifecycle management. Successfully documented and handed over operational responsibility to an external development partner (Wrangu).
* **Corporate Split & Cross-System Data Migration (Open Systems -> Ontinue):** Maintained continuous platform availability during the corporate separation. Took ownership not only of ServiceNow instance decoupling, but also cross-system data migrations across corporate data warehouses and peripheral business applications.
* **End-to-End Enterprise HR Boarding Orchestration:** Built a unified, zero-touch HR lifecycle system. Architected catalog items for HR teams that trigger automated multi-system fulfillment flows: syncing employee master records across BambooHR, ServiceNow, and Entra ID, granting necessary application access, creating directory group memberships, and maintaining automated error handling and audit call-to-actions.
* **AI & API-Driven Account Enrichment Engine (n8n & Salesforce):** Architected and deployed an automation workflow in n8n that ingests Salesforce accounts, cleanses and deduplicates records, queues enrichment tasks, and enriches data by chaining ZoomInfo API endpoints and web data through structured LLM prompts.
* **Vendor Implementation Rescue (Tricentis):** Took over a stalled, failing deployment delivered by an external vendor. Refactored critical business logic, repaired underlying data models, and deployed on-schedule without production disruption.

### 2. Platform Ownership & The Automation-First Principle
* **End-to-End Functional Ownership:** Proactively engages internal departments and business stakeholders to discover operational pain points. Personally owns the feasibility analysis, solution architecture, technical specifications, sprint planning, task delegation, testing, production deployment, and post-go-live support.
* **The Automation-First Philosophy:** Systematically identifies and targets recurring manual effort for automated replacement. Replaces manual IT fulfillment tickets with self-service catalog items backed by automated approval flows, dynamic Entra ID group assignments, and automated ticket resolution.

### 3. Governance, Upgrades & Architectural Decision-Making
* **Out-of-the-Box (OOB) vs. Customization:** Strongly favors OOB functionality to ensure seamless platform upgrades and vendor support. Evaluates heavy customization requests by demonstrating native capability and conducting a clear effort-benefit analysis. Guides stakeholders toward standard or lightly customized solutions that achieve business goals with lower total cost of ownership.
* **Design & Documentation Standards:** Translates business requirements from JIRA into architectural blueprints using draw.io flowcharts and maintains comprehensive technical decision logs in Confluence.
* **Upgrade Safety & Technical Debt Governance:**
  * Enforces strict sub-production release gating and skipped-record capture before touching production.
  * Implements rigorous clone profile exclusions, data preserving rules, and automated test framework (ATF) regression suites.
  * Conducts systematic technical debt audits to retire obsolete scripts, deprecated APIs, and unmaintained custom schema.

### 4. Work Style, Personality & Collaboration
* **Pragmatic & Solution-Oriented:** Bridges high-level architectural strategy with hands-on, roll-up-your-sleeves execution. Doesn't just design systems on paper; builds, debugs, and delivers them directly.
* **Calm Under High Stakes:** Proven resilience during high-risk platform operations, including corporate spin-offs, large-scale multi-system data warehouse migrations, and vendor turnaround rescues under tight deadlines.
* **Cross-Functional Communication:** Fluent in communicating across diverse domains—translating business logic with HR and Sales teams, data governance with DBAs and security engineers, and strategic roadmaps with leadership.
* **Automation-First Mindset:** Continuously looks for ways to optimize repetitive developer workflows and business operations, leveraging modern tooling like n8n, Python, AI coding agents, and custom MCP integrations.
* **Location & Work Arrangements:** Based in Pressbaum / Vienna, Austria. Open to hybrid arrangements in the Vienna metropolitan area as well as fully remote opportunities.
