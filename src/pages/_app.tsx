import "bootstrap/dist/css/bootstrap.min.css";
import "../style/app.scss";

import React from "react";
import { SSRProvider } from "@react-aria/ssr";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <Component {...pageProps} />
    </SSRProvider>
  );
}
