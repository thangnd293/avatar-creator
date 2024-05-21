import { Inter } from "next/font/google";
import type { Metadata } from "next";

import StyledComponentsRegistry from "@/lib/styledComponent";
import { RIVE_FILE, RIVE_WASM_URL } from "@/constants/rive";

import GlobalStyles from "@/components/GlobalStyles";
import { cookies } from "next/headers";

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
  const initialBackground = cookies().get("background")?.value;

  const style: Record<string, string | undefined> = {
    "--background-color": initialBackground,
  };
  return (
    <html lang="en" style={style}>
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
