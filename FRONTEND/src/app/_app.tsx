import { AppProps } from "next/app";
import "@/app/styles/globals.css";
import { Providers } from "@/app/providers";
import type { NextPage } from "next";

// Extend NextPage to include `getLayout`
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};

// Extend AppProps to include the custom `NextPageWithLayout` type
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the page's `getLayout` or default to rendering the page directly
  const getLayout = Component.getLayout ?? ((page) => page);

  return <Providers>{getLayout(<Component {...pageProps} />)}</Providers>;
}

export default MyApp;
