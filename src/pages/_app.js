import "../styles/global.css";
require("dotenv").config();

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
