---
title: "ASD + CTXone: code intelligence meets memory"
description: ASD knows what your code does; CTXone remembers what your team decided. Wire them into one Hub and an agent gets both halves of context over a single connection.
date: 2026-09-11
color: cyan
---

Context for a coding agent comes in two halves.

One half is **what the code does** — the symbols, the call graph, the effects, the ledger decisions bound to each function. That's AgentStateDeveloper.

The other half is **what the team decided** — the durable memory, the plans that survive plan rot, the provenance for facts that were settled in a conversation months ago and never made it into any file. That's [CTXone](https://ctxone.com).

An agent with only code intelligence knows the mechanics but not the intent that lives above the codebase. An agent with only memory knows the decisions but has to guess at the blast radius of a change. You want both — through one connection.

## One Hub, both halves

CTXone runs a self-hosted **Hub** that serves memory, plans, and provenance over MCP. Wire ASD into the same Hub and its code-intelligence tools are served *right next to* memory:

- `code_search` — find the symbol behind a concept
- `code_read` — signature, effects, and ledger decisions for a symbol
- `callers_of` — the blast radius before you edit
- `callees_of` — what a symbol depends on

Now a single agent session can recall a frozen team decision *and* check `callers_of` before it edits — the way someone who already knows the codebase would work.

## Setup is one flag

The two tools are built to find each other. Installing either offers to set up the other; `ctx bootstrap` even prints the steps to add `asd` to an existing Hub. There's no separate integration to maintain — ASD's tools simply show up in the same MCP surface your agent already talks to.

```bash
ctx bootstrap   # offers to install and wire in asd
```

Memory is half of context. Code intelligence is the other half. The point of pairing them is that an agent shouldn't have to choose — it should get both, over one connection, and work like it already knows the place.

*This wraps the launch series. Thanks for reading — the tools are open; come build with us.*
