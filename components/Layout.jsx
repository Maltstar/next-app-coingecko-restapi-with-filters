import Head from 'next/head';
import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({ children, title }) {
  return (
    <div className="site-wrapper">
      <Head>
        <title>{title || 'NextJS'}</title>
        <link rel="icon" href="/vercel.svg" />
      </Head>
      <Header />
      <main className="site-main inner-width">
        {title && <h1>{title}</h1>}
        {children}
      </main>
      <Footer />
    </div>
  );
}
