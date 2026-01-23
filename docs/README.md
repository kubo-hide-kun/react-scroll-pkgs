# Documentation Index

このプロジェクトのドキュメント一覧です。  
Documentation index for this project.

## 言語について / About Languages

このプロジェクトは OSS として公開されており、開発者は日本人ですが、公開対象は世界です。  
This project is published as OSS. The developers are Japanese, but the target audience is international.

### ドキュメントの言語方針 / Documentation Language Policy

- **開発者向けドキュメント** (`docs/`): 日本語を基本とし、英語版も用意
  - **Developer Documentation** (`docs/`): Japanese as primary, English versions also available
- **エージェント向けドキュメント** (`.serena/memories/`, `.serena/project.yml`): 英語（国際的なエージェント対応のため）
  - **Agent-facing Documentation** (`.serena/memories/`, `.serena/project.yml`): English (for international agent compatibility)
- **プロジェクトルール** (`.cursorrules`): 日本語（開発者が読むため）
  - **Project Rules** (`.cursorrules`): Japanese (for developers to read)
- **公開用ドキュメント** (`packages/*/README.md`): 英語（npm パッケージのため）
  - **Public Documentation** (`packages/*/README.md`): English (for npm packages)

## ドキュメント一覧 / Documentation List

### 開発者向け / For Developers

- **[AGENT_GUIDE.md](./AGENT_GUIDE.md)** (日本語 / Japanese)
  - Cursor エージェント向けのプロジェクトガイド
  - Project guide for Cursor agents
- **[AGENT_GUIDE.en.md](./AGENT_GUIDE.en.md)** (英語 / English)
  - English version of the agent guide
- **[MCP_SETUP.md](./MCP_SETUP.md)** (日本語 / Japanese)
  - MCP Server 設定ガイド
  - MCP Server setup guide

### エージェント向け / For Agents

- `.serena/memories/` - Serena メモリファイル（英語 / English）
  - `project_overview.md` - プロジェクト概要
  - `package_details.md` - パッケージ詳細
  - `task_completion_checklist.md` - タスク完了チェックリスト
  - `suggested_commands.md` - 推奨コマンド
  - `code_style_and_conventions.md` - コードスタイルと規約

### プロジェクトルール / Project Rules

- `.cursorrules` (日本語 / Japanese)
  - Cursor エージェント向けのプロジェクト固有ルール
  - Project-specific rules for Cursor agents

## プロジェクトリンク / Project Links

- **GitHub**: https://github.com/kubo-hide-kun/react-scroll-pkgs
- **Demo Site**: https://react-scroll-pkgs.vercel.app/
- **npm Packages**:
  - [react-scroll-flip-book](https://www.npmjs.com/package/react-scroll-flip-book)
  - [use-window-scroll-in-element](https://www.npmjs.com/package/use-window-scroll-in-element)
