"use client";

import { useState } from "react";
import { CategoryButtons } from "./CategoryButtons";
import { FilteredPosts } from "./FilteredPosts";
import { Separator } from "@yamada-ui/react";

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

export const getTagColor = (name: Category) => {
  switch (name) {
    case "All":
      return "red";
    case "React":
      return "sky";
    case "Type Script":
      return "blue";
    case "Design Pattern":
      return "rose";
    case "Design System":
      return "pink";
    case "CSS":
      return "amber";
    case "Essay":
      return "emerald";
    case "Performance":
      return "teal";
    case "Project":
      return "orange";
  }
};

export function PostsList({ posts, locale }: { posts: any[]; locale: string }) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const selectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((post: any) =>
          post.properties.tags.multi_select.some(
            (tag: any) => tag.name === selectedCategory
          )
        );

  return (
    <>
      <CategoryButtons selectCategory={selectCategory} />
      <Separator />
      <FilteredPosts filteredPosts={filteredPosts} locale={locale} />
    </>
  );
}
