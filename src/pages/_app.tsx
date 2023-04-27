import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ProductContextProvider } from "../context/ProductContextProvider";
import { InventoryContextProvider } from "../context/InventoryContextProveider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <InventoryContextProvider>
      <ProductContextProvider>
        <Component {...pageProps} />
      </ProductContextProvider>
    </InventoryContextProvider>
  );
}
