import Link from "next/link";
import Layout from "./Layout";

interface ComingSoonProps {
  title: string;
  text: string;
}

const ComingSoon = ({ title, text }: ComingSoonProps) => (
  <Layout title={title}>
    <section className="container-x message-page">
      <span className="eyebrow">Coming soon</span>
      <h1>{title}</h1>
      <p>{text}</p>
      <div className="cta__actions">
        <Link href="/cars" className="btn-x btn-primary-x">Browse cars</Link>
        <Link href="/Contact" className="btn-x btn-ghost-x">Contact us</Link>
      </div>
    </section>
  </Layout>
);

export default ComingSoon;
