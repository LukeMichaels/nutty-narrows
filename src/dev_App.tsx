// src/App.tsx
import type { FC } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "framer-motion";

import VendingLayout from "./components/VendingLayout";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./pages/About";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Locations from "./pages/Locations";

const App: FC = () => {
  return (
    <VendingLayout>
      <AnimatedRoutes />
    </VendingLayout>
  );
};

const AnimatedRoutes: FC = () => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const variants: Variants = {
    initial: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: -40, scale: 0.98 },
    animate: prefersReducedMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.45,
            ease: [0.22, 0.61, 0.36, 1],
          },
        },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 40,
          scale: 0.98,
          transition: { duration: 0.25, ease: "easeIn" },
        },
  };

  return (
    <div className="app">
      <Header />

      <div className="site-main" id="main-content">
        <AnimatePresence mode="wait">
          <motion.section
            key={location.pathname}
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="vm-content-window"
            aria-live="polite"
            tabIndex={-1} >
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/locations" element={<Locations />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.section>
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
};

export default App;
