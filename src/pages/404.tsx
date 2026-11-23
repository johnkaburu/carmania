import Link from "next/link";
import Layout from "../components/Layout/Layout";

export default function NotFound() {
  return (
    <Layout title="Page not found">
      <section className="container-x message-page">
        <span className="eyebrow">404</span>
        <h1>This road doesn&apos;t go anywhere</h1>
        <p>The page you&apos;re looking for may have moved, or the car may already have been sold.</p>
        <div className="cta__actions">
          <Link href="/cars" className="btn-x btn-primary-x">Browse cars</Link>
          <Link href="/" className="btn-x btn-ghost-x">Go home</Link>
        </div>
      </section>
    </Layout>
  );
}
