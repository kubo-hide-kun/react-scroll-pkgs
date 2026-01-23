# Agent Guide for react-scroll-pkgs

このドキュメントは、Cursor エージェントがこのプロジェクトを理解し、適切な変更を提案するためのガイドです。

## プロジェクト構造

### モノレポ構成
- **`apps/website`**: デモ・ドキュメントサイト（公開対象外）
- **`packages/*`**: npm に公開されるライブラリ（公開対象）

### Turborepo ワークスペース
- ルートの `package.json` で `workspaces` を定義
- `turbo.json` でタスクパイプラインを定義

## 公開パッケージ

### react-scroll-flip-book (v1.0.2)
- **責務**: React Hook for scroll flip book functionality
- **エントリーポイント**: `src/index.ts` → `lib/index.js`
- **型定義**: `lib/typescript/index.d.ts`
- **公開ファイル**: `lib/`, `LICENSE`
- **依存関係**: `use-window-scroll-in-element` を使用

### use-window-scroll-in-element (v1.1.1)
- **責務**: React Hook for get window position of element
- **エントリーポイント**: `src/index.ts` → `lib/index.js`
- **型定義**: `lib/typescript/index.d.ts`
- **公開ファイル**: `lib/`, `LICENSE`
- **依存関係**: `just-throttle` を使用

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

## 開発時の注意点

1. **apps と packages の境界**: `apps/website` はデモ用途。パッケージの変更がデモに影響しないか確認
2. **依存関係の循環**: `react-scroll-flip-book` は `use-window-scroll-in-element` に依存。循環依存を避ける
3. **型定義の整合性**: `lib/typescript/index.d.ts` が正しく生成されることを確認
4. **Prettier 設定**: `singleQuote: true`, `arrowParens: always` に従う
