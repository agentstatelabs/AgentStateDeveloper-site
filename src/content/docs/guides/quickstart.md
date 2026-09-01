---
title: Quick Start
description: Index a repo and append your first ledger entry in under 5 minutes.
---

## Install

Homebrew (recommended):

```bash
brew tap agentstatelabs/agentstatedeveloper
brew trust agentstatelabs/agentstatedeveloper   # Homebrew 6.0+ only
brew install asd   # installs asd, asd-mcp, and asd-serve
```

Homebrew 6.0 refuses to load formulae from untrusted third-party taps, so the
`brew trust` step is required — without it the install stops with *"Refusing to
load formula ... from untrusted tap"*. Older Homebrew has no `trust` subcommand
and does not need one.

Or the cross-platform one-liner:

```bash
curl -fsSL https://raw.githubusercontent.com/agentstatelabs/AgentStateDeveloper/main/install.sh | sh
```

On Windows (PowerShell):

```powershell
iwr https://raw.githubusercontent.com/agentstatelabs/AgentStateDeveloper/main/install.ps1 | iex
```

> Building from source? `cargo install --path crates/agentstatedeveloper-cli` (and `...-mcp` for asd-mcp + asd-serve). The crate name `asd` on crates.io is an unrelated diff tool, so install via Homebrew or source.

## Initialize your project

One command sets everything up:

```bash
cd my-project
asd onboard
```

`asd onboard` runs `init → index → conclusions import → mcp install --project`, so
you get a live index **and** an agent-reachable MCP server (a project-scoped
`.mcp.json`) in a single step. It's idempotent — safe to re-run. Pass `--no-mcp` to
skip the MCP registration.

Prefer the individual steps? They're still available:

```bash
asd init          # installs git hooks, updates .gitignore
asd index .       # builds the semantic index
asd mcp install   # registers the MCP server (see below)
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

If you ran `asd onboard`, this is already done — it registers a **project-scoped**
server (a `.mcp.json` in the repo). Restart your agent to activate.

To register manually, or to write into your agents' **global** configs instead:

```bash
asd mcp install
```

Writes the `asd-mcp` entry into `mcpServers` in every config it finds (Claude Code, Claude Desktop, Cursor). Use `--project` to scope it to a single repo's `.mcp.json` instead. Restart the tool to activate.

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
asd onboard     # init → index → conclusions import → mcp install (--project)
```

`asd onboard` is the one-command path and is idempotent. Add `--no-mcp` to skip the
MCP registration. If the clone ships a committed sidecar you want to restore exactly,
run `asd hydrate --verify` before indexing:

```bash
asd init
asd hydrate --verify   # restore .asd/v1/ → local SQLite, catch drift
asd index .
asd mcp install
```
