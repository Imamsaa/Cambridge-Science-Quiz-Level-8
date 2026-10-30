# Cambridge Science Stage 8 Quiz

Static website for GitHub Pages. No build step, framework, database, or external CDN is required.

## Files
- `index.html` — page structure
- `style.css` — responsive dark CBT interface
- `questions.js` — 40 English multiple-choice questions (10 per chapter)
- `script.js` — quiz logic, timer, alarm, scoring, review, and English–Indonesian word tooltip

## Run locally
Open `index.html` in a modern browser.

## Publish with GitHub Pages
1. Create a GitHub repository (or open your existing repository).
2. Upload all four files to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose branch `main` and folder `/ (root)`, then click **Save**.
6. Wait for GitHub Pages to publish. Your site URL will look like `https://USERNAME.github.io/REPOSITORY/`.

## Notes
- Each question has its own 10-minute countdown. Its remaining time is retained when navigating away and back.
- The alarm uses the browser's audio API and may require the user to interact with the page first.
- Word meanings appear on hover, keyboard focus, or tap. The built-in dictionary is contextual; uncommon words may show a generic context hint.
- The site is fully static and does not send student answers to a server.
