import { Flex, Text } from "@yamada-ui/react";
import Link from "next/link";

import { GithubIconButton } from "@/app/shared/components/GithubIconButton";

export function Navbar() {
  return (
    <nav>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        width="90vw"
        maxWidth={1200}
        margin="20px auto 0"
      >
        <Flex justifyContent="space-around" width={180}>
          <Link href="/" passHref>
            <Text>Home</Text>
          </Link>
          <Link href="/works" passHref>
            <Text>Works</Text>
          </Link>
          <Link href="/posts">
            <Text>Posts</Text>
          </Link>
        </Flex>

        <Flex justifyContent="space-between" width={90}>
          <GithubIconButton />
        </Flex>
      </Flex>
    </nav>
  );
}
