import "bootstrap/dist/css/bootstrap.min.css";
import "../style/app.scss";

import React from "react";
import { SSRProvider } from "@react-aria/ssr";
import SiteNavbar from "../components/SiteNavbar";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }) {
  return (
    <SSRProvider>
      <SiteNavbar />
      <Component {...pageProps} />
    </SSRProvider>
  );
}
