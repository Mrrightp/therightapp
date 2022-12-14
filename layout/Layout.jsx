import React from 'react';
import Head from 'next/head';
import Script from 'next/script';
import Router from 'next/router';

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
        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3516539915963682'
          crossorigin='anonymous'
        ></script>
        <meta name='robots' content='index, follow' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='language' content='English' />
        <meta name='author' content='Mr Right' />
        <meta name='twitter:card' content='summary' key='twcard' />
        <meta
          name='twitter:creator'
          content={'https://twitter.com/unilorinforum'}
          key='twhandle'
        />

        {/* Open Graph */}
        <meta
          property='og:site_name'
          content={'Unilorin Forum'}
          key='ogsitename'
        />

        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
}

export default Layout;
