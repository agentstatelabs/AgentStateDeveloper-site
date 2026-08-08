---
title: "Policy gates: who's allowed to change what"
description: File-backed rules that allow, deny, or require approval per action and actor — evaluated on every ledger mutation and emitted to the audit stream.
date: 2026-09-04
color: pink
---

"Move fast" and "don't let an agent silently rewrite the payments path" are both reasonable, and they're in tension. The resolution isn't to slow every change down — it's to make the *sensitive* changes go through review while everything else flows.

That's what a policy gate is for.

## Rules as data

ASD's policy is a file — `policy.json` — that allows, denies, or requires approval **per action and per actor kind**. A rule reads roughly like:

> require-approval on `ledger.append` when `actor_kind == agent` and the symbol matches `payments.*`

An agent appending a routine decision to a low-risk symbol sails through. The same agent touching `payments.*` trips the gate and the change waits for a human approval. The policy lives in the repo, versioned alongside the code it governs, so the rules travel with every clone and change under the same review as everything else.

```bash
asd policy eval payments/*
```

## Evaluated on every mutation, recorded every time

The gate isn't advisory. It's **evaluated on every ledger mutation**, and the result — PASS, DENY, or REQUIRE-APPROVAL — is emitted to the audit stream. So policy isn't just a fence; it's part of the accountable record. Later you can ask not only "what changed" but "did the gate fire, and what did it decide."

That closes a loop the other primitives open. The ledger records intent; effects record reach; ratification records authority. Policy is the piece that decides, *at write time*, whether a given actor is even allowed to make a given change — and then leaves proof that the decision was made.

The point isn't to make agents slow. It's to make the small number of high-consequence changes legible and reviewable, while the rest of the work — the vast majority — never has to stop.

*Next week: ASD + CTXone — code intelligence meets memory.*
