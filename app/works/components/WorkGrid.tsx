import { Container, Flex, Grid, GridItem, Link, Text } from "@yamada-ui/react";
import styles from "../styles.module.css";

type Work = {
  title: string;
  link: {
    demo: string;
    code: string;
  };
};

export async function WorkGrid() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await fetch(`${baseURL}/api/works`);
  const workList: Work[] = await response.json();

  return (
    <Container className={styles.container}>
      <Flex alignItems="center">
        <Grid className={styles.grid}>
          {workList.map(({ title, link }, index) => (
            <GridItem key={title} className={styles["grid-item"]}>
              <iframe
                src={link.demo}
                className={styles.thumbnail}
                loading={index <= 6 ? "eager" : "lazy"}
              />
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
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}
