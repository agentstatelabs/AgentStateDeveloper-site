---
title: Introduction
description: What AgentStateDeveloper is and why it exists.
---

AgentStateDeveloper (ASD) is a code-level context and audit overlay for agent-authored code. It gives every function a **decision ledger**, an **effect declaration**, and a place in a **call graph** — all queryable by the coding agents that write the code, all checked into git so they travel with every clone.

## The problem

Coding agents now write, refactor, and review code at human-equivalent rates. The next bottleneck is not throughput — it is knowing *what an agent already decided*, *what it's allowed to touch*, and *who approved it*. The diff alone does not answer those questions. Slack threads, PR descriptions, and tribal knowledge don't survive a rename, a file move, or the original author leaving.

## What ASD provides

| Primitive | What you get |
|---|---|
| **Decision ledger** | Append decisions, hazards, rationale, and constraints to any symbol. Entries survive renames. Approve, reject, or withdraw. |
| **Effect declarations** | 17 categories (`io.fs.read`, `io.net.out`, `io.db.write`, …). Declared per symbol, propagated transitively through the call graph. |
| **Semantic index** | Every function, method, and class parsed by tree-sitter. 9 languages: Python, TypeScript, Rust, Go, Java, C#, Ruby, Kotlin, Swift. |
| **Call graph** | Intra- and cross-module edges. Transitive effects propagate automatically. |
| **Policy gate** | File-backed JSON rules: allow, deny, or require-approval per action and actor kind. |
| **Ratification** | Approve, reject, or withdraw ledger entries. Full approval workflow. |
| **Audit event stream** | Hash-chained JSONL log of every ledger mutation and policy evaluation. |
| **Agent thinking** | Hypotheses, mental models, failed attempts, and open questions — stored per symbol, surfaced by `prepare-change`, shared across sessions via git. |
| **Git-native sidecar** | Ledger entries and effects live in `.asd/v1/` — checked into git, travel with every clone. |

## Surfaces

- **`asd`** — CLI for humans and scripts.
- **`asd-mcp`** — stdio MCP server, registered into Claude Code / Claude Desktop / Cursor with one command.
- **`asd-serve`** — HTTP server plus the Lens review UI.
