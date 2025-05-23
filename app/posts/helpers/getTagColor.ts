import { Category } from "../components/PostsList";

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
