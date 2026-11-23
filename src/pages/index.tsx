import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { FiSearch, FiShield, FiTruck, FiCreditCard, FiRefreshCw, FiArrowRight } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { Inventory, Makes } from "../constants/inventory";
import CarCard from "../components/HomePage/CarCard";
import Layout from "../components/Layout/Layout";
import { PRICE_OPTIONS } from "../components/Inventory/InventoryBrowser";
import heroDark from "../assets/car-dark.png";
import heroLight from "../assets/carlight.png";

const FEATURES = [
  { icon: FiShield, title: "150-point inspection", text: "Every vehicle is checked by certified technicians before it hits the lot." },
  { icon: FiCreditCard, title: "Flexible financing", text: "Partnered with leading banks for fast approvals and fair rates." },
  { icon: FiTruck, title: "Direct imports", text: "Source your exact spec from Japan, UK or Dubai — we handle the paperwork." },
  { icon: FiRefreshCw, title: "Easy trade-ins", text: "Get an instant valuation and put your current car towards the next one." },
];

// A hand-picked spread across price points and body types.
const FEATURED_IDS = [41, 34, 28, 23, 5, 35];
const featured = FEATURED_IDS.map((id) => Inventory.find((v) => v.id === id)!).filter(Boolean);

export default function Home() {
  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  const theme = themeContext?.theme ?? "light";

  const [query, setQuery] = useState("");
  const [maxPrice, setMaxPrice] = useState(0);

  return (
    <Layout>
      {/* Hero */}
      <section className="hero">
        <div className="container-x hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Kenya&apos;s premium car mart</span>
            <h1>
              Find the car that <span className="text-accent">moves you.</span>
            </h1>
            <p className="hero__lead">
              Hand-picked, fully inspected vehicles with transparent pricing.
              Drive away today or import your exact spec.
            </p>

            <form
              className="search"
              onSubmit={(e) => {
                e.preventDefault();
                const params: Record<string, string> = {};
                if (query.trim()) params.q = query.trim();
                if (maxPrice) params.max = String(maxPrice);
                router.push({ pathname: "/cars", query: params });
              }}
            >
              <label className="search__field">
                <FiSearch />
                <input
                  type="search"
                  placeholder="Search make or model…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search make or model"
                />
              </label>
              <select
                className="search__select"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                aria-label="Budget"
              >
                {PRICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
              <button type="submit" className="btn-x btn-primary-x">Search</button>
            </form>

            <dl className="hero__stats">
              <div><dt>{Inventory.length}+</dt><dd>Cars in stock</dd></div>
              <div><dt>4.9★</dt><dd>Customer rating</dd></div>
              <div><dt>48h</dt><dd>Finance approval</dd></div>
            </dl>
          </div>

          <div className="hero__visual">
            <Image
              src={heroDark}
              alt="Featured car"
              className={`hero__img ${theme === "dark" ? "" : "is-active"}`}
              aria-hidden={theme === "dark"}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <Image
              src={heroLight}
              alt="Featured car"
              className={`hero__img hero__img--zoom ${theme === "dark" ? "is-active" : ""}`}
              aria-hidden={theme !== "dark"}
              priority
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="brands container-x">
        <p>Browse by brand</p>
        <div className="brands__row">
          {Makes.map((m) => (
            <Link key={m} href={{ pathname: "/cars", query: { make: m } }} className="chip">
              {m}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="section container-x">
        <div className="section__head">
          <div>
            <span className="eyebrow">Featured</span>
            <h2>Hand-picked this week</h2>
          </div>
          <Link href="/cars" className="link-arrow">
            View all {Inventory.length} cars <FiArrowRight />
          </Link>
        </div>
        <div className="car-grid">
          {featured.map((car, i) => (
            <CarCard key={car.id} car={car} priority={i < 3} />
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="section container-x">
        <div className="section__head section__head--center">
          <div>
            <span className="eyebrow">Why CarMania</span>
            <h2>Buying a car, minus the hassle</h2>
          </div>
        </div>
        <div className="features">
          {FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="feature">
              <span className="feature__icon"><Icon /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x">
        <div className="cta">
          <div>
            <h2>Thinking of upgrading?</h2>
            <p>Get a free valuation on your current car in under 2 minutes.</p>
          </div>
          <div className="cta__actions">
            <Link href="/TradeIn" className="btn-x btn-primary-x">Value my car</Link>
            <Link href="/Contact" className="btn-x cta__ghost">Talk to sales</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
