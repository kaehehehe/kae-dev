import { Flex, Heading, Tag, Text, Wrap } from "@yamada-ui/react";
import Link from "next/link";

import styles from "../styles.module.css";
import { Category } from "./PostsList";
import { getTagColor } from "../helpers/getTagColor";

export function FilteredPosts({ filteredPosts }: { filteredPosts: any[] }) {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL;

  return (
    <>
      {filteredPosts.map((post: any) => {
        const { title, description, created, slug, tags } = post.properties;
        const categories: { id: string; name: Category; color: string }[] =
          tags.multi_select;

        return (
          <Link
            key={post.id}
            href={`${baseURL}/posts/${slug.rich_text[0]?.plain_text}`}
          >
            <article className={styles.post}>
              <Flex direction="column">
                <Flex alignItems="center" className={styles.title}>
                  <Text fontSize="2xl" className={styles.emoji}>
                    {post?.icon?.emoji}
                  </Text>
                  <Heading as="h4" fontSize="2xl">
                    {title.title[0].plain_text}
                  </Heading>
                </Flex>

                <Text fontSize="lg" className={styles.description}>
                  {description.rich_text[0].plain_text}
                </Text>
                <Flex alignItems="center">
                  <Text>{created.date.start}</Text>

                  <Wrap marginLeft={3} gap={2}>
                    {categories.map(({ id, name }) => {
                      const color = getTagColor(name);
                      return (
                        <Tag key={id} variant="solid" colorScheme={color}>
                          {name}
                        </Tag>
                      );
                    })}
                  </Wrap>
                </Flex>
              </Flex>
            </article>
          </Link>
        );
      })}
    </>
  );
}
