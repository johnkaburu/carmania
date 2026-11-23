import Image from "next/image";
import Link from "next/link";
import type { GetStaticPaths, GetStaticProps } from "next";
import {
  FiCalendar,
  FiCheck,
  FiChevronRight,
  FiDroplet,
  FiPhone,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiHash,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { TbEngine, TbGasStation, TbGauge, TbManualGearbox, TbCar } from "react-icons/tb";
import Layout from "../../components/Layout/Layout";
import CarCard from "../../components/HomePage/CarCard";
import FinanceCalculator, { DEFAULT_RATE } from "../../components/Car/FinanceCalculator";
import EnquiryForm from "../../components/Car/EnquiryForm";
import {
  Inventory,
  describeVehicle,
  featuresFor,
  getSimilar,
  getVehicleBySlug,
} from "../../constants/inventory";
import { unsplashLoader } from "../../lib/images";
import { SITE, formatEngine, formatKes, formatKm, monthlyPayment } from "../../lib/format";

interface Props {
  slug: string;
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: Inventory.map((v) => ({ params: { slug: v.slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
  const slug = String(params?.slug);
  if (!getVehicleBySlug(slug)) return { notFound: true };
  return { props: { slug } };
};

export default function CarPage({ slug }: Props) {
  const car = getVehicleBySlug(slug)!;
  const title = `${car.year} ${car.make} ${car.model}`;
  const similar = getSimilar(car);
  const fromMonthly = monthlyPayment(car.price * 0.7, DEFAULT_RATE, 48);
  const waText = encodeURIComponent(`Hi CarMania, I'm interested in the ${title} (${car.stockNo}). Is it still available?`);

  const specs = [
    { icon: FiCalendar, label: "Year", value: car.year },
    { icon: TbGauge, label: "Mileage", value: formatKm(car.mileage) },
    { icon: TbEngine, label: "Engine", value: formatEngine(car.engine) },
    { icon: TbGasStation, label: "Fuel", value: car.fuel },
    { icon: TbManualGearbox, label: "Transmission", value: car.transmission },
    { icon: TbCar, label: "Body", value: car.body },
    { icon: FiDroplet, label: "Colour", value: car.color },
    { icon: FiHash, label: "Stock no.", value: car.stockNo },
  ];

  return (
    <Layout title={title} description={`${title} for sale at CarMania, ${formatKes(car.price)}. ${formatKm(car.mileage)}, ${car.fuel}, ${car.transmission}.`}>
      <div className="container-x">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <FiChevronRight />
          <Link href="/cars">Inventory</Link>
          <FiChevronRight />
          <Link href={{ pathname: "/cars", query: { make: car.make } }}>{car.make}</Link>
          <FiChevronRight />
          <span aria-current="page">{car.model}</span>
        </nav>

        <div className="vdp">
          {/* Left column */}
          <div className="vdp__main">
            <div className="vdp__gallery">
              <Image
                src={car.image}
                loader={unsplashLoader}
                alt={`${title} in ${car.color}`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <span className="car-card__badge">{car.body}</span>
            </div>

            <section className="vdp__section">
              <h2>Key specs</h2>
              <dl className="spec-grid">
                {specs.map(({ icon: Icon, label, value }) => (
                  <div key={label}>
                    <Icon />
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>

            <section className="vdp__section">
              <h2>Overview</h2>
              {describeVehicle(car).map((p, i) => (
                <p key={i} className="prose">{p}</p>
              ))}
            </section>

            <section className="vdp__section">
              <h2>Features</h2>
              <ul className="feature-list">
                {featuresFor(car).map((f) => (
                  <li key={f}><FiCheck /> {f}</li>
                ))}
              </ul>
            </section>

            <section className="vdp__section">
              <h2>Finance calculator</h2>
              <FinanceCalculator price={car.price} />
            </section>

            <section className="vdp__section" id="enquire">
              <h2>Enquire about this car</h2>
              <EnquiryForm
                fields={[
                  { name: "name", label: "Full name", required: true },
                  { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "07xx xxx xxx" },
                  { name: "email", label: "Email", type: "email" },
                  {
                    name: "interest",
                    label: "I'd like to",
                    type: "select",
                    options: ["Book a test drive", "Ask a question", "Discuss financing", "Trade in my car", "Make an offer"],
                    defaultValue: "Book a test drive",
                  },
                  {
                    name: "message",
                    label: "Message",
                    type: "textarea",
                    defaultValue: `I'm interested in the ${title} (${car.stockNo}).`,
                  },
                ]}
              />
            </section>
          </div>

          {/* Right column */}
          <aside className="vdp__side">
            <div className="buy-box">
              <p className="buy-box__meta">{car.year} · {formatKm(car.mileage)} · {car.stockNo}</p>
              <h1>{car.make} {car.model}</h1>
              <p className="buy-box__price">{formatKes(car.price)}</p>
              <p className="buy-box__monthly">
                or from <b>{formatKes(fromMonthly)}/mo</b> with 30% deposit
              </p>

              <div className="buy-box__actions">
                <a href="#enquire" className="btn-x btn-primary-x">Book a test drive</a>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=${waText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-x btn-whatsapp"
                >
                  <FaWhatsapp /> WhatsApp us
                </a>
                <a href={SITE.phoneHref} className="btn-x btn-ghost-x">
                  <FiPhone /> {SITE.phone}
                </a>
              </div>

              <ul className="buy-box__perks">
                <li><FiShield /> 150-point inspection passed</li>
                <li><FiTruck /> Nationwide delivery available</li>
                <li><FiRefreshCw /> <Link href="/TradeIn">Trade in your current car</Link></li>
              </ul>
            </div>
          </aside>
        </div>

        {similar.length > 0 && (
          <section className="section">
            <div className="section__head">
              <div>
                <span className="eyebrow">You may also like</span>
                <h2>Similar cars</h2>
              </div>
              <Link href={{ pathname: "/cars", query: { body: car.body } }} className="link-arrow">
                More {car.body === "SUV" ? "SUVs" : `${car.body.toLowerCase()}s`} <FiChevronRight />
              </Link>
            </div>
            <div className="car-grid">
              {similar.map((v) => (
                <CarCard key={v.id} car={v} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobile sticky action bar */}
      <div className="vdp-bar">
        <div>
          <span>{car.make} {car.model}</span>
          <strong>{formatKes(car.price)}</strong>
        </div>
        <a href="#enquire" className="btn-x btn-primary-x">Enquire</a>
      </div>
    </Layout>
  );
}
