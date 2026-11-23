import Link from "next/link";
import { FiAward, FiHeart, FiShield, FiUsers } from "react-icons/fi";
import Layout from "../components/Layout/Layout";
import { Inventory } from "../constants/inventory";

const VALUES = [
  { icon: FiShield, title: "Honest pricing", text: "The price you see is the price you pay. No hidden fees, no pressure." },
  { icon: FiAward, title: "Inspected quality", text: "Every car passes a 150-point inspection and comes with a history report." },
  { icon: FiUsers, title: "People first", text: "Our advisors are salaried, not on commission, so they're on your side." },
  { icon: FiHeart, title: "After-sale care", text: "Servicing, insurance and registration support long after you drive away." },
];

const STATS = [
  { value: "2,500+", label: "Cars sold" },
  { value: `${Inventory.length}+`, label: "In stock today" },
  { value: "4.9★", label: "Average rating" },
  { value: "12 yrs", label: "In business" },
];

export default function About() {
  return (
    <Layout title="About us" description="Learn about CarMania, Kenya's premium car mart.">
      <section className="page-head container-x">
        <span className="eyebrow">About us</span>
        <h1>Making car buying something to look forward to</h1>
        <p>
          CarMania started with a simple idea: buying a car in Kenya should be transparent, quick and
          even enjoyable. Today we&apos;re one of Nairobi&apos;s most trusted dealerships for quality
          pre-owned and imported vehicles.
        </p>
      </section>

      <section className="container-x">
        <dl className="stat-band">
          {STATS.map((s) => (
            <div key={s.label}>
              <dt>{s.value}</dt>
              <dd>{s.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x section">
        <div className="section__head">
          <div>
            <span className="eyebrow">What we stand for</span>
            <h2>Our values</h2>
          </div>
        </div>
        <div className="features">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="feature">
              <span className="feature__icon"><Icon /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x">
        <div className="cta">
          <div>
            <h2>Come and see us</h2>
            <p>Visit our showroom on Mombasa Road, or browse the full inventory online.</p>
          </div>
          <div className="cta__actions">
            <Link href="/cars" className="btn-x btn-primary-x">Browse cars</Link>
            <Link href="/Contact" className="btn-x cta__ghost">Get directions</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
