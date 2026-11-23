import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FiMoon, FiSun, FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";
import { NavLinks } from "../../constants/constants";

const Navbar = () => {
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme ?? "light";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container-x nav__inner">
        <Link href="/" className="nav__brand" aria-label="CarMania home">
          <span className="nav__mark">C</span>
          Car<span className="nav__accent">Mania</span>
        </Link>

        <nav className={`nav__links ${open ? "nav__links--open" : ""}`}>
          {NavLinks.map((item) => (
            <Link key={item.id} href={item.link} onClick={() => setOpen(false)}>
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <button
            className="icon-btn"
            onClick={themeContext?.toggleTheme}
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? <FiMoon /> : <FiSun />}
          </button>
          <Link href="/Contact" className="btn-x btn-primary-x nav__cta">
            Book a test drive
          </Link>
          <button
            className="icon-btn nav__toggle"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
