import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import {Helmet} from "react-helmet";
// import Head_SEO from '@/components/Next_SEO_Head';

export default function Layout({ children, title, description, language="de" }) {
  return (
    <div className="site-wrapper">
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width" />
        <title>{title || 'NextJS'}</title>
        {/* <link rel="icon" href="/vercel.svg" /> */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon"></link>
        <meta name="description"
              content={description}/>
        <html lang={language}></html>
      </Helmet>
      <Header />
      <main className="site-main inner-width" lang={language}>
        {title && <h1>{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
}
