import { Container, Flex, Heading, Text } from "@yamada-ui/react";
import Link from "next/link";

import { Post } from "@/app/types/post";

import styles from "./styles.module.css";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function PostsPage() {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await fetch(`${base}/api/posts`, {
    next: { tags: ["posts"] },
  });

  if (!response.ok) throw new Error("Failed to load posts");

  const posts = (await response.json()) as Post[];

  return (
    <Container className={styles.container}>
      {posts.map((post) => {
        const { pageId, slug, title, description, createdAt } = post;

        return (
          <Link href={`/posts/${slug}`} key={pageId}>
            <article className={styles.post}>
              <Flex direction="column">
                <Heading as="h4" fontSize="2xl">
                  {title}
                </Heading>

                <Text fontSize="lg" className={styles.description}>
                  {description}
                </Text>

                <Text>{createdAt}</Text>
              </Flex>
            </article>
          </Link>
        );
      })}
    </Container>
  );
}
