import { useEffect, useState } from 'react';

import fallbackPosts from '../data/instagramPosts';

const profileUrl = 'https://www.instagram.com/nuttynarrowsthriftshop/';

function formatPost(post) {
  const dateLabel = post.timestamp
    ? new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(post.timestamp))
    : 'Instagram';
  const safeCaption = post.caption?.split('\n')[0]?.trim();
  const title = safeCaption || 'Instagram post';
  const image = post.media_type === 'VIDEO' ? post.thumbnail_url || post.media_url : post.media_url;

  return {
    id: post.id,
    title,
    tag: dateLabel,
    image,
    permalink: post.permalink,
  };
}

function InstagramFeed() {
  const [posts, setPosts] = useState(fallbackPosts);
  const [feedState, setFeedState] = useState('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadInstagramFeed() {
      try {
        const response = await fetch('/api/instagram');
        if (!response.ok) {
          throw new Error('Unable to reach Instagram API proxy');
        }

        const body = await response.json();
        const normalizedPosts = (body?.data || []).map(formatPost).filter((post) => post.image);

        if (normalizedPosts.length === 0) {
          throw new Error('Instagram API returned no media');
        }

        if (isMounted) {
          setPosts(normalizedPosts);
          setFeedState(body.source === 'live' ? 'live' : 'cache');
          setError('');
        }
      } catch (err) {
        if (isMounted) {
          setPosts(fallbackPosts);
          setFeedState('fallback');
          setError(err.message);
        }
      }
    }

    loadInstagramFeed();

    return () => {
      isMounted = false;
    };
  }, []);

  const statusLabel = {
    live: 'Live from Instagram',
    cache: 'Cached Instagram feed',
    fallback: 'Preview feed',
    loading: 'Loading feed...'
  }[feedState];

  return (
    <div className="instagram-feed">
      <div className="feed-header">
        <h3>Instagram Highlights</h3>
        <a className="button ghost" href={profileUrl} target="_blank" rel="noreferrer">
          Follow @NuttyNarrows
        </a>
      </div>
      <div className="feed-status">
        <span className={`pill pill--${feedState}`}>{statusLabel}</span>
        {error && <span className="feed-error">{error}</span>}
      </div>
      <div className="feed-grid">
        {posts.map((post) => (
          <a
            key={post.id}
            className="feed-card"
            href={post.permalink || profileUrl}
            target="_blank"
            rel="noreferrer"
          >
            <img src={post.image} alt={post.title} loading="lazy" />
            <div className="feed-card__meta">
              <p className="feed-card__title">{post.title}</p>
              <p className="feed-card__tag">{post.tag}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default InstagramFeed;
