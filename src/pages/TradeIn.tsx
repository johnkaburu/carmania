import { FiClipboard, FiDollarSign, FiKey } from "react-icons/fi";
import Layout from "../components/Layout/Layout";
import EnquiryForm from "../components/Car/EnquiryForm";
import { Makes } from "../constants/inventory";

const STEPS = [
  { icon: FiClipboard, title: "Tell us about your car", text: "Share the make, model, mileage and condition. It takes about two minutes." },
  { icon: FiDollarSign, title: "Get your valuation", text: "We send a no-obligation offer based on live market data within 24 hours." },
  { icon: FiKey, title: "Swap and drive", text: "Bring it in for a quick check, and put the value straight towards your next car." },
];

const years = Array.from({ length: 25 }, (_, i) => String(new Date().getFullYear() - i));

export default function TradeIn() {
  return (
    <Layout title="Trade in your car" description="Get a free, no-obligation valuation for your car.">
      <section className="page-head container-x">
        <span className="eyebrow">Trade in</span>
        <h1>What&apos;s your car worth?</h1>
        <p>Get a free, no-obligation valuation and put it towards any car in our inventory.</p>
      </section>

      <section className="container-x">
        <div className="steps">
          {STEPS.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className="feature">
              <span className="feature__icon"><Icon /></span>
              <p className="steps__n">Step {i + 1}</p>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-x section">
        <div className="panel panel--narrow">
          <h2>Your vehicle</h2>
          <EnquiryForm
            fields={[
              { name: "make", label: "Make", type: "select", required: true, options: [...Makes, "Other"] },
              { name: "model", label: "Model", required: true, placeholder: "e.g. Prado TX" },
              { name: "year", label: "Year", type: "select", required: true, options: years },
              { name: "mileage", label: "Mileage (km)", type: "number", required: true, placeholder: "e.g. 85000" },
              {
                name: "condition",
                label: "Condition",
                type: "select",
                required: true,
                options: ["Excellent", "Good", "Fair", "Needs work"],
              },
              { name: "reg", label: "Registration", placeholder: "e.g. KDA 123A" },
              { name: "name", label: "Your name", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "07xx xxx xxx" },
              { name: "notes", label: "Anything else we should know?", type: "textarea" },
            ]}
            submitLabel="Get my valuation"
            successTitle="Valuation request received"
            successText="We'll send your no-obligation offer within 24 hours."
          />
        </div>
      </section>
    </Layout>
  );
}
