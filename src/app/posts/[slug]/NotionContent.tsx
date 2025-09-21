"use client";

import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import { NotionRenderer } from "react-notion-x";

import "react-notion-x/src/styles.css";
import "katex/dist/katex.min.css";
import "prismjs/themes/prism.css";

const Code = dynamic(
  () => import("react-notion-x/build/third-party/code").then((m) => m.Code),
  { ssr: false },
);
const Collection = dynamic(
  () =>
    import("react-notion-x/build/third-party/collection").then(
      (m) => m.Collection,
    ),
  { ssr: false },
);
const Equation = dynamic(
  () =>
    import("react-notion-x/build/third-party/equation").then((m) => m.Equation),
  { ssr: false },
);
const Pdf = dynamic(
  () => import("react-notion-x/build/third-party/pdf").then((m) => m.Pdf),
  { ssr: false },
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false },
);

type Props = { recordMap: any };

export default function NotionContent({ recordMap }: Props) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const PrismMod = await import("prismjs");
      (globalThis as any).Prism = (PrismMod as any).default ?? PrismMod;

      await Promise.all([
        import("prismjs/components/prism-bash"),
        import("prismjs/components/prism-json"),
        import("prismjs/components/prism-markup"),
        import("prismjs/components/prism-javascript"),
        import("prismjs/components/prism-typescript"),
        import("prismjs/components/prism-jsx"),
        import("prismjs/components/prism-tsx"),
      ]);

      if (mounted) setReady(true);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!ready) return <></>;

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={false}
      disableHeader
      darkMode={false}
      components={{ Code, Collection, Equation, Pdf, Modal }}
    />
  );
}
