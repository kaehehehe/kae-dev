import { Flex, Heading, Text } from "@yamada-ui/react";
import { notFound } from "next/navigation";
import { NotionAPI } from "notion-client";

import NotionContent from "@/app/posts/[slug]/NotionContent";
import type { Post } from "@/app/types/post";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  const base = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await fetch(`${base}/api/posts/${slug}`, {
    next: { tags: ["posts", `post:${slug}`] },
  });

  if (response.status === 404) return notFound();

  const post = (await response.json()) as Post;

  const notion = new NotionAPI();
  const recordMap = await notion.getPage(post.pageId);

  return (
    <>
      <Flex direction="column" maxWidth="700px" margin="0 auto">
        <Heading as="h1" fontSize="4xl" textAlign="center">
          {post.title}
        </Heading>
        <Text>{post.createdAt}</Text>
      </Flex>

      <NotionContent recordMap={recordMap} />
    </>
  );
}
