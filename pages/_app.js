import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import "react-datetime/css/react-datetime.css";
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'react-quill/dist/quill.snow.css';
import { StoreProvider } from '@/utils/Store';
import PageTransitions from '../components/PageTransitions';
import { useRouter } from 'next/router';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import { SessionProvider, useSession } from 'next-auth/react';
import Image from "next/image";

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <SessionProvider session={session}>
      <StoreProvider>
        <PageTransitions route={router.asPath}>
          <PayPalScriptProvider deferLoading={true}>
            {Component.auth ? (
              <Auth 
                adminOnly={Component.auth.adminOnly} 
                manufacturerOnly={Component.auth.manufacturerOnly}
                vendorOnly={Component.auth.vendorOnly}
              >
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </PayPalScriptProvider>
        </PageTransitions>
      </StoreProvider>
    </SessionProvider>
  );
}

function Auth({ children, adminOnly, manufacturerOnly, vendorOnly }) {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    }
  });
  if ( status === 'loading') {
    return <div className="loading-container"><Image src="/images/Loading.gif" width={300} height={300} alt="Loading image"/></div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }
  if (manufacturerOnly && !session.user.isManufacturer) {
    router.push('/unauthorized?message=manufacturer login required');
  }
  if (vendorOnly && !session.user.isVendor) {
    router.push('/unauthorized?message=vendor login required');
  }
  return children;
}
