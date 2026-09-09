# Mostafa Alrahal — Portfolio

I build end-to-end, production-ready **LLM applications** and **RAG systems**, from scalable data ingestion to agentic workflows. I work mainly in `Python, FastAPI, LangChain, LangGraph, and Google ADK`, with strong data experience in `Neo4j` and `MongoDB`. This portfolio is built with **Angular** to showcase experience, projects, and contact—clean, reusable structure and sensible front-end patterns.

Click the link below to open my portfolio.

<https://eng-mostafa-alrahal.github.io/portfolio/>

## Site overview

- **About me** — Background, stack, and skills (`AboutMe.Skills` in `en.json`)
- **Experience** — GenAI at MALY, freelance software development
- **Projects** — Deloitte AI Tax Assistant, Luna, AI4ALL, data ingestion pipeline, plus personal projects (Multi-Agent Travel Planner, Document Processing Service, Academic AI Projects, and more)
- **Contact** — [mostafa.kha.alrahal@gmail.com](mailto:mostafa.kha.alrahal@gmail.com)

Content strings live in `src/assets/i18n/` (for example `en.json`). The contact address is defined there as `Contact.Email`. Skills under About are driven by `AboutMe.Skills`.

Featured projects under `FeatureProjects.Projects` each need an `imgs` array (paths under `src/assets/images/`). Desktop and mobile both use the carousel (swipe / drag between shots); tall screenshots can also scroll inside the image area.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can also run `npm start`, which invokes the same dev server.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. For a production build, use `ng build --configuration production` (or `npm run build` as defined in this project).

## Deploy (GitHub Pages)

Pushing to `main` runs `.github/workflows/deploy-github-pages.yml`, which builds the Angular app with `--base-href /portfolio/` and deploys `dist/mostafa-alrahal-portfolio` through GitHub Pages (GitHub Actions). The workflow also copies `index.html` to `404.html` so Angular routes still load on refresh.

The live site is:

<https://eng-mostafa-alrahal.github.io/portfolio/>

The Resume button opens `assets/cv/MOSTAFA_ALRAHAL_RESUME.pdf` from the site `base href`, with `environment.assetVersion` as a cache-busting query. Bump `assetVersion` in `src/environments/environment.prod.ts` whenever the resume PDF or `en.json` copy changes so browsers and the service worker do not keep the old files.

If the first deploy fails, open **Settings → Pages**, set **Source** to **GitHub Actions**, then re-run **Deploy to GitHub Pages**. First-time publishes can take a minute or two after a green Actions run.

You can also publish locally with `angular-cli-ghpages`:

```bash
npm run deploy
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
