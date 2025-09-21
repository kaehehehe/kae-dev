export type Post = {
  pageId: string;
  slug: string;
  title: string;
  description: string;
  createdAt: string;
  tags: string[];
  coverUrl?: string;
};
