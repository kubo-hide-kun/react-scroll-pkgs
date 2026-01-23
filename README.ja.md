# react-scroll-pkgs

<div align="center">

**スクロール連動React UIライブラリ**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

[ライブデモ](https://react-scroll-pkgs.vercel.app/) • [GitHub](https://github.com/kubo-hide-kun/react-scroll-pkgs) • [English](./README.md)

</div>

## 概要

`react-scroll-pkgs` は、スクロール連動UIアニメーションを構築するためのReactフックとコンポーネントを含む**Turborepoモノレポ**です。このプロジェクトは2つのnpmパッケージを提供します：

1. **[use-window-scroll-in-element](./packages/use-window-scroll-in-element)** - 要素内でのウィンドウ位置を追跡する基本フック
2. **[react-scroll-flip-book](./packages/react-scroll-flip-book)** - スクロール連動フリップブックアニメーションコンポーネント

両方のパッケージは一緒に動作するように設計されていますが、独立して使用することもできます。

## パッケージ

### use-window-scroll-in-element

ユーザーがスクロールする際に**ウィンドウの上辺/下辺が対象要素内でどの位置にあるか**を計算するReact Hook。ピクセル値とパーセンテージ値（0-100%）の両方を返します。

**インストール:**
```bash
npm install use-window-scroll-in-element
```

**ドキュメント:** [packages/use-window-scroll-in-element/README.ja.md](./packages/use-window-scroll-in-element/README.ja.md)

**npm:** [use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)

### react-scroll-flip-book

ユーザーがスクロールする際に連番画像フレームをcanvasに描画することで、スクロール連動フリップブックアニメーションを作成するReactコンポーネント。`use-window-scroll-in-element` を基に構築されています。

**インストール:**
```bash
npm install react-scroll-flip-book
```

**ドキュメント:** [packages/react-scroll-flip-book/README.ja.md](./packages/react-scroll-flip-book/README.ja.md)

**npm:** [react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)

## クイックスタート

### フックを使用する

```tsx
import { useRef } from 'react';
import { useWindowScrollInElement } from 'use-window-scroll-in-element';

function MyComponent() {
  const ref = useRef<HTMLDivElement>(null);
  const { position, fraction } = useWindowScrollInElement(ref);
  
  return (
    <div ref={ref} style={{ height: '200vh' }}>
      <p>スクロール進捗: {(fraction.top * 100).toFixed(1)}%</p>
    </div>
  );
}
```

### フリップブックコンポーネントを使用する

```tsx
import { ScrollFlipBook } from 'react-scroll-flip-book';

function App() {
  const frames = Array.from({ length: 60 }, (_, i) => ({
    webp: `/frames/frame-${String(i).padStart(4, '0')}.webp`,
    jpg: `/frames/frame-${String(i).padStart(4, '0')}.jpg`,
  }));

  return (
    <div style={{ height: '200vh' }}>
      <ScrollFlipBook
        defaultSource={{ framePaths: frames }}
        style={{ width: '100%', height: '100vh' }}
      />
    </div>
  );
}
```

## プロジェクト構造

これは**Turborepoモノレポ**で、以下の構造を持ちます：

```
react-scroll-pkgs/
├── apps/
│   └── website/          # デモ/ドキュメントサイト（Next.js）
├── packages/
│   ├── use-window-scroll-in-element/  # 公開パッケージ
│   ├── react-scroll-flip-book/        # 公開パッケージ
│   ├── eslint-config/     # 共有ESLint設定
│   └── tsconfig/          # 共有TypeScript設定
├── .github/workflows/     # CI/CDワークフロー
├── docs/                  # 開発者向けドキュメント
└── scripts/               # ユーティリティスクリプト
```

## 開発

### 前提条件

- Node.js 16+
- npm または yarn

### セットアップ

```bash
# 依存関係をインストール
npm install

# すべてのパッケージをビルド
npm run build

# リントを実行
npm run lint

# 型チェックを実行
npm run typecheck

# デモサイトを起動
npm run website
```

### Turborepoコマンド

- `turbo run build` - すべてのパッケージをビルド（依存関係を考慮）
- `turbo run lint` - すべてのパッケージをリント
- `turbo run lint:fix` - リント問題を自動修正
- `turbo run typecheck` - すべてのパッケージを型チェック

## デモとドキュメント

- **[ライブデモ](https://react-scroll-pkgs.vercel.app/)** - Vercelでホスティングされているインタラクティブな例とビジュアライゼーション
- **[GitHubリポジトリ](https://github.com/kubo-hide-kun/react-scroll-pkgs)** - ソースコード、イシュー、プルリクエスト
- **[開発者向けドキュメント](./docs/README.md)** - 開発者・コントリビューター向けのドキュメントインデックス

## ライセンス

MIT © [kubo-hide-kun](https://github.com/kubo-hide-kun)

## コントリビューション

コントリビューションを歓迎します！コントリビューションガイドラインについては[GitHubリポジトリ](https://github.com/kubo-hide-kun/react-scroll-pkgs)を参照してください。

## 関連リンク

- [use-window-scroll-in-element on npm](https://www.npmjs.com/package/use-window-scroll-in-element)
- [react-scroll-flip-book on npm](https://www.npmjs.com/package/react-scroll-flip-book)
- [ライブデモサイト](https://react-scroll-pkgs.vercel.app/)
