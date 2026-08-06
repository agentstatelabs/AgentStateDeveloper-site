---
title: CLI (asd)
description: Top-level command reference for the asd CLI.
---

Top-level commands: `onboard`, `init`, `index`, `read`, `ledger`, `think`, `impact`, `prepare-change`, `policy`, `verify-effects`, `trace`, `sync`, `hydrate`, `audit`, `hooks`, `mcp`, `skill`, `watch`, `conclusions`, [`worktree`](/guides/worktree/), [`help`](/guides/help/), `bootstrap`.

Each command is also available via clap aliases that match the MCP tool names, so agents trained on MCP-era docs can type either `asd ledger append` or `asd ledger_append`.

## think

Record and retrieve agent reasoning entries. Four entry types:

| Subcommand | Entry kind |
|---|---|
| `asd think speculate <qname> --conf <0.0–1.0> --summary <text>` | `hypothesis` |
| `asd think model <name> --symbols <q1,q2,...> --summary <text>` | `mental_model` |
| `asd think failed <qname> --tried <text> --because <text>` | `failed_attempt` |
| `asd think question <qname> --q <text>` | `open_question` |
| `asd think list [--kind <kind>] [--symbol <qname>] [--json]` | — |

Bootstrap helpers:
- `asd think bootstrap` — print the initial-read checklist
- `asd think bootstrap --check` — scan existing entries and report gaps vs. inherited thinking
- `asd think prompt` — print the embedded initial-read prompt template

See [Agent Thinking](/guides/agent-thinking/) for the full guide.

## conclusions

Export and import thinking entries for cross-session or cross-repo sharing:

- `asd conclusions export` — write entries to `.asd/conclusions/*.jsonl`
- `asd conclusions import` — load from `.asd/conclusions/` (runs automatically on `git pull` via post-merge hook)
