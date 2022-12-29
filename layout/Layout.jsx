import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

function Layout({ children, title = process.env.APP_NAME }) {
  return (
    <div>
      <Script
        strategy={'afterInteractive'}
        src={`https://www.googletagmanager.com/gtag/js?id=G-MQMPTMDET6`}
      />
      <Script
        id={'google-analytics'}
        strategy={'afterInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', ${process.env.GOOGLE_ANALYISTICS});`,
        }}
      />
      <Script
        data-ad-client={process.env.GOOGLE_ADSENSE_PUB}
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'
      ></Script>
      <Head>
        <link rel='shortcut icon' href={'/static/favicon.svg'} />
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
        <meta name='author' content='Author Name' />
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
}

export default Layout;
