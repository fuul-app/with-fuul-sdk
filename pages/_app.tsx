import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  connectorsForWallets,
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { Fuul } from "@fuul/sdk";
import { useEffect } from "react";


const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    alchemyProvider({
      // This is Alchemy's default API key.
      // You can get your own at https://dashboard.alchemyapi.io
      apiKey: "4Z3YbDYehgOoyoocdYoOnE54-xW-fp8W",
    }),
    publicProvider(),
  ]
);

const connectors = connectorsForWallets([
  {
    groupName: "Recommended",
    wallets: [
      metaMaskWallet({
        chains,
        projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
      }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

Fuul.init({ 
  apiKey: process.env.NEXT_PUBLIC_FUUL_API_KEY || '', 
  baseApiUrl: process.env.NEXT_PUBLIC_FUUL_API_URL, 
  debug: true 
})

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  useEffect(() => {
    Fuul.sendPageViewEvent()
  });

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
      </Head>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Component {...pageProps} />
        </RainbowKitProvider>
      </WagmiConfig>
    </>
  );
}

export default MyApp;
