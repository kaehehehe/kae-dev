import { Container } from "@yamada-ui/react";

import { PostsList } from "./components/PostsList";
import styles from "./styles.module.css";

export default async function PostsPage() {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL;
  const response = await fetch(`${baseURL}/api/posts`);
  const posts = await response.json();

  return (
    <Container className={styles.container}>
      <PostsList posts={posts.results} />
    </Container>
  );
}
