# Mostafa Alrahal — Applied AI Engineer Portfolio

> **Project Target:** Personal engineering portfolio (`https://eng-mostafa-alrahal.github.io/portfolio/`) positioning **Mostafa Alrahal** as an **Applied AI Engineer (RAG, LLM Applications & Agentic Systems)** based in **Pittsburgh, PA** (U.S. Permanent Resident; no sponsorship required). Beyond listing past roles, the site demonstrates **how production AI systems are architected**—combining enterprise case studies from **Maly Tech Ltd** (including contributions to **Deloitte Middle East’s ME Tax Pulse**), core AI engineering pillars, categorized technical capabilities, and inspectable open-source repositories.

Live Portfolio: **<https://eng-mostafa-alrahal.github.io/portfolio/>**

---

## Site Architecture & Sections

All content and structured data live in `src/assets/i18n/en.json`:

1. **Hero / Banner (`Banner.*`)**
   - Location & work-authorization status badges (`Pittsburgh, PA · Open to Relocate` and `U.S. Permanent Resident · No Sponsorship Required`)
   - Role positioning (`APPLIED AI ENGINEER | RAG, LLM APPLICATIONS & AGENTIC SYSTEMS`)
   - Direct actions (`Get in Touch`, `View Open-Source Code`, `LinkedIn`)

2. **`01. About & Engineering Approach` (`AboutMe.*`)**
   - **Narrative & Profile Facts**: Background, Pittsburgh location, U.S. Permanent Residency, and **Damascus University B.S. in IT Engineering (AI & NLP Specialization, 3.78/4.0 GPA, WES-Evaluated U.S. Bachelor’s Equivalency)**.
   - **How I Engineer Production AI Systems (`AboutMe.Pillars`)**:
     - *Document Intelligence & High-Precision RAG* (`Docling`, `LlamaParse`, context-preserving chunking, vector databases, verbatim quote verification)
     - *Stateful Multi-Agent Orchestration* (`LangGraph`, `Google ADK`, parallel `Send` execution, Human-in-the-Loop approval gates, `MCP` tool sandboxing)
     - *Clean Architecture AI Backends* (`Python`, `FastAPI`, async `SQLAlchemy 2.0`/`PostgreSQL`, `Redis`/`Celery`, JWT auth, `pytest` suites)
   - **Categorized Technical Stack (`AboutMe.SkillCategories`)**: Grouped into *AI, LLMs & Data*, *Software & Infrastructure*, and *Additional ML & Computer Vision*.

