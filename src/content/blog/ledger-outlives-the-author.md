---
title: A decision ledger that outlives the author
description: Append-only decisions, hazards, and rationale attached to a symbol — surviving renames, file moves, and the person who wrote them leaving.
date: 2026-08-21
color: amber
---

The most expensive question in a mature codebase is "why is this like this?" — and the answer usually left with someone who is no longer on the team.

A code comment helps until the code is refactored around it. A commit message helps until the file is split. A design doc helps until nobody remembers it exists. The reasoning is real and valuable, but it's stored in places that don't survive the code's own evolution.

## Attach the decision to the symbol

ASD's **decision ledger** attaches structured entries to a *symbol*, not a line or a file. An entry is a decision, a hazard, a piece of rationale, or a constraint:

```bash
asd ledger append --kind hazard payments.chargeCard \
  --summary "fails silently above \$10,000 — caller must check return value" \
  --rationale "Stripe returns 200 on declined >10k; see gateway/STRIPE-4421"
```

Because the entry is bound to the symbol's identity, it **survives the rename and the file move**. Rename `chargeCard` to `capturePayment`, move it to another module, and the hazard follows it. Six months later:

```bash
asd ledger get payments.capturePayment
```

still returns the hazard, the rationale, and — this is the part that matters most in an incident — the authority behind it.

## Append-only, with a paper trail

The ledger is append-only. You don't edit history; you add to it. A decision can be superseded, but the prior decision remains, so the *evolution* of a symbol's intent is legible. Every entry carries an author (human or agent), a timestamp, and a reason.

That's what makes the ledger trustworthy to an agent. When a fresh session reads `asd ledger get` before touching a symbol, it isn't reading a comment that may or may not still be true — it's reading a dated, attributed record of what was decided and why. And when the decision needs weight behind it, the next layer — ratification — attaches a signed approval, so the entry carries not just a claim but the authority that stands behind it.

The author leaves. The reasoning stays.

*Next week: hash-chained audit for agent-authored code.*
