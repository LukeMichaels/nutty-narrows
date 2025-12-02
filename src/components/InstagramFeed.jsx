import { useEffect, useState } from 'react';
import { fetchInstagramMedia } from '../api/instagram';
import sampleInstagramPosts from '../data/instagramPosts';

function formatTimeAgo(timestamp) {
  if (!timestamp) return '';

  const now = new Date();
  const then = new Date(timestamp);
  const seconds = Math.floor((now - then) / 1000);

  const intervals = [
    { label: 'd', seconds: 86400 },
    { label: 'h', seconds: 3600 },
    { label: 'm', seconds: 60 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) return `${count}${interval.label} ago`;
  }

  return 'Just now';
}

function InstagramFeed() {
  const [posts, setPosts] = useState(sampleInstagramPosts);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadFeed = async () => {
      try {
        const media = await fetchInstagramMedia();

        if (!isMounted || media.length === 0) return;

        const normalized = media.map((item) => ({
          id: item.id,
          title: item.caption?.split('\n')[0] ?? 'Instagram post',
          tag: 'Instagram',
          image: item.media_url,
          alt: item.caption || 'Instagram post',
          caption: item.caption ?? '',
          timeAgo: formatTimeAgo(item.timestamp),
          likes: '—',
          comments: '—',
          permalink: item.permalink,
        }));

        setPosts(normalized);
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError('Showing recent highlights while Instagram is unavailable.');
        }
      }
    };

    loadFeed();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="instagram-feed">
      <div className="feed-header">
        <div>
          <p className="eyebrow">Live from Instagram</p>
          <div className="feed-title-group">
            <h3>@NuttyNarrows</h3>
            <span className="feed-dot" aria-hidden="true" />
            <p className="feed-subtitle">Snapshots from this week&apos;s floor refresh.</p>
          </div>
          {error && <p className="feed-subtitle subtle">{error}</p>}
        </div>
        <div className="feed-actions">
          <a className="button" href="https://instagram.com" target="_blank" rel="noreferrer">
            Follow us
          </a>
          <a className="button ghost" href="https://instagram.com" target="_blank" rel="noreferrer">
            Open Instagram
          </a>
        </div>
      </div>
      <div className="feed-grid">
        {posts.map((post) => (
          <article key={post.id} className="feed-card">
            <div className="feed-image">
              <img src={post.image} alt={post.alt} loading="lazy" />
              <span className="feed-tag">{post.tag}</span>
            </div>
            <div className="feed-card__body">
              <div className="feed-card__title-row">
                <p className="feed-card__title">{post.title}</p>
                <span className="feed-time">{post.timeAgo}</span>
              </div>
              <p className="feed-caption">{post.caption}</p>
              <div className="feed-meta" aria-label="Post engagement">
                <span aria-label={`${post.likes} likes`}>
                  ❤️ <strong>{post.likes}</strong>
                </span>
                <span aria-label={`${post.comments} comments`}>
                  💬 <strong>{post.comments}</strong>
                </span>
              </div>
              {post.permalink && (
                <a className="feed-link" href={post.permalink} target="_blank" rel="noreferrer">
                  View on Instagram
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default InstagramFeed;
