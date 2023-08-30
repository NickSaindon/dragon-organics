import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.scss';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { StoreProvider } from '@/utils/Store';
import PageTransitions from '../components/PageTransitions';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  }, []);

  return (
    <StoreProvider>
      <PageTransitions route={router.asPath}>
        <Component {...pageProps} />
      </PageTransitions>
    </StoreProvider>
  );
}
