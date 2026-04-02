# AI Travel Planner

An AI-powered travel planning web application built with **React + Vite**. It uses Google Gemini to generate personalised travel itineraries and the Google Places API to surface hotel photos and location details.

---

## Prerequisites

- Node.js 18+
- A [Google AI Studio](https://aistudio.google.com/app/apikey) API key (Gemini)
- A [Google Cloud](https://console.cloud.google.com/) project with **Places API** and **OAuth 2.0** credentials enabled

---

## Local setup

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env.local
#    then open .env.local and fill in your real API keys

# 3. Start the development server
npm run dev
```

---

## Environment variables

Copy `.env.example` to `.env.local` and set each value. All variables are prefixed with `VITE_` so that Vite inlines them into the browser bundle at build time.

| Variable | Required | Description |
|---|---|---|
| `VITE_GOOGLE_GEMMINI_AI_KEY` | ✅ | Google AI Studio API key used to call Gemini |
| `VITE_GEMINI_MODEL` | optional | Gemini model ID (default: `gemini-2.0-flash`) |
| `VITE_GOOGLE_PLACE_API` | ✅ | Google Places API key (autocomplete) |
| `VITE_GOOGLE_PLACE_API_KEY` | ✅ | Google Places API key (photo URLs) |
| `VITE_GOOGLE_OUTH_CLIENT_ID` | ✅ | Google OAuth 2.0 client ID for Sign-In |

### Choosing a Gemini model

Set `VITE_GEMINI_MODEL` to any model that supports `generateContent`. Recommended values:

| Model ID | Notes |
|---|---|
| `gemini-2.0-flash` | **Default** — stable, fast, widely available |
| `gemini-1.5-pro` | Higher quality, slower |
| `gemini-1.5-flash-latest` | Latest 1.5-flash alias |

> ⚠️ **`gemini-1.5-flash` (without `-latest`) is deprecated** and will return a 404 from the Generative Language API. Do not use it.

### API key security warning

Because this is a pure-frontend Vite app, the Gemini API key is embedded in the compiled JavaScript bundle and is **visible to anyone who inspects the page source**. For production deployments you should:

1. Create a lightweight backend endpoint (e.g. a serverless function on Vercel/Netlify/Cloud Run) that holds the key server-side and proxies requests to the Gemini API.
2. Call that backend endpoint from the frontend instead of calling `generativelanguage.googleapis.com` directly.
3. Remove `VITE_GOOGLE_GEMMINI_AI_KEY` from your Vite config once the backend is in place.

---

## Build & deploy

```bash
# Production build (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

> **Important — after changing any env var or model name:** you must run `npm run build` again and redeploy the new `dist/` folder. The hashed JS bundle filename (e.g. `index-C4vi9eFB.js`) will only update when the source code or env vars change and you rebuild. Redeploying without rebuilding will keep serving the stale bundle.

---

## Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Tech stack

- [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) — Gemini SDK
- [Firebase](https://firebase.google.com/) — data storage
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service) — location search & photos
- [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) — Google Sign-In
