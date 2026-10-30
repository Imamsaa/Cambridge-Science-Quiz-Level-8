# Cambridge Science Stage 8 Quiz

A static, GitHub Pages-ready English science quiz based on Cambridge Lower Secondary Science Learner's Book 8, Chapters 1–4.

## Repository structure

- `index.html` — quiz interface
- `style.css` — responsive dark CBT styling
- `questions.js` — 40 English multiple-choice questions (10 per chapter)
- `script.js` — quiz timer, navigation, alarm, scoring, review, and English–Indonesian vocabulary tooltip

## Run locally

Open `index.html` in a modern browser. No build step, package installation, framework, database, or external CDN is required.

## GitHub Pages deployment

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Save and wait for GitHub Pages to publish.

The project URL will follow this format:

`https://imamsaa.github.io/Cambridge-Science-Quiz-Level-8/`

## Interface layout

The interface uses a clean white theme and is fitted to the browser viewport. Home and question screens are designed to avoid page-level scrolling. The long answer review is collapsed by default and can be expanded when needed.

## Quiz features

- 40 multiple-choice questions, divided evenly across Chapters 1–4.
- English questions and answer options.
- Word-level Indonesian translations on hover, keyboard focus, or tap.
- A 10-minute timer for each question; remaining time is retained when navigating between questions.
- Alarm overlay when the timer reaches zero.
- Final score, per-chapter performance, and answer review.
- Student responses are kept in the browser and are not submitted to a server.

## Maintenance

The default working branch is `main`. Future requested quiz changes should be applied directly to this branch, while preserving unrelated existing work. Verify JavaScript syntax and ensure the static file references remain relative so the project continues to work from a GitHub Pages project URL.
