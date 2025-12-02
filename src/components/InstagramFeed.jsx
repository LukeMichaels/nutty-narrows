import posts from '../data/instagramPosts';

function InstagramFeed() {
  return (
    <div className="instagram-feed">
      <div className="feed-header">
        <h3>Instagram Highlights</h3>
        <a className="button ghost" href="https://instagram.com" target="_blank" rel="noreferrer">
          Follow @NuttyNarrows
        </a>
      </div>
      <div className="feed-grid">
        {posts.map((post) => (
          <article key={post.id} className="feed-card">
            <img src={post.image} alt={post.title} loading="lazy" />
            <div className="feed-card__meta">
              <p className="feed-card__title">{post.title}</p>
              <p className="feed-card__tag">{post.tag}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default InstagramFeed;
