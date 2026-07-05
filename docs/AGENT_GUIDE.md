# Agent Guide for react-scroll-pkgs

> **注意**: このドキュメントは日本語版です。英語版は [AGENT_GUIDE.en.md](./AGENT_GUIDE.en.md) を参照してください。  
> **Note**: This is the Japanese version. For English version, see [AGENT_GUIDE.en.md](./AGENT_GUIDE.en.md).

このドキュメントは、Cursor エージェントがこのプロジェクトを理解し、適切な変更を提案するためのガイドです。  
This document is a guide for Cursor agents to understand this project and propose appropriate changes.

## プロジェクト構造

### モノレポ構成

- **`apps/website`**: デモ・ドキュメントサイト（公開対象外）
  - **デモサイト**: https://react-scroll-pkgs.vercel.app/ (Vercel でホスティング)
- **`packages/*`**: npm に公開されるライブラリ（公開対象）

### Turborepo ワークスペース

- ルートの `package.json` で `workspaces` を定義
- `turbo.json` でタスクパイプラインを定義

## プロジェクトリンク

- **GitHub リポジトリ**: https://github.com/kubo-hide-kun/react-scroll-pkgs
- **デモサイト**: https://react-scroll-pkgs.vercel.app/
- **npm パッケージ**:
  - [react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)
  - [use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)

## 公開パッケージ

### react-scroll-flip-book (v1.0.2)

- **責務**: React Hook for scroll flip book functionality
- **エントリーポイント**: `src/index.ts` → `lib/index.js`
- **型定義**: `lib/typescript/index.d.ts`
- **公開ファイル**: `lib/`, `LICENSE`
- **依存関係**: `use-window-scroll-in-element` を使用
- **npm**: https://www.npmjs.com/package/react-scroll-flip-book
- **インストール**: `npm install react-scroll-flip-book`

### use-window-scroll-in-element (v1.1.1)

- **責務**: React Hook for get window position of element
- **エントリーポイント**: `src/index.ts` → `lib/index.js`
- **型定義**: `lib/typescript/index.d.ts`
- **公開ファイル**: `lib/`, `LICENSE`
- **依存関係**: `just-throttle` を使用
- **npm**: https://www.npmjs.com/package/use-window-scroll-in-element
- **インストール**: `npm install use-window-scroll-in-element`

## ビルド・公開プロセス

### ビルド

- 各パッケージは `tsc --project tsconfig.build.json` で TypeScript をコンパイル
- 出力先: `lib/` ディレクトリ
- `prepublishOnly` スクリプトで自動ビルドされる

### 公開ワークフロー（GitHub Actions）

1. `npm ci` - 依存関係のインストール
2. `npm run build` - 全パッケージのビルド（`turbo run build`）
3. `npm publish -w <package-name>` - 特定パッケージの公開

**重要**: `build` タスクが失敗すると公開プロセス全体が失敗します。

## 破壊的変更の基準

### Major バージョンアップが必要な変更

- public API の削除
- 関数シグネチャの変更（引数の型・順序・必須性）
- デフォルト動作の変更
- 依存パッケージの major バージョンアップ

### Minor バージョンアップが必要な変更

- 新機能の追加（後方互換性あり）
- 既存 API の拡張（オプショナル引数の追加など）

### Patch バージョンアップが必要な変更

- バグ修正
- ドキュメント修正
- 内部実装の改善（API 変更なし）

## リリース運用

- 各パッケージは独立してバージョン管理される
- GitHub Actions の `workflow_dispatch` で手動公開
- 公開前に必ず `turbo run build` が成功することを確認

## MCP (Model Context Protocol) の活用

このプロジェクトでは、**MCP をフル活用することが必須**です。以下の MCP Server が設定されており、可能な限り活用してください。

### 利用可能な MCP Servers

#### playwright

- **用途**: ブラウザ自動化とビジョン機能
- **使用場面**:
  - `apps/website` の動作確認
  - デモサイトの E2E テスト
  - ビジュアルリグレッションテスト
  - スクリーンショット取得

#### chrome-devtools

- **用途**: Chrome DevTools Protocol を使用したブラウザデバッグ
- **使用場面**:
  - パフォーマンス分析
  - ネットワークリクエストの確認
  - コンソールログの確認
  - 要素の詳細な調査

#### serena

- **用途**: プロジェクトコンテキスト対応の IDE アシスタント
- **使用場面**:
  - コード検索（`find_symbol`, `search_for_pattern`）
  - シンボルの参照元検索（`find_referencing_symbols`）
  - コードの構造理解（`get_symbols_overview`）
  - シンボルのリネーム（`rename_symbol`）

#### cipher

- **用途**: ローカルエンベッダー
- **使用場面**:
  - コードの意味理解
  - セマンティック検索
  - 類似コードの検索

### MCP 使用の優先順位

1. **コード検索・シンボル操作**: `serena` を優先的に使用

   - 従来の `grep` や `codebase_search` の代わりに `serena` の `find_symbol` や `search_for_pattern` を使用
   - シンボルの参照元を調べる場合は `find_referencing_symbols` を使用

2. **Web アプリケーションの動作確認**: `playwright` または `chrome-devtools` を使用

   - `apps/website` の動作確認は必ずブラウザで確認
   - スクリーンショットやスナップショットを取得して視覚的に確認

3. **コードの意味理解**: `cipher` を活用

   - セマンティック検索が必要な場合に使用

4. **従来のツール**: MCP で対応できない場合のみ使用
   - `grep`, `read_file`, `codebase_search` などは、MCP で対応できない場合のフォールバック

### 重要な注意事項

- **ブラウザ操作が必要な場合**: `apps/website` の動作確認やデモの検証時は、必ず `playwright` または `chrome-devtools` を使用して実際のブラウザで確認すること。推測やコードレビューだけでは不十分。
- **コード検索**: シンボル名が分かっている場合は、`serena` の `find_symbol` を使用。パターンマッチングが必要な場合は `search_for_pattern` を使用。
- **プロジェクト構造の理解**: 新しいファイルやディレクトリを理解する際は、`serena` の `get_symbols_overview` を活用。

## 開発時の注意点

1. **apps と packages の境界**: `apps/website` はデモ用途。パッケージの変更がデモに影響しないか確認（**MCP の `playwright` を使用してブラウザで確認**）
2. **依存関係の循環**: `react-scroll-flip-book` は `use-window-scroll-in-element` に依存。循環依存を避ける（**`serena` の `find_referencing_symbols` で確認**）
3. **型定義の整合性**: `lib/typescript/index.d.ts` が正しく生成されることを確認
4. **Prettier 設定**: `singleQuote: true`, `arrowParens: always` に従う
