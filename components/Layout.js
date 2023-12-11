import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import Script from 'next/script';

function Layout({ title, description, children}) {

  return (
    <div>
      <Head>
        <title>{title ? `${title}` : 'Dragon Organics'}</title>
        {description && <meta name="description" content={description}></meta>}
        <Script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </Script>
      </Head>
      <Navbar />
        <div>
            { children }
        </div>
      <Footer />
    </div>
  );
}

export default Layout;