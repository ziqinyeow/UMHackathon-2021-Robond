import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Banner from "@/components/Banner";

interface Props {
  meta: Metadata;
  children: React.ReactNode;
}

type Metadata = {
  title: string;
  description: string;
  image: string;
};

const BasicLayout = ({ meta, children }: Props) => {
  const router = useRouter();
  return (
    <div>
      <div>
        <Head>
          <title>{meta.title}</title>
          <meta name="robots" content="follow, index" />
          <meta content={meta.description} name="description" />
          <meta
            property="og:url"
            content={`https://robond.vercel.app${router.asPath}`}
          />
          <link
            rel="canonical"
            href={`https://robond.vercel.app/${router.asPath}`}
          />
          <meta property="og:site_name" content="Bond Prediction Application" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={meta.title} />
          <meta name="twitter:description" content={meta.description} />
          <meta name="twitter:image" content={meta.image} />
        </Head>
      </div>
      <div>
        <Navbar />
        <Banner />
        {children}
        <div className="layout">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
