import express from 'express';

const app = express();
const PORT = process.env.PORT || 5174;
const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const CACHE_WINDOW_MS = Number(process.env.INSTAGRAM_CACHE_MS || 5 * 60 * 1000);
const MEDIA_LIMIT = Number(process.env.INSTAGRAM_MEDIA_LIMIT || 9);

let cachedResponse = null;
let cachedAt = 0;

function buildInstagramUrl() {
  const url = new URL('https://graph.instagram.com/me/media');
  url.searchParams.set('fields', 'id,caption,media_url,permalink,thumbnail_url,media_type,timestamp');
  url.searchParams.set('limit', MEDIA_LIMIT.toString());
  url.searchParams.set('access_token', ACCESS_TOKEN);
  return url;
}

async function fetchInstagramMedia() {
  if (!ACCESS_TOKEN) {
    const error = new Error('INSTAGRAM_ACCESS_TOKEN is not configured.');
    error.statusCode = 500;
    throw error;
  }

  const now = Date.now();
  if (cachedResponse && now - cachedAt < CACHE_WINDOW_MS) {
    return { source: 'cache', ...cachedResponse };
  }

  const url = buildInstagramUrl();
  const response = await fetch(url);

  if (!response.ok) {
    const details = await response.text();
    const error = new Error(`Instagram API error: ${response.status} ${details}`);
    error.statusCode = response.status;
    throw error;
  }

  const payload = await response.json();
  cachedResponse = payload;
  cachedAt = now;
  return { source: 'live', ...payload };
}

app.get('/api/instagram', async (_req, res) => {
  try {
    const data = await fetchInstagramMedia();
    res.json(data);
  } catch (error) {
    const status = error.statusCode || 500;
    const message =
      status === 401 || status === 403
        ? 'Instagram authentication failed. Check your INSTAGRAM_ACCESS_TOKEN.'
        : error.message;
    res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log(`Instagram proxy listening on http://localhost:${PORT}`);
});
