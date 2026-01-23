# Cursor 設定ガイド

このプロジェクト用の Cursor エージェント設定を完了するためのガイドです。

## 1. プロジェクトルール（`.cursorrules`）

✅ **完了**: ルートに `.cursorrules` ファイルを作成しました。

このファイルは、Cursor エージェントが自動的に読み込み、プロジェクト固有のルールとして適用します。

## 2. プロンプトプリセットの設定

Cursor の「Prompt Presets」機能を使用して、役割別のプリセットを作成することを推奨します。

### 設定方法

1. Cursor を開く
2. 設定（Settings）→「Cursor Settings」→「Prompt Presets」を開く
3. 以下の3つのプリセットを作成：

### A. Planner（設計・調査役）

**名前**: `Planner`

**プロンプト**:
```
このリポジトリは Turborepo モノレポ。packages は公開物、apps/website はデモ。

要件と対象パッケージを提示されたら、以下を出力せよ：
1. 影響範囲の切り分け（apps vs packages）
2. 破壊的変更の有無の判定
3. 最大5ステップの実装計画
4. テスト方針

公開パッケージ:
- react-scroll-flip-book (v1.0.2)
- use-window-scroll-in-element (v1.1.1)

これらの変更は GitHub Actions の公開ワークフローに影響するため、慎重に検討すること。
```

### B. Implementer（実装役）

**名前**: `Implementer`

**プロンプト**:
```
Planner の計画に基づいて実装を進める。

ガードルール:
- lockfile (package-lock.json) を勝手に更新しない
- export を変えるなら互換性説明必須
- Prettier 設定 (singleQuote: true, arrowParens: always) に従う

出力形式:
1. 変更ファイル一覧
2. 差分（コード）
3. 実行すべきコマンド（turbo run build / lint / typecheck）
4. 検証チェックリスト
```

### C. Reviewer（レビュー役）

**名前**: `Reviewer`

**プロンプト**:
```
git diff または変更内容をレビューする。

確認項目:
1. リスク評価（publish/互換性/型/境界条件）
2. 改善提案
3. conventional commit メッセージ案（scope 必須）

commitlint ルール:
- scope は必須（'all' またはパッケージ名）
- 形式: <type>(<scope>): <subject>

例: feat(react-scroll-flip-book): add new feature
```

## 3. 使用方法

### Planner を使用する場合
1. Cursor のチャットで `@Planner` を選択
2. 要件を説明する
3. 計画を確認してから実装に進む

### Implementer を使用する場合
1. Planner の計画を提示
2. `@Implementer` を選択
3. 実装を依頼する

### Reviewer を使用する場合
1. 変更後に `@Reviewer` を選択
2. 変更内容を提示
3. レビューとコミットメッセージ案を受け取る

## 4. 自動チェックの実行順序

エージェントに変更を依頼した後、以下の順序で検証を実行してください：

```bash
# 1. リント
turbo run lint

# 2. 型チェック
turbo run typecheck

# 3. ビルド（最重要：公開ワークフローを壊さないため）
turbo run build

# 4. デモサイトの動作確認（オプション）
npm run website
```

## 5. 参考ドキュメント

- `.cursorrules` - プロジェクト固有のルール
- `docs/AGENT_GUIDE.md` - パッケージの責務と公開プロセス
- `turbo.json` - Turborepo のタスク定義
- `.github/workflows/` - CI/CD ワークフロー
