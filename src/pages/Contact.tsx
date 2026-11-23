import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import EnquiryForm from "../components/Car/EnquiryForm";
import { SITE } from "../lib/format";

const CHANNELS = [
  { icon: FiPhone, label: "Call sales", value: SITE.phone, href: SITE.phoneHref },
  { icon: FaWhatsapp, label: "WhatsApp", value: "Chat with us", href: `https://wa.me/${SITE.whatsapp}` },
  { icon: FiMail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: FiMapPin, label: "Showroom", value: SITE.address },
  { icon: FiClock, label: "Opening hours", value: SITE.hours },
];

export default function Contact() {
  return (
    <Layout title="Contact us" description="Get in touch with the CarMania sales team.">
      <section className="page-head container-x">
        <span className="eyebrow">Contact</span>
        <h1>Let&apos;s find your next car</h1>
        <p>Questions, test drives or financing: our team usually replies within the hour during opening times.</p>
      </section>

      <section className="container-x split">
        <div className="panel">
          <h2>Send us a message</h2>
          <EnquiryForm
            fields={[
              { name: "name", label: "Full name", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "07xx xxx xxx" },
              { name: "email", label: "Email", type: "email", full: true },
              {
                name: "topic",
                label: "What can we help with?",
                type: "select",
                full: true,
                options: ["Buying a car", "Book a test drive", "Financing", "Trade-in", "Direct import", "Something else"],
              },
              { name: "message", label: "Message", type: "textarea", required: true },
            ]}
            submitLabel="Send message"
          />
        </div>

        <div className="contact-list">
          {CHANNELS.map(({ icon: Icon, label, value, href }) => {
            const inner = (
              <>
                <span className="feature__icon"><Icon /></span>
                <div>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              </>
            );
            return href ? (
              <a key={label} href={href} className="contact-item" target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
                {inner}
              </a>
            ) : (
              <div key={label} className="contact-item">{inner}</div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}
