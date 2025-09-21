import { ReactNode } from "react";

import { Container, Flex, UIProvider } from "@yamada-ui/react";

import { Footer, Navbar } from "@/app/shared/components";

import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Hi, I am Kae",
  description: "한국에서 개발자로 일하는 일본인의 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ko">
      <title>Hi, I&apos;m Kae.</title>
      <body>
        <UIProvider>
          <Navbar />
          <Flex direction="column" justify="center" alignItems="center">
            <Container height="fit-content" minHeight="90vh">
              {children}
            </Container>
            <Footer />
          </Flex>
        </UIProvider>
      </body>
    </html>
  );
}
