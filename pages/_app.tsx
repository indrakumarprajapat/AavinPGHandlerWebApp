import "../styles/globals.css";
import type { AppProps } from "next/app";
import os from "os";

export default function App({ Component, pageProps }: AppProps) {
  console.log("Running on server:", os.hostname());

  return <Component {...pageProps} />;
}
