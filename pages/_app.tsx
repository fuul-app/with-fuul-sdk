import "../styles/globals.css";

import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <>
      <Head>
        <link
          rel="icon"
          type="image/svg"
          sizes="32x32"
          href="/fuul_logo_color.svg"
        />
        <link
          rel="icon"
          type="image/svg"
          sizes="16x16"
          href="/fuul_logo_color.svg"
        />
        <title>Fuul SDK</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
