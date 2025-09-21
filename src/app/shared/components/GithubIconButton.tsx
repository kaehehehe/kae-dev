import { IconButton, Link } from "@yamada-ui/react";
import { FaGithub } from "react-icons/fa";

export function GithubIconButton() {
  return (
    <Link href={"https://github.com/kaehehehe"} external>
      <IconButton
        icon={<FaGithub />}
        colorScheme="primary"
        variant="primary"
        fontSize="2xl"
        color="black"
      />
    </Link>
  );
}
