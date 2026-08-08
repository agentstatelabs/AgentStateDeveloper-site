---
title: "Effects, propagated: the blast radius before you edit"
description: Seventeen effect categories, declared per symbol and pushed transitively through the call graph, so an agent knows what a change reaches before it makes it.
date: 2026-08-14
color: green
---

Ask a coding agent to refactor `processOrder` and the first honest answer should be a question: *what does this actually touch?* Does it write to the database? Post to an external API? Read a config file off disk? And not just directly — through everything it calls, and everything those call.

Without that map, an agent is refactoring blind. It might turn a synchronous write into a batched one without realizing a downstream caller depends on the write having already happened. The blast radius is invisible until something breaks.

## Effects are declarations, propagated

ASD models side effects as **17 categories** — `io.fs.read`, `io.db.write`, `io.net.out`, `io.queue.publish`, and so on. Each is *declared* on the symbol that performs it. Then the important part: effects **propagate transitively through the call graph**. A function that calls something with `io.db.write` inherits `io.db.write`, annotated with where it came from.

```bash
asd effects_of processOrder
```

```
io.db.write      via orders.persist        — writes orders table in a txn
io.net.out       via payments.chargeCard    — HTTPS POST to Stripe
io.fs.read        via config.load           — reads payments.toml
io.queue.publish  via notify.send           — order.placed → NATS
4 effect categories · 3 transitive · policy: pass
```

The agent now knows: this "simple" order function reaches the database, an external payment gateway, the filesystem, and a message queue — and it knows *which callee* introduces each one. That's the blast radius, computed rather than guessed.

## Declared vs. transitive is the useful distinction

Every effect in the set carries its provenance. A **declared** effect is one this symbol performs directly; a **transitive** effect is inherited from something it calls. That distinction is what lets an agent reason about a change: if you're editing `processOrder` itself, the declared effects are yours to change; the transitive ones are contracts with your callees.

It's also what makes policy meaningful. A gate that says "any change touching `io.net.out` in the payments path needs review" can only fire if the effect set is complete — including the transitive `io.net.out` three calls deep. Propagation is what turns a pile of per-symbol annotations into an answer you can actually gate on.

*Next week: a decision ledger that outlives the author.*
