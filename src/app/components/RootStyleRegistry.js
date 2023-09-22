// located at src/modules/shared/components/root-style-registry/index.tsx in my case

"use client";
import { useState, PropsWithChildren } from "react";
import { useServerInsertedHTML } from "next/navigation";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export const RootStyleRegistry = ({ children }) => {
  const [cache] = useState(() => createCache());

  useServerInsertedHTML(() => {
    return (
      <script
        dangerouslySetInnerHTML={{
          __html: `</script>${extractStyle(cache)}<script>`,
        }}
      />
    );
  });

  return <StyleProvider cache={cache}>{children}</StyleProvider>;
};
