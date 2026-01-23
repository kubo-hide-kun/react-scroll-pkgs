# MCP Server 設定ガイド

> **注意**: このドキュメントは日本語版です（開発者向け）。  
> **Note**: This is the Japanese version (for developers).

このプロジェクト用の MCP (Model Context Protocol) Server 設定を追加する手順です。  
This guide explains how to add MCP Server configuration for this project.

## 設定ファイルの場所

Cursor の MCP 設定は、ユーザーレベルの設定ファイルに保存されます：

**macOS/Linux**: `~/.cursor/mcp.json`

## 設定手順

### 方法1: セットアップスクリプトを使用（推奨）

```bash
# セットアップスクリプトを実行
./scripts/setup-mcp.sh
```

スクリプトは以下を自動的に実行します：
- **依存関係の確認とインストール**:
  - Node.js/npm/npx の確認（必須）
  - Playwright MCP のインストール
  - Chrome DevTools MCP のインストール
  - Python の確認（serena用）
  - uv の確認とインストール（オプション、serena用）
  - Cipher コマンドの確認
- **設定ファイルの管理**:
  - Cursor 設定ディレクトリの作成
  - 既存設定のバックアップ
  - 既存設定とのマージ（オプション）

**注意**: Node.js/npm/npx がインストールされていない場合は、スクリプトが終了します。
それ以外の依存関係（serena、cipher）がなくても、playwright と chrome-devtools は使用できます。

### 方法2: 手動で設定ファイルをコピー

プロジェクトルートの `mcp.json` を参考に、`~/.cursor/mcp.json` に設定ファイルを作成または更新してください。

```bash
# 設定ディレクトリが存在しない場合は作成
mkdir -p ~/.cursor

# プロジェクトの mcp.json を設定ファイルにコピー
cp mcp.json ~/.cursor/mcp.json
```

### 方法3: 手動で設定を追加する場合

既存の設定ファイルがある場合は、`mcp.json` の内容を既存の設定にマージしてください。

設定ファイルの構造：

```json
{
  "mcpServers": {
    "playwright": { ... },
    "chrome-devtools": { ... },
    "serena": { ... },
    "cipher": { ... }
  }
}
```

## Cursor の再起動

設定を反映するために、Cursor を再起動してください。

## 設定されている MCP Servers

### playwright
- **用途**: Playwright を使用したブラウザ自動化とビジョン機能
- **コマンド**: `npx @playwright/mcp@latest --vision`

### chrome-devtools
- **用途**: Chrome DevTools Protocol を使用したブラウザデバッグ
- **コマンド**: `npx chrome-devtools-mcp@latest`

### serena
- **用途**: Serena IDE アシスタント（プロジェクトコンテキスト対応）
- **コマンド**: `uvx --from git+https://github.com/oraios/serena serena start-mcp-server`
- **コンテキスト**: `ide-assistant`
- **プロジェクト**: 現在のディレクトリ（`.`）

### cipher
- **用途**: Cipher エンベッダー（ローカルモード）
- **コマンド**: `cipher --mode mcp`
- **環境変数**: `CIPHER_EMBEDDER=local`

## 前提条件

各 MCP Server を使用するには、以下の前提条件を満たす必要があります：

- **playwright**: Node.js と npm/npx がインストールされていること
- **chrome-devtools**: Node.js と npm/npx がインストールされていること
- **serena**: Python と `uvx` がインストールされていること
- **cipher**: `cipher` コマンドがインストールされ、PATH に含まれていること

## トラブルシューティング

### 設定が反映されない場合

1. Cursor を完全に再起動してください
2. 設定ファイルの JSON 構文が正しいか確認してください
3. 各 MCP Server のコマンドが正しく実行できるか確認してください

### コマンドが見つからない場合

- `npx` コマンド: Node.js がインストールされているか確認
- `uvx` コマンド: Python と `uv` がインストールされているか確認
- `cipher` コマンド: Cipher がインストールされ、PATH に含まれているか確認

## 参考

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Cursor MCP Settings](https://cursor.sh/docs/mcp)
