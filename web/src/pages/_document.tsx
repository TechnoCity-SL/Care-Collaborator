import { Html, Head, Main, NextScript } from "next/document";
import { fontVariables } from "@/lib/fonts";

export default function Document() {
  return (
    <Html lang="en" className={fontVariables}>
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
