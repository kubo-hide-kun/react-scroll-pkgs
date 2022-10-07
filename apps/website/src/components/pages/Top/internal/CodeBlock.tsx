import Prism from 'prismjs';
import React, { useEffect } from 'react';

import 'prismjs/components/prism-typescript';
import 'prism-themes/themes/prism-vsc-dark-plus.min.css';

export const CodeBlock = () => {
  // Init
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  // Usage
  return (
    <pre>
      <code className="language-typescript">
        {`// Language: typescript
// Path: apps/website/src/components/pages/Top/internal/CodeBlock.tsx
// Compare this snippet from apps/website/src/pages/_document.tsx:
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
  DocumentInitialProps,
} from 'next/document';
`}
      </code>
    </pre>
  );
};
