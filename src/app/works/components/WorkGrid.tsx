"use server";

import { Container, Flex, Grid } from "@yamada-ui/react";

import { WorkCard } from "@/app/works/components/WorkCard";

import styles from "../styles.module.css";

export type Work = {
  title: string;
  link: {
    demo: string;
    code: string;
  };
};

export async function WorkGrid() {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await fetch(`${base}/api/works`, {
    next: { revalidate: 60 },
  });

  const workList: Work[] = await response.json();

  return (
    <Container className={styles.container}>
      <Flex alignItems="center">
        <Grid className={styles.grid}>
          {workList.map(({ title, link }, index) => (
            <WorkCard key={index} work={{ title, link }} index={index} />
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}
