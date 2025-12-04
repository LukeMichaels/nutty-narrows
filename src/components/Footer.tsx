// components/Footer.tsx
import VendingBottom from "../assets/nutty_narrows_bottom.svg?react";

export default function Footer() {
  return (
    <footer className="machine-bottom">
      <VendingBottom />
      <p>© {new Date().getFullYear()} Nutty Narrows Thrift Shop. Crafted with care in Longview.</p>
    </footer>
  );
}