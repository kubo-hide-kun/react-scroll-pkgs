#!/bin/bash

# Serena インデックス作成スクリプト
# このスクリプトは、Serena の onboarding を実行してプロジェクトのインデックスを作成します

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🚀 Serena インデックスを作成します..."
echo ""

# uvx がインストールされているか確認
if ! command -v uvx &> /dev/null; then
  echo "❌ uvx がインストールされていません"
  echo "   uv をインストールしてください:"
  echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
  exit 1
fi

echo "✅ uvx が利用可能です"
echo ""

# プロジェクトディレクトリに移動
cd "$PROJECT_ROOT"

echo "📋 プロジェクト情報:"
echo "   - プロジェクト名: react-scroll-pkgs"
echo "   - プロジェクトルート: $PROJECT_ROOT"
echo "   - 設定ファイル: .serena/project.yml"
echo ""

# Serena の onboarding を実行
echo "🔍 Serena の onboarding を実行中..."
echo "   これにより、プロジェクト構造の分析とインデックス作成が行われます。"
echo ""

# MCP サーバー経由で onboarding を実行する方法を案内
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 Serena のインデックス作成方法:"
echo ""
echo "方法1: Cursor の MCP 経由で実行（推奨）"
echo "   1. Cursor を開く"
echo "   2. チャットで以下のコマンドを実行:"
echo "      @serena onboarding"
echo ""
echo "方法2: コマンドラインから実行"
echo "   以下のコマンドを実行してください:"
echo ""
echo "   uvx --from git+https://github.com/oraios/serena serena start-mcp-server \\"
echo "     --context ide-assistant \\"
echo "     --project ."
echo ""
echo "   その後、MCP クライアント経由で onboarding ツールを呼び出してください。"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 設定ファイルの確認
if [ -f ".serena/project.yml" ]; then
  echo "✅ Serena 設定ファイルが見つかりました: .serena/project.yml"
else
  echo "⚠️  Serena 設定ファイルが見つかりません: .serena/project.yml"
  echo "   設定ファイルを作成してください"
  exit 1
fi

# プロジェクトがアクティブかどうかを確認（簡易チェック）
echo ""
echo "📝 次のステップ:"
echo "   1. Cursor で MCP Server が起動していることを確認"
echo "   2. Cursor のチャットで '@serena onboarding' を実行"
echo "   3. インデックス作成が完了するまで待機（数分かかる場合があります）"
echo ""
echo "✨ インデックス作成が完了すると、以下の機能が利用可能になります:"
echo "   - find_symbol: シンボル検索"
echo "   - find_referencing_symbols: 参照元検索"
echo "   - get_symbols_overview: ファイル構造の概要取得"
echo "   - search_for_pattern: パターン検索"
echo ""
