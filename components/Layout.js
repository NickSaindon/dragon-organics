import React from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';

function Layout({ title, description, children}) {

  return (
    <div>
      <Head>
        <title>{title ? `${title}` : 'Dragon Organics'}</title>
        {description && <meta name="description" content={description}></meta>}
        <script 
          strategy="afterInteractive" 
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
        <script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
  
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');
          `}
        </script>
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