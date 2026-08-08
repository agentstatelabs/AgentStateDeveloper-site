---
title: Hash-chained audit for agent-authored code
description: Every ledger mutation and policy decision, appended to a tamper-evident log where each entry references the prior one's hash — replayable and independently verifiable.
date: 2026-08-28
color: blue
---

A regression lands in production. Billing is off by 2% on enterprise plans. The clock starts, and the question is brutally simple: *what changed, who changed it, and who approved it?*

If the answer is a two-day archaeology project across diffs, Slack, and half-remembered conversations, the tooling has failed. When agents are making many of the changes, that archaeology gets harder, not easier — there's no human memory to fall back on.

## An append-only, hash-chained log

ASD writes every ledger mutation and every policy evaluation to an **audit log**: a JSONL stream where each entry references the **hash of the prior entry**. That single property — each record chained to the one before it — is what makes the log *tamper-evident*. You can't quietly edit or drop an entry in the middle without breaking every hash after it.

```bash
asd audit tail --path billing/*
```

```
9f2a…c1  agent/refactor  ledger.append   computeProration kind=decision
b71e…88  alice@          ledger.approve  computeProration sig=ed25519
3c0d…42  agent/refactor  effect.declare  computeProration io.db.read
f5b2…17  policy          evaluation      require-approval → PASS
CHAIN VERIFIED · head 88a0…91 · replayable
```

There it is, in order: an agent appended a decision, a human approved it with a signature, an effect was declared, and the policy gate passed. The incident question — who broke billing, and was the change reviewed — is a single command, not a two-day dig.

## Verifiable, not just visible

A log you have to trust isn't much better than no log. `asd audit verify` walks the chain from head to root and confirms it hasn't been tampered with. Because the chain is deterministic and the entries are content-addressed, the verification is **independent** — anyone with the log can check it, without trusting the machine that produced it.

That's the difference between a convenience feature and an accountability primitive. Convenience shows you recent activity. Accountability lets you prove, after the fact, exactly what happened and in what order — which is precisely what you need when the change under investigation was made by an agent that can't be asked to remember.

*Next week: policy gates — who's allowed to change what.*
