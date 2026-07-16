---
title: Quick Start
description: Index a repo and append your first ledger entry in under 5 minutes.
---

## Install

```bash
cargo install --path crates/agentstatedeveloper-cli   # installs asd
cargo install --path crates/agentstatedeveloper-mcp   # installs asd-mcp + asd-serve
```

> The crate name `asd` on crates.io is taken by an unrelated diff tool. Install from source.

## Initialize your project

```bash
cd my-project
asd init
asd index .
```

`asd init` installs git hooks (pre-commit `asd sync --prune`, post-merge / post-checkout `asd hydrate && asd index .`) and adds `.asd-state.db` to `.gitignore`, leaving `.asd/v1/` tracked.

## Read a symbol

```bash
asd read payments.chargeCard
```

## Append a ledger entry

```bash
asd ledger append payments.chargeCard \
  --kind hazard \
  --summary "fails silently above 10000 — caller must check return value" \
  --author-kind human \
  --author-id alice@example.com
```

## Register the MCP server with your agents

```bash
asd mcp install
```

Writes the `asd-mcp` entry into `mcpServers` in every config it finds (Claude Code, Claude Desktop, Cursor). Restart the tool to activate.

## Sync the sidecar and commit

```bash
asd sync --prune
git add .asd/v1/
git commit -m "chore: sync ASD sidecar"
```

(After `asd init`, the pre-commit hook runs `asd sync --prune` automatically.)

## Brief output mode for agents

```bash
export ASD_FORMAT=brief
```

Projects `read` / `callers` / `callees` responses down to load-bearing fields only. 60–80% token reduction on those commands. Applies to CLI and MCP.

## Onboarding after clone

```bash
git clone <repo>
asd init        # installs hooks, updates .gitignore
asd hydrate     # loads .asd/v1/ → local SQLite
asd index .     # rebuilds derived semantic index
asd mcp install # registers asd-mcp with your agent tools
```
