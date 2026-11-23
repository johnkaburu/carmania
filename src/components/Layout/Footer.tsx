import React from "react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container-x footer__grid">
        <div className="footer__about">
          <Link href="/" className="nav__brand">
            <span className="nav__mark">C</span>
            Car<span className="nav__accent">Mania</span>
          </Link>
          <p>
            Quality new and pre-owned vehicles, inspected and ready to drive.
            Transparent pricing, easy financing, and direct imports.
          </p>
          <div className="footer__social">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
          </div>
        </div>

        <div>
          <h4>Shop</h4>
          <Link href="/cars">Our stock</Link>
          <Link href="/Tracking">Import tracking</Link>
          <Link href="/TradeIn">Trade in</Link>
          <Link href="/Accessories">Accessories</Link>
        </div>

        <div>
          <h4>Company</h4>
          <Link href="/About">About us</Link>
          <Link href="/Insuarance">Insurance</Link>
          <Link href="/Contact">Contact</Link>
        </div>

        <div>
          <h4>Visit us</h4>
          <p>Mombasa Road, Nairobi</p>
          <p>Mon – Sat, 8am – 6pm</p>
          <p>+254 700 000 000</p>
          <p>sales@carmania.co.ke</p>
        </div>
      </div>

      <div className="container-x footer__bottom">
        <span>© {new Date().getFullYear()} CarMania. All rights reserved.</span>
        <span>Privacy · Terms</span>
      </div>
    </footer>
  );
};

export default Footer;
