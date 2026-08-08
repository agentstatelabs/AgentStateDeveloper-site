---
title: The diff isn't enough for agents
description: A diff tells you what changed. It never tells you why the code exists, what it touches, or who approved it — and that's exactly the context an agent needs.
date: 2026-08-07
color: purple
---

Open any pull request and you get a diff: lines added, lines removed. For a human reviewer who was in the room for the design discussion, that's often enough. For a coding agent opening the file cold six months later, it's almost nothing.

The diff answers *what* changed. It's silent on the three questions that actually decide whether a change is safe:

- **Why does this code exist?** The retry loop with the odd back-off, the guard clause that looks redundant — are they load-bearing or vestigial?
- **What does it touch?** Does this function read from disk, hit the database, call an external API — including transitively, through everything it calls?
- **Who approved the last change here?** Was the current behavior a deliberate decision, or an accident nobody caught?

## Where that context goes to die

Today the answers live everywhere except the code. A Slack thread. A PR description. The model's context window for exactly one session. None of it survives a rename, a file move, or the original author leaving. The next agent inherits the code and none of the decisions — so it re-derives choices that were already settled, refactors patterns that were deliberate, and touches code paths no one meant it to.

As more of a codebase is authored by agents, the gap widens. Agents are fast at producing code and blind to the accumulated intent around it. Throughput stops being the bottleneck; *context* becomes the bottleneck.

## Putting the context next to the code

AgentStateDeveloper's premise is simple: the context has to live with the code, in a form both agents and humans can query. ASD gives every function a **decision ledger**, an **effect declaration**, and a place in a **call graph** — checked into git, travelling with every clone.

```bash
asd ledger get payments.chargeCard
```

That command returns the hazards, the rationale, and the authority behind a symbol — the reasoning that survived the rename and the file move. Before an agent edits, it can ask what a function touches and who signed off on the last change, instead of guessing from the diff.

The diff will always be part of the story. It just isn't the whole story — and for an agent working without the human context, the rest of the story is the part that matters.

*This is the first post in a series on keeping agent-authored code accountable. Next week: how effect propagation gives an agent the blast radius before it changes a line.*
