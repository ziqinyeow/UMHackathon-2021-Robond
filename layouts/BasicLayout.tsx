import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Props {
  meta: Metadata;
  children: React.ReactNode;
}

type Metadata = {
  type: string;
  title: string;
  description: string;
  image: string;
};

const BasicLayout = ({ meta, children }: Props) => {
  return (
    <div>
      <div>
        <Head>
          <title>{meta.title}</title>
          <meta name="robots" content="follow, index" />
          <meta content={meta.description} name="description" />
          <meta property="og:type" content={meta.type} />
          <meta property="og:site_name" content="Bond Prediction Application" />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
        </Head>
      </div>
      <div>
        <Navbar />
        {children}
        <div className="layout">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default BasicLayout;
