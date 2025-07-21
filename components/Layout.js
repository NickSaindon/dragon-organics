import React from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Script from "next/script";
import { useRouter } from "next/router";

function Layout({ title, description, children }) {
  const router = useRouter();
  const baseUrl = "https://dragon-organics.com";
  const fullUrl = `${baseUrl}${router.asPath}`;

  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title ? `${title}` : "Dragon Organics"}</title>
        {description && <meta name="description" content={description} />}
        <link rel="canonical" href={fullUrl} />
        <link rel="icon" href="/favicon.ico" />

        {/* Robots: allow indexing */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph for Facebook/LinkedIn */}
        <meta property="og:title" content={title || "Dragon Organics"} />
        <meta
          property="og:description"
          content={
            description ||
            "Premium Kratom products delivered discreetly and quickly across the U.S."
          }
        />
        <meta property="og:url" content={fullUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`${baseUrl}/images/og-image.jpg`} />

        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <Script
          id="gtag-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
          page_path: window.location.pathname,
        });
      `,
          }}
        />

        {/* Organization structured data */}
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Dragon Organics",
              url: "https://dragon-organics.com",
              logo: "https://dragon-organics.com/images/do-logo-title-under.png",
              sameAs: [
                "https://www.instagram.com/dragonorganics?igshid=NzZlODBkYWE4Ng",
                "https://www.facebook.com/Dragon-Organics-61552383274313",
              ],
              description:
                "Dragon Organics offers premium Thai Kratom products shipped quickly across the U.S.",
              contactPoint: {
                "@type": "ContactPoint",
                email: "dragonorganics.tm@gmail.com",
                contactType: "Customer Service",
                areaServed: "US",
                availableLanguage: "en",
              },
            }),
          }}
        />

        {/* WebSite structured data */}
        <Script
          type="application/ld+json"
          id="website-ld-json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Dragon Organics",
              url: "https://dragon-organics.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://dragon-organics.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
}

export default Layout;
