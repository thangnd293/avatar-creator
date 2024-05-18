import { Inter } from "next/font/google";
import type { Metadata } from "next";

import StyledComponentsRegistry from "@/lib/styledComponent";
import { RIVE_WASM_URL } from "@/constants/rive";

import GlobalStyles from "@/components/GlobalStyles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Avatar creator",
  description: "Create your own avatar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href={RIVE_WASM_URL}
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
