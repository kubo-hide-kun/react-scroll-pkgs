# Agent SOPs

このディレクトリは [Agent SOP](https://github.com/strands-agents/agent-sop)
形式の再利用可能な作業手順（Standard Operating Procedures）を管理します。
このリポジトリで**繰り返し発生する作業**を、AI エージェントが一貫した手順で
実行できるようにするためのものです。

This directory holds reusable [Agent SOP](https://github.com/strands-agents/agent-sop)
workflows — repeatable procedures that AI agents follow to perform this
repository's recurring tasks consistently.

## 収録している SOP / Available SOPs

| ファイル / File                | 用途 / Purpose                                                                   |
| ------------------------------ | -------------------------------------------------------------------------------- |
| `release-npm-package.sop.md`   | パッケージのバージョン更新〜 npm 公開。build 失敗・lockfile 不整合の再発防止込み |
| `format-and-open-pr.sop.md`    | pinned Prettier 整形 → 型/lint/build 検証 → commitlint 準拠コミット → PR 作成    |
| `verify-website-change.sop.md` | `apps/website` 変更をブラウザ実機で検証し、Turbo outputs / Vercel 事故を防ぐ     |

各 SOP の `Constraints`（MUST / SHOULD / MUST NOT）には、過去に実際にハマった
失敗（build 失敗が publish 全体を止める、lockfile ずれで `npm ci` が落ちる、
Prettier のバージョン差で無関係な差分が出る、`turbo.json` の outputs 未宣言で
空デプロイになる 等）を「その制約が存在する理由」として埋め込んでいます。

Each SOP's constraints embed the real failures this project hit as the
_reason_ for the constraint, so they are not repeated.

## Claude Code での利用（チーム共通）/ Using from Claude Code (team-wide)

配布はリポジトリ直下の [`.mcp.json`](../.mcp.json)（プロジェクトスコープの
MCP 設定）で行います。**リポジトリを Claude Code で開いた全員**が、
`agent-sops` MCP サーバー経由でこれらの SOP をプロンプトとして利用できます。

Distribution is via the project-scoped [`.mcp.json`](../.mcp.json) at the repo
root. Everyone who opens this repo in Claude Code can use these SOPs as MCP
prompts through the `agent-sops` server. Approve the server when Claude Code
prompts you (project MCP servers require per-user approval).

```jsonc
// .mcp.json （抜粋 / excerpt）
{
  "mcpServers": {
    "agent-sops": {
      "command": "uvx",
      "args": [
        "--from",
        "strands-agents-sops==1.1.2",
        "strands-agents-sops",
        "mcp",
        "--sop-paths",
        "agent-sops"
      ]
    }
  }
}
```

- `uvx` を使うため**グローバルインストール不要**（serena と同じ方式）。
  必要なのは [uv](https://docs.astral.sh/uv/) のみ。
- `--sop-paths agent-sops` はリポジトリ直下からの相対パス。Claude Code は
  プロジェクトルートを作業ディレクトリとして MCP サーバーを起動します。
- 他エージェント（Cursor / Kiro / Amazon Q など）向けには、同じ SOP を
  Skill や IDE コマンドに書き出せます:

```bash
# Anthropic Skill 形式に書き出す / export as Anthropic Skills
uvx --from strands-agents-sops==1.1.2 strands-agents-sops skills \
  --sop-paths agent-sops --output-dir ./skills

# IDE コマンドを生成 / generate IDE commands (e.g. Cursor)
uvx --from strands-agents-sops==1.1.2 strands-agents-sops commands \
  --type cursor --sop-paths agent-sops
```

## 書式検証 / Format validation

Agent SOP に専用の `validate` サブコマンドはありません。公式には、ツールが
SOP を**パースできるか**が書式検証になります（不正な SOP は警告付きでスキップ
される）。`skills` 生成が全 SOP を出力できれば、書式は spec 準拠です。

```bash
uvx --from strands-agents-sops==1.1.2 strands-agents-sops skills \
  --sop-paths agent-sops --output-dir "$(mktemp -d)"
# → release-npm-package / format-and-open-pr / verify-website-change が
#   すべて "Created Anthropic skill" として出力されれば OK
```

書式ルールそのものは次で確認できます / Print the authoring rule:

```bash
uvx --from strands-agents-sops==1.1.2 strands-agents-sops rule
```

## 新しい SOP を追加する / Adding a new SOP

1. ファイル名は kebab-case + `.sop.md` 拡張子（例: `my-workflow.sop.md`）。
2. `# タイトル` / `## Overview` / `## Parameters` / `## Steps` を必ず含める。
3. 各ステップに `**Constraints:**` を置き、RFC2119 キーワード（MUST / SHOULD /
   MAY）を使う。
4. **否定制約（MUST NOT / SHOULD NOT / NEVER）には必ず理由を書く。**
   過去の失敗やハマりポイントを理由として残すこと。
5. パラメータ名は snake_case、必須を先・任意を後に並べる。
6. 上記の `skills` 生成コマンドで書式検証を通してからコミットする。
