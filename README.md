# PUBG Statistics

Small React app for searching PUBG player statistics by Steam player name.

## Stack

- React 18
- TypeScript
- Redux Toolkit
- React Router
- React Bootstrap
- PUBG API through `pubg.ts`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and add your PUBG API key:

```bash
REACT_APP_PUBG_API_KEY=your_pubg_api_key_here
```

3. Start the app:

```bash
npm start
```

## Scripts

```bash
npm run build
npm test -- --watchAll=false
```

## Notes

The API key is no longer committed to the repository. For a public production app, use a backend or serverless proxy instead of calling the PUBG API directly from the browser.
