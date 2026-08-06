---
title: On-demand help
description: Per-feature docs an agent can pull just-in-time, instead of carrying every tool's full instructions in context.
---

`asd help` is **on-demand instruction disclosure**: it returns the docs for
one feature — synopsis, syntax, params, examples, and gotchas — so an agent can
pull exactly what it needs, when it needs it, instead of carrying every tool's
full instructions in context every turn.

```bash
asd help                 # full feature catalog
asd help impact          # one feature (a name, or a phrase like "blast radius")
asd help --agent         # machine-readable JSON
asd help --manifest      # this binary's feature index
```

## Version-pinned and identical across surfaces

The docs are compiled into the running binary, so they always match the code —
no drift between what `asd help` says and what the command does. The CLI
(`asd help`) and the MCP `help` tool return **byte-identical** payloads, so an
agent gets the same answer whether it shells out or calls the tool.

## Cross-tool resolution

When ASD and CTXone are both installed, `help` is backed by a shared cross-tool
registry: an unknown topic is resolved by the owning tool (`asd` ↔ `ctx`). Ask
`asd help` about a CTXone feature and the response tells you so, and vice versa.
`asd help --publish` writes this binary's manifest into the shared index so a
unified `help` can discover ASD's features alongside CTXone's — the index is
tool-keyed, so publishing one never clobbers the other's entry.

## Why it matters for agents

Loading a big always-on instruction block spends tokens on capabilities the
agent isn't using this turn. `asd help <topic>` costs a couple hundred tokens
and returns just the feature at hand — cheaper, and always current. Point your
agent at `asd help` (the `asd skill` always-on block already does) and let it
fetch syntax on demand.
