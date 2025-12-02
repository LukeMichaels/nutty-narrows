import SectionCard from '../components/SectionCard';

function Contact() {
  return (
    <div className="page">
      <SectionCard heading="Visit Nutty Narrows" eyebrow="Contact & Location">
        <div className="info-grid">
          <div>
            <h3>Find us</h3>
            <p className="lead">212 Bridgeview Way, Longview, WA</p>
            <p>Steps from the Nutty Narrows Bridge—look for the cedar green awning.</p>
            <div className="contact-actions">
              <a
                className="button"
                href="https://maps.google.com/?q=Nutty+Narrows+Thrift+Shop+Longview+WA"
                target="_blank"
                rel="noreferrer"
              >
                Open in Maps
              </a>
            </div>
          </div>
          <div>
            <h3>Get in touch</h3>
            <ul className="contact-list">
              <li>
                <span className="label">Phone</span>
                <a href="tel:+13605551234">(360) 555-1234</a>
              </li>
              <li>
                <span className="label">Email</span>
                <a href="mailto:hello@nuttynarrows.shop">hello@nuttynarrows.shop</a>
              </li>
              <li>
                <span className="label">Instagram</span>
                <a
                  href="https://www.instagram.com/nuttynarrowsthriftshop/"
                  target="_blank"
                  rel="noreferrer"
                >
                  @nuttynarrowsthriftshop
                </a>
              </li>
            </ul>
            <p className="note">For donations or large-item pick-ups, call ahead so we can make space.</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard heading="How to get here" eyebrow="Parking & access">
        <ul className="feature-list">
          <li>Free parking lot behind the shop; street parking available on Bridgeview Way.</li>
          <li>Wheelchair accessible entrance and fitting rooms.</li>
          <li>Bus Route 30 stops one block away at Maple & 3rd.</li>
          <li>Bike racks available near the front doors.</li>
        </ul>
      </SectionCard>
    </div>
  );
}

export default Contact;
