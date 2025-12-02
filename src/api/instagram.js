const BASE_URL = 'https://graph.instagram.com';
const MEDIA_FIELDS = 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp';

/**
 * Fetch recent media using the Instagram Basic Display API.
 * Expects a long-lived token in VITE_IG_BASIC_TOKEN.
 */
export async function fetchInstagramMedia(limit = 12) {
  const token = import.meta.env.VITE_IG_BASIC_TOKEN;

  if (!token) {
    throw new Error('Missing VITE_IG_BASIC_TOKEN');
  }

  const url = `${BASE_URL}/me/media?fields=${MEDIA_FIELDS}&access_token=${token}&limit=${limit}`;
  const response = await fetch(url);

  if (!response.ok) {
    const message = await response.text();
    throw new Error(`Instagram API error ${response.status}: ${message}`);
  }

  const data = await response.json();
  return data?.data ?? [];
}
