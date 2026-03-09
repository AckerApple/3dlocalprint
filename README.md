# 3dlocalprint

[gh-pages display](https://ackerapple.github.io/3dlocalprint/)

## Local Firebase Config (Required)

Firebase web config is loaded from Vite environment variables, not hardcoded source.

### Files

- `.env.example`: committed template
- `.env.local`: your local machine config (ignored by git)

### First-time setup (any computer)

1. Copy template:
   - `cp .env.example .env.local`
2. Open `.env.local`
3. Paste your Firebase values, especially:
   - `VITE_FIREBASE_API_KEY`
4. Start dev server:
   - `npm run dev`

### Deploy from your machine

`npm run deploy` uses your local env at build time. Make sure `.env.local` has valid Firebase values before deploying.

### Moving to a new computer

1. Clone repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local`
4. Fill `.env.local` with your Firebase config
5. Run `npm run dev`

If env values are missing, the app throws a startup error naming the missing `VITE_FIREBASE_*` key.
