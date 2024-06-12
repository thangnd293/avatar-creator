import { Inter } from "next/font/google";
import type { Metadata } from "next";

import { RIVE_FILE, RIVE_WASM_URL } from "@/constants/rive";

import GlobalStyles from "@/components/GlobalStyles";
import StyledComponentsRegistry from "@/components/StyledComponentsRegistry";
import { getInitialBackground } from "@/helpers";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "Avatar creator",
  description: "Create your own avatar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialBackground = getInitialBackground();

  return (
    <html
      lang="en"
      style={{
        "--background-color": initialBackground,
      }}
    >
      <head>
        <link
          rel="preload"
          href={RIVE_WASM_URL}
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={RIVE_FILE}
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        <StyledComponentsRegistry>
          {children}
          <GlobalStyles />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
