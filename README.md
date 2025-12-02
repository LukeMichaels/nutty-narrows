# Nutty Narrows Thrift Shop

Vite + React site with an Instagram proxy that pulls live posts from the Nutty Narrows Thrift Shop account using the Instagram Basic Display API.

## Getting started
1. Install dependencies
   ```bash
   npm install
   ```

2. Configure Instagram credentials (required for the live feed)
   - Copy `.env.example` to `.env` and set `INSTAGRAM_ACCESS_TOKEN` to a long-lived Basic Display token for the Nutty Narrows account.
   - Optional: adjust `INSTAGRAM_CACHE_MS` (milliseconds) and `INSTAGRAM_MEDIA_LIMIT` (number of posts to return).

   Quick Basic Display token checklist:
   - Create a Meta app and add the **Instagram Basic Display** product.
   - Add `https://localhost` to the Valid OAuth Redirect URIs (development) and complete the OAuth flow for the Nutty Narrows account.
   - Exchange the returned short-lived token for a long-lived one via `https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret=APP_SECRET&access_token=SHORT_LIVED_TOKEN`.
   - Paste the long-lived token into `INSTAGRAM_ACCESS_TOKEN` and refresh it every ~60 days with `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=LONG_LIVED_TOKEN`.

3. Run the Instagram proxy (listens on port 5174 by default)
   ```bash
   npm run server
   ```

4. In a second terminal, start the Vite dev server (proxies `/api` to the proxy during development)
   ```bash
   npm run dev
   ```

The Instagram feed will fall back to sample content if the proxy is unreachable or no posts are returned.
