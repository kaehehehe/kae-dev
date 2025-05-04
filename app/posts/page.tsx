import { Container } from "@yamada-ui/react";
import styles from "./styles.module.css";
import { PostsList } from "./components/PostsList";

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