3. **`02. Experience & Education` (`Experience.Jobs`)**
   - **Maly Tech Ltd** — *Generative AI Engineer* (Dubai, UAE | Aug 2024 – May 2026)
   - **Freelance** — *Software Developer* (Oct 2023 – Aug 2024)
   - **Education** — *Damascus University | B.S. in Information Technology Engineering (AI & NLP)* (2025 | 3.78/4.0 GPA | WES-Evaluated U.S. Bachelor's Equivalency)

4. **`03. Enterprise AI Case Studies` (`FeatureProjects.Projects`)**
   - **ME Tax Pulse — AI Tax & Legal Assistant** (*Maly Tech · Enterprise Client: Deloitte Middle East*) — includes Google Play link and Deloitte’s official August 2025 press release.
   - **AI4ALL — Customer-Specific Agent Platform** (*Maly Tech · Multi-Tenant Agent Platform*)
   - **Luna — RAG Financial Assistant** (*Maly Tech · FinTech Conversational AI*)
   - **Enterprise RAG Data Ingestion Hub** (*Maly Tech · Document Intelligence Architecture*)

5. **`04. Open-Source & Architecture Projects` (`OtherProjects.Projects`)**
   - [**LangGraph Agent — Clean Architecture**](https://github.com/eng-mostafa-alrahal/langgraph-agent-clean-architecture) — Production-oriented FastAPI + LangGraph reference backend with JWT auth, async PostgreSQL/SQLAlchemy, Redis, Celery, HITL approval, MCP tool integration, and tests.
   - [**JobRecall — AI Job Intelligence & Chrome Extension**](https://github.com/eng-mostafa-alrahal/job-recall) — Local-first Chrome Manifest V3 Side Panel extension + Dockerized Python FastAPI, SQLite (WAL), and LangChain service for <1s duplicate application detection and verbatim quote-verified eligibility extraction.
   - [**Autonomous Travel Guide — Multi-Agent Planner**](https://github.com/eng-mostafa-alrahal/autonomous-travel-guide) — LangGraph multi-agent planner with parallel specialist execution, HITL approval, and dynamic destination-scoped RAG knowledge base creation.
   - [**Multi-Tenant RAG Document Processor**](https://github.com/eng-mostafa-alrahal/rag-document-processor) — FastAPI + Celery + Redis Streams ingestion pipeline using Docling, LlamaParse, and late chunking with Cloud Run CI/CD.
   - [**Autonomous Travel Guide UI**](https://github.com/eng-mostafa-alrahal/autonomous-travel-guide-ui) — Angular 22 standalone streaming chat client with SSE phase progress and interactive HITL approval cards.
   - [**Fruitful Tree Count Management**](https://github.com/eng-mostafa-alrahal/fruitful-tree-count-management) — Graduation project using GeoDjango, OpenCV, Google Earth Engine, and PostGIS. Developed and evaluated the AI & computer-vision algorithms for automated fruit-tree detection (>90% reported accuracy; 1st Place in National Programming Competition).

6. **`05. Contact` (`Contact.*`)**
   - Direct links to [mostafa.kha.alrahal@gmail.com](mailto:mostafa.kha.alrahal@gmail.com), `+1 (724) 351-7270`, [LinkedIn](https://www.linkedin.com/in/mostafa-alrahal-368972229/), and [GitHub](https://github.com/eng-mostafa-alrahal).

---

## Theme, Background & Mobile Responsiveness

- **Palette:** **Electric AI Blue & Deep Midnight Slate** defined in `src/variables.scss` and `src/styles.scss` (`$Navy: #070d19`, `$LightNavy: #0f172a`, `$AccentBlue: #38bdf8`, `$AccentRoyal: #3b82f6`, `$AccentIndigo: #6366f1`).
- **Animated AI Graph & Aurora Background (`AppComponent`):** Fixed multi-layer background featuring drifting aurora glows, a radial-masked blueprint grid, and an HTML5 `<canvas>` node-and-edge constellation with traveling pulses. Density scales down on mobile and respects `prefers-reduced-motion`.
- **Mobile Web Responsiveness:** Optimized across phone (`360px`–`430px`), tablet (`768px`), and desktop viewports with a slide-out mobile drawer, full-width touch-friendly CTA buttons, a single-row experience tab bar (Maly Tech, Freelance, Education), case-study images that scroll with the page, and project badges that wrap when the label is long.
- **Favicon:** Browser-tab icon is the `MA` monogram (`src/favicon.ico`, `src/assets/images/favicon.svg`, `src/assets/images/favicon-32.png`, and `src/assets/images/apple-touch-icon.png`).

## Agent and crawler access

The interactive site is an Angular SPA. Research browsers that do not execute JavaScript previously saw an empty shell. The live site now also publishes JavaScript-free sources:

- [llms.txt](https://eng-mostafa-alrahal.github.io/portfolio/llms.txt) — plain-text professional profile (`/.well-known/llms.txt` is also published)
- [profile.json](https://eng-mostafa-alrahal.github.io/portfolio/profile.json) — structured machine-readable profile
- [profile.html](https://eng-mostafa-alrahal.github.io/portfolio/profile.html) — full HTML profile with no JavaScript
- [robots.txt](https://eng-mostafa-alrahal.github.io/portfolio/robots.txt) and [sitemap.xml](https://eng-mostafa-alrahal.github.io/portfolio/sitemap.xml)
- JSON-LD `Person` markup plus a crawlable `#agent-profile` block and a complete `<noscript>` fallback in `src/index.html`

After deploy, agents can fetch those URLs with a normal HTTP GET.

---

## Development & Build

### Development server
```bash
npm start
# or: ng serve
```
Navigate to `http://localhost:4200/`.

### Production build
```bash
npm run build
# or: ng build --configuration production
```
Build artifacts are output to `dist/mostafa-alrahal-portfolio`.

### Resume PDF & Cache Busting
The **Resume** button serves `src/assets/cv/MOSTAFA_ALRAHAL_RESUME.pdf` with `?v=<environment.assetVersion>`. Whenever `MOSTAFA_ALRAHAL_RESUME.pdf` or `src/assets/i18n/en.json` changes, bump `assetVersion` in `src/environments/environment.ts` and `src/environments/environment.prod.ts`.
