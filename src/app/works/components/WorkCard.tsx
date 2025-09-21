import { Flex, GridItem, Link, Text } from "@yamada-ui/react";

import { Work } from "@/app/works/components/WorkGrid";

import styles from "../styles.module.css";

type Props = {
  work: Pick<Work, "title" | "link">;
  index: number;
};

export function WorkCard({ work, index }: Props) {
  const { title, link } = work;
  const loading = index <= 6 ? "eager" : "lazy";

  return (
    <GridItem className={styles["grid-item"]}>
      <iframe src={link.demo} className={styles.thumbnail} loading={loading} />
      <Flex
        direction="column"
        justify="center"
        align="center"
        className={styles["thumbnail-card"]}
      >
        <Text className={styles.title}>{title}</Text>
        <Flex>
          <Link href={link.demo} external className={styles.demo}>
            Demo
          </Link>
          <Link href={link.code} external>
            Code
          </Link>
        </Flex>
      </Flex>
    </GridItem>
  );
}
