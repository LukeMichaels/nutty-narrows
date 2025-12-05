// src/pages/Landing.tsx
import type { FC } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/nutty_narrows_thrift_shop_logo_badge.svg?react";

const Landing: FC = () => {
  useEffect(() => {
    // Add a special class when this page is mounted
    document.body.classList.add("is-landing-only");
    return () => {
      document.body.classList.remove("is-landing-only");
    };
  }, []);

  return (
    <main className="placeholder" aria-labelledby="nn-title">
      <section className="placeholder-card">
        
        <div className="placeholder-header">
          <div className="placeholder-header-left">
            <Logo className="placeholder-logo" />
          </div>
          <div className="placeholder-header-right">
            <h1 id="nn-title" className="placeholder-title">
              Nutty Narrows Thrift Shop
            </h1>
            <p className="placeholder-tagline">Local makers. Little treasures.</p>
          </div>
        </div>

        <p className="placeholder-body">
          Our squirrel-stocked vending machine is getting ready for its big debut online. In the meantime, you can visit us in person inside{" "} <strong>Café Guse</strong> in Longview, Washington.
        </p>

        <div className="placeholder-actions">
          <a
            href="https://www.instagram.com/nuttynarrowsthriftshop/"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faInstagram} className="btn-icon" />
            <span>Instagram</span>
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61569094314580"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faFacebookF} className="btn-icon" />
            <span>Facebook</span>
          </a>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=46.135676,-122.9349237"
            className="btn btn-outline"
            target="_blank"
            rel="noopener noreferrer" >
            <FontAwesomeIcon icon={faLocationDot} className="btn-icon" />
            <span>Get directions</span>
          </a>
        </div>

        <p className="placeholder-footnote">
          Located inside Café Guse · 
          <a href="https://www.google.com/maps/dir/?api=1&destination=46.135676,-122.9349237"
            target="_blank"
            rel="noopener noreferrer" >
            1208 Commerce Ave Longview WA
          </a>
        </p>
      </section>
    </main>
  );
};

export default Landing;
