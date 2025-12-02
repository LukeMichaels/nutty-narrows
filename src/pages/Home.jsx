import InstagramFeed from '../components/InstagramFeed';
import SectionCard from '../components/SectionCard';

function Home() {
  return (
    <div className="page">
      <SectionCard heading="A Pacific Northwest treasure" eyebrow="About the shop">
        <p>
          Nutty Narrows is Longview's cozy thrift destination for vintage finds, budget-friendly basics,
          and the unexpected gems that keep the bridge-town spirit alive. Every visit is a chance to discover
          something that feels like it was waiting for you.
        </p>
        <div className="pill-grid">
          <span className="pill">Curated donations daily</span>
          <span className="pill">Community-first pricing</span>
          <span className="pill">Furniture, clothing, and vinyl</span>
          <span className="pill">Local art and decor</span>
        </div>
      </SectionCard>

      <SectionCard heading="Hours & Highlights" eyebrow="Plan your visit">
        <div className="info-grid">
          <div>
            <h3>Store hours</h3>
            <ul className="hours-list">
              <li>
                <span>Tuesday - Friday</span>
                <span>10:00 AM - 6:00 PM</span>
              </li>
              <li>
                <span>Saturday</span>
                <span>10:00 AM - 5:00 PM</span>
              </li>
              <li>
                <span>Sunday - Monday</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>
          <div>
            <h3>What to expect</h3>
            <ul className="feature-list">
              <li>Weekly drops of vintage denim, jackets, and cozy sweaters.</li>
              <li>Rotating home goods, from mid-century furniture to hand-thrown ceramics.</li>
              <li>Friendly staff ready to help you style a look or furnish a room.</li>
              <li>Donations welcome during open hours—ask about pick-up options.</li>
            </ul>
          </div>
        </div>
      </SectionCard>

      <SectionCard
        heading="Snapshots from the floor"
        eyebrow="Instagram feed"
        actions={(
          <a
            className="button"
            href="https://www.instagram.com/nuttynarrowsthriftshop/"
            target="_blank"
            rel="noreferrer"
          >
            Open Instagram
          </a>
        )}
      >
        <InstagramFeed />
      </SectionCard>
    </div>
  );
}

export default Home;
