import { Container } from "@yamada-ui/react";
import { fetchHeaders } from "../../helpers/fetchHeaders";
import styles from "./styles.module.css";
import { PostsList } from "./components/PostsList";

export default async function PostsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { host, protocol } = await fetchHeaders();
  const response = await fetch(`${protocol}://${host}/api/posts`);
  const posts = await response.json();
  const locale = (await params).locale;

  return (
    <Container className={styles.container}>
      <PostsList posts={posts.results} locale={locale} />
    </Container>
  );
}
