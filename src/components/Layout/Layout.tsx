import React, { ReactNode } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  title?: string;
  description?: string;
  children: ReactNode;
}

const Layout = ({ title, description, children }: LayoutProps) => (
  <>
    <Head>
      <title>{title ? `${title} | CarMania` : "CarMania — Quality cars, honest prices"}</title>
      <meta
        name="description"
        content={description ?? "Browse quality new and pre-owned cars in Kenya."}
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Navbar />
    <main>{children}</main>
    <Footer />
  </>
);

export default Layout;
