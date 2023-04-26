import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductContextProvider } from "../context/ProductContextProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ProductContextProvider>
      <Component {...pageProps} />
    </ProductContextProvider>
  );
}
