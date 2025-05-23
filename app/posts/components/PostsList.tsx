"use client";

import { useState } from "react";

import { Separator } from "@yamada-ui/react";

import { CategoryButtons } from "./CategoryButtons";
import { FilteredPosts } from "./FilteredPosts";

export type Category =
  | "All"
  | "React"
  | "Type Script"
  | "Design Pattern"
  | "Design System"
  | "CSS"
  | "Essay"
  | "Project"
  | "Performance";

export function PostsList({ posts }: { posts: any[] }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post: any) =>
          post.properties.tags.multi_select.some(
            (tag: any) => tag.name === selectedCategory,
          ),
        );

  return (
    <>
      <CategoryButtons selectCategory={selectCategory} />
      <Separator />
      <FilteredPosts filteredPosts={filteredPosts} />
    </>
  );
}
