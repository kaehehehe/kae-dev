"use client";

import { Button, Wrap } from "@yamada-ui/react";

import { Category } from "./PostsList";
import { getTagColor } from "../helpers/getTagColor";

type CategoryButtonsProps = {
  // eslint-disable-next-line no-unused-vars
  selectCategory: (category: Category) => void;
};

const postCategories: Category[] = [
  "All",
  "React",
  "Type Script",
  "Design Pattern",
  "Design System",
  "CSS",
  "Essay",
  "Project",
  "Performance",
];

export function CategoryButtons({ selectCategory }: CategoryButtonsProps) {
  return (
    <Wrap gap={2}>
      {postCategories.map((category) => (
        <Button
          key={category}
          variant="solid"
          colorScheme={getTagColor(category)}
          onClick={() => selectCategory(category)}
        >
          {category}
        </Button>
      ))}
    </Wrap>
  );
}
