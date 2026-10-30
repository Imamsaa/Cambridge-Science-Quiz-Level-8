# Cambridge Science Stage 8 Quiz

A static, GitHub Pages-ready English science quiz based on Cambridge Lower Secondary Science Learner's Book 8, Chapters 1–4.

## Repository structure

- `index.html` — quiz interface
- Tailwind CSS v4 utility classes in `index.html` and dynamic quiz components in `script.js`
- `questions.js` — 40 English multiple-choice questions (10 per chapter)
- `script.js` — question navigation, explicit answer submission, scoring, review, and English–Indonesian vocabulary tooltip

## Run locally

Open `index.html` in a modern browser. No local build step or package installation is needed. The Tailwind Browser script is loaded from jsDelivr, so an internet connection is required to style the page.

## GitHub Pages deployment

1. Open **Settings → Pages**.
2. Under **Build and deployment**, select **Deploy from a branch**.
3. Choose branch `main` and folder `/ (root)`.
4. Save and wait for GitHub Pages to publish.

The project URL will follow this format:

`https://imamsaa.github.io/Cambridge-Science-Quiz-Level-8/`

## Interface layout

The interface is built with Tailwind CSS utility classes, uses a clean white theme, and fits the home and quiz screens to the browser viewport. The long answer review is collapsed by default and can be expanded when needed. The project currently uses Tailwind's Play CDN for rapid iteration; Tailwind documents this CDN as development-only, not the recommended production setup.

## Quiz features

- 40 multiple-choice questions, divided evenly across Chapters 1–4.
- English questions and answer options.
- Word-level Indonesian translations on hover, keyboard focus, or tap.
- No countdown timer or alarm.
- Students select an option first, then press **Submit Answer** to confirm it.
- The next-question button stays disabled until the current answer has been submitted.
- Submitted answers are locked and receive immediate correctness feedback.
- Final score, per-chapter performance, and answer review.
- Student responses are kept in the browser and are not submitted to a server.

## Maintenance

The default working branch is `main`. Future requested quiz changes should be applied directly to this branch, while preserving unrelated existing work. Verify JavaScript syntax and ensure the static file references remain relative so the project continues to work from a GitHub Pages project URL. For production without a runtime CDN dependency, compile Tailwind CSS to a static stylesheet with the Tailwind CLI and replace the Browser CDN script.
