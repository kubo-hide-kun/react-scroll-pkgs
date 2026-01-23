#!/bin/bash

# MCP Server 設定を Cursor の設定ディレクトリにコピーするスクリプト

# エラー時に即座に終了しない（一部の依存関係がなくても続行可能）
set +e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MCP_CONFIG_SOURCE="$PROJECT_ROOT/mcp.json"

# macOS/Linux の設定ディレクトリ
CURSOR_CONFIG_DIR="$HOME/.cursor"
CURSOR_MCP_CONFIG="$CURSOR_CONFIG_DIR/mcp.json"

echo "🚀 MCP Server 設定を Cursor に追加します..."
echo ""

# 依存関係のチェックとインストール
echo "📦 依存関係を確認中..."

# Node.js/npm の確認
if ! command -v node &> /dev/null; then
  echo "❌ Node.js がインストールされていません"
  echo "   Node.js をインストールしてください: https://nodejs.org/"
  exit 1
fi

if ! command -v npm &> /dev/null; then
  echo "❌ npm がインストールされていません"
  echo "   Node.js と一緒にインストールされるはずです"
  exit 1
fi

if ! command -v npx &> /dev/null; then
  echo "❌ npx がインストールされていません"
  echo "   Node.js と一緒にインストールされるはずです"
  exit 1
fi

echo "✅ Node.js $(node --version) / npm $(npm --version) / npx が利用可能です"

# playwright MCP のインストール確認とインストール
echo ""
echo "🎭 Playwright MCP を確認中..."
if npm list -g @playwright/mcp &> /dev/null; then
  echo "✅ Playwright MCP は既にインストールされています"
else
  echo "📥 Playwright MCP をインストール中..."
  if npm install -g @playwright/mcp@latest; then
    echo "✅ Playwright MCP のインストールが完了しました"
  else
    echo "⚠️  グローバルインストールに失敗しましたが、npx で実行時に自動インストールされます"
  fi
fi

# chrome-devtools MCP のインストール確認とインストール
echo ""
echo "🔧 Chrome DevTools MCP を確認中..."
if npm list -g chrome-devtools-mcp &> /dev/null; then
  echo "✅ Chrome DevTools MCP は既にインストールされています"
else
  echo "📥 Chrome DevTools MCP をインストール中..."
  if npm install -g chrome-devtools-mcp@latest; then
    echo "✅ Chrome DevTools MCP のインストールが完了しました"
  else
    echo "⚠️  グローバルインストールに失敗しましたが、npx で実行時に自動インストールされます"
  fi
fi

# Python の確認（serena用）
echo ""
echo "🐍 Python を確認中..."
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
  echo "⚠️  Python がインストールされていません（serena MCP に必要）"
  echo "   Python をインストールしてください: https://www.python.org/"
else
  PYTHON_CMD=$(command -v python3 2>/dev/null || command -v python 2>/dev/null)
  echo "✅ Python $($PYTHON_CMD --version) が利用可能です"
fi

# uv の確認とインストール（serena用）
echo ""
echo "📦 uv を確認中..."
if ! command -v uvx &> /dev/null; then
  echo "⚠️  uv がインストールされていません（serena MCP に必要）"
  if ! command -v curl &> /dev/null; then
    echo "❌ curl がインストールされていません"
    echo "   uv を手動でインストールしてください:"
    echo "   pip install uv"
  else
    echo "📥 uv をインストールしますか？ (y/n)"
    read -r install_uv
    if [[ "$install_uv" =~ ^[Yy]$ ]]; then
      echo "📥 uv をインストール中..."
      if curl -LsSf https://astral.sh/uv/install.sh | sh; then
        # インストール後、PATH に追加（現在のシェルセッション用）
        export PATH="$HOME/.cargo/bin:$PATH"
        if command -v uvx &> /dev/null; then
          echo "✅ uv のインストールが完了しました"
        else
          echo "⚠️  uv がインストールされましたが、PATH に追加されていません"
          echo "   新しいターミナルを開くか、以下を実行してください:"
          echo "   export PATH=\"\$HOME/.cargo/bin:\$PATH\""
        fi
      else
        echo "❌ uv のインストールに失敗しました"
        echo "   手動でインストールしてください:"
        echo "   curl -LsSf https://astral.sh/uv/install.sh | sh"
        echo "   または: pip install uv"
      fi
    else
      echo "⏭️  uv のインストールをスキップしました"
    fi
  fi
else
  echo "✅ uv $(uvx --version 2>/dev/null || echo 'installed') が利用可能です"
fi

# cipher の確認
echo ""
echo "🔐 Cipher を確認中..."
if ! command -v cipher &> /dev/null; then
  echo "⚠️  Cipher コマンドが見つかりません（cipher MCP に必要）"
  echo "   Cipher をインストールしてください"
else
  echo "✅ Cipher が利用可能です"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 設定ファイルのコピー処理はエラー時に停止する
set -e

# 設定ディレクトリが存在しない場合は作成
if [ ! -d "$CURSOR_CONFIG_DIR" ]; then
  echo "📁 Cursor 設定ディレクトリを作成: $CURSOR_CONFIG_DIR"
  mkdir -p "$CURSOR_CONFIG_DIR"
fi

# 既存の設定ファイルがあるか確認
if [ -f "$CURSOR_MCP_CONFIG" ]; then
  echo "⚠️  既存の設定ファイルが見つかりました: $CURSOR_MCP_CONFIG"
  echo "既存の設定をバックアップします..."
  cp "$CURSOR_MCP_CONFIG" "$CURSOR_MCP_CONFIG.backup.$(date +%Y%m%d_%H%M%S)"
  
  echo ""
  echo "既存の設定とマージしますか？ (y/n)"
  read -r response
  if [[ "$response" =~ ^[Yy]$ ]]; then
    echo "📝 既存の設定とマージ中..."
    # jq がインストールされている場合はマージ、なければ上書き
    if command -v jq &> /dev/null; then
      jq -s '.[0] * .[1]' "$CURSOR_MCP_CONFIG" "$MCP_CONFIG_SOURCE" > "$CURSOR_MCP_CONFIG.tmp"
      mv "$CURSOR_MCP_CONFIG.tmp" "$CURSOR_MCP_CONFIG"
      echo "✅ 設定をマージしました"
    else
      echo "⚠️  jq がインストールされていないため、既存の設定を上書きします"
      cp "$MCP_CONFIG_SOURCE" "$CURSOR_MCP_CONFIG"
      echo "✅ 設定を上書きしました"
    fi
  else
    echo "❌ マージをスキップしました"
    exit 0
  fi
else
  echo "📋 新しい設定ファイルを作成: $CURSOR_MCP_CONFIG"
  cp "$MCP_CONFIG_SOURCE" "$CURSOR_MCP_CONFIG"
  echo "✅ 設定ファイルを作成しました"
fi

echo ""
echo "✨ 設定が完了しました！"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📝 次のステップ:"
echo "1. Cursor を再起動して設定を反映してください"
echo "2. Cursor の設定で MCP Servers が有効になっているか確認してください"
echo ""
echo "📁 設定ファイルの場所: $CURSOR_MCP_CONFIG"
echo ""
echo "💡 注意: 一部の MCP Server（serena、cipher）が利用できない場合でも、"
echo "   playwright と chrome-devtools は使用できます。"
