import { Container, Flex, UIProvider } from "@yamada-ui/react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./reset.css";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
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
