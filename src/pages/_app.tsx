import { AppType } from 'next/dist/shared/lib/utils';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { AuthProvider } from '../../context/authProvider';
import Router, { useRouter } from 'next/router';
import { ReactElement } from 'react';
import type { AppProps } from 'next/app';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import '../styles/globals.css';
import RightSideBar from '../components/sidebar/rightsidebar';
import LeftSIdeBar from '../components/sidebar/leftSIdeBar';
import Layout from '../../layout/Layout';
const MyApp: AppType = ({ Component, pageProps }: any) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.events.on('routeChangeStart', (url) => {
      NProgress.start();
      setLoading(true);
    });
    router.events.on('routeChangeComplete', (url) => {
      NProgress.done();
      setLoading(false);
    });
  }, [router.events]);
  useEffect(() => {
    const dome = localStorage.setItem(
      'uf-user-first-page',
      JSON.stringify(Router.asPath)
    );
  }, []);
  if (Component.getLayout) {
    return Component.getLayout(
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    );
  }
  return (
    <AuthProvider>
      <div className=' md:flex  '>
        <LeftSIdeBar />
        <div className='min-w-[480px] md:justify-center md:flex'>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>

        <RightSideBar />
      </div>
    </AuthProvider>
  );
};

export default MyApp;
