// /components/VendingLayout.tsx
import { useState, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import KeypadNav from "./KeypadNav";
import LcdDisplay from "./LcdDisplay";

const CODE_TO_ROUTE = {
  A1: "/about",
  B1: "/locations",
  C1: "/contact",
};

export default function VendingLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [lcdMessage, setLcdMessage] = useState("SELECT AN ITEM");
  const [lastCode, setLastCode] = useState(null);

  const handleCodeSelect = useCallback(
    (code) => {
      setLastCode(code);

      const route = CODE_TO_ROUTE[code];
      if (!route) {
        setLcdMessage(`CODE ${code} SOLD OUT`);
        return;
      }

      setLcdMessage(`DISPENSING ${labelForRoute(route)}…`);
      navigate(route);
    },
    [navigate]
  );

  // Update LCD text when route changes (e.g., via regular menu links)
  const currentLabel = labelForRoute(location.pathname);

  return (
    <div className="vending-shell">

      <div className="vending-inner">
        <section className="vending-main">
          {/* This wraps the animated Routes */}
          {children}
        </section>

        <aside className="vending-controls" aria-label="Site navigation">
          {/* Squirrel logo could go here */}
          <div className="vm-logo-squirrel" aria-hidden="true" />

          {/* LCD display */}
          <LcdDisplay
            mainLine={lcdMessage}
            subLine={currentLabel ? `NOW VIEWING: ${currentLabel}` : ""}
          />

          {/* Primary menu (real nav links) */}
          <nav
            className="vm-menu"
            aria-label="Main pages menu"
          >
            <NavLink to="/about" onClick={() => setLcdMessage("DISPENSING ABOUT…")}>
              About
            </NavLink>
            <NavLink
              to="/locations"
              onClick={() => setLcdMessage("DISPENSING LOCATIONS…")}
            >
              Locations
            </NavLink>
            <NavLink
              to="/contact"
              onClick={() => setLcdMessage("DISPENSING CONTACT…")}
            >
              Contact
            </NavLink>
          </nav>

          {/* Keypad (fun alternate nav) */}
          <KeypadNav onCodeSelect={handleCodeSelect} lastCode={lastCode} />
        </aside>
      </div>
    </div>
  );
}

function labelForRoute(pathname) {
  switch (pathname) {
    case "/":
      return "HOME";
    case "/about":
      return "ABOUT";
    case "/locations":
      return "LOCATIONS";
    case "/contact":
      return "CONTACT";
    default:
      return "";
  }
}
