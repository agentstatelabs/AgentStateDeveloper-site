---
title: Agent Thinking
description: Capture and surface agent reasoning across sessions with asd think.
---

Agent Thinking is ASD's mechanism for making agent reasoning a first-class citizen of the codebase. Instead of dying at the end of a chat session, hypotheses, mental models, dead ends, and open questions are stored in `.asd/v1/`, checked into git, and automatically surfaced by `prepare-change` and `context-for` when a future agent touches the same symbols.

## Why it exists

Every agent session rediscovers the same things: why a particular pattern was chosen, what was tried and failed, what questions are still open. Without a way to record that reasoning, the next agent (or the same agent in a new context window) starts from zero. Agent Thinking closes that loop.

## The five entry types

| Command | Kind | Purpose |
|---|---|---|
| `asd think speculate` | `hypothesis` | Confidence-rated speculation about a symbol |
| `asd think model` | `mental_model` | Structural understanding spanning multiple symbols |
| `asd think failed` | `failed_attempt` | Dead ends — what was tried and why it didn't work |
| `asd think question` | `open_question` | Known unknowns blocking confident action |
| `asd think list` | — | Read back entries by kind or symbol |

### Hypothesis

```bash
asd think speculate payments.refund \
  --conf 0.7 \
  --summary "The audit skip is intentional — refund reversals are reconciled nightly"
```

Confidence is a float from `0.0` to `1.0`. Entries below the floor (default `0.3`) are filtered out of `prepare-change` output — they accumulate in the store but won't clutter the context window until confidence rises.

Re-recording the same `(qname, summary)` pair overwrites the existing entry rather than creating a duplicate.

### Mental model

```bash
asd think model "payments-pipeline" \
  --symbols "payments.charge,payments.audit,payments.gateway" \
  --summary "charge → debit card → audit log → external gateway. Audit is async; gateway is sync."
```

Mental models anchor to the first symbol in the list and are surfaced whenever any of the named symbols appears in a `prepare-change` query.

### Failed attempt

```bash
asd think failed payments.refund \
  --tried "wrap refund in tokio::spawn for async" \
  --because "caller holds a &mut lock; async wrap causes a deadlock at the gateway boundary"
```

Failed attempts are negative evidence. They save the next agent from re-running the same dead end.

### Open question

```bash
asd think question payments.audit \
  --q "Why does refund skip the audit step? The comment says 'see RFC-14' but RFC-14 doesn't exist."
```

Open questions model known unknowns. They surface in `prepare-change` as a signal that the area has unresolved design uncertainty.

### Listing entries

```bash
# All entries for a symbol
asd think list --symbol payments.refund

# Only failed attempts across the whole workspace
asd think list --kind failed

# JSON output for scripting
asd think list --json
```

## MCP tools

The same five operations are available as MCP tools for agents:

| MCP tool | Equivalent CLI |
|---|---|
| `think_speculate` | `asd think speculate` |
| `think_model` | `asd think model` |
| `think_failed` | `asd think failed` |
| `think_question` | `asd think question` |
| `think_list` | `asd think list` |

## Integration with prepare-change

When you run `asd prepare-change` (or the MCP equivalent), any thinking entries associated with the matched symbols are surfaced in the `prior_thinking` block. The output also includes a `thinking_summary` metadata block:

```json
{
  "thinking_summary": {
    "scanned_qnames": 12,
    "matched_for_query": 3,
    "surfaced": 5,
    "by_kind": { "hypothesis": 2, "mental_model": 1, "open_question": 2 },
    "by_kind_dropped": { "hypothesis": 1 }
  }
}
```

`by_kind_dropped` tells you that entries exist but were filtered (e.g., hypotheses below the confidence floor). Pass `--thinking-floor 0.0` to surface everything.

## Bootstrap: starting a new session

When you begin working on an unfamiliar part of the codebase, print the initial-read checklist:

```bash
asd think bootstrap
```

This prints a structured prompt that guides the agent through recording:
1. **Architecture** — 3–7 subsystems as MentalModels
2. **Hot spots** — junction points and God objects
3. **Implicit constraints** — sequencing, concurrency, encoding assumptions
4. **Open questions** — magic numbers, unexplained patterns, dead code
5. **Hypotheses** — confidence-rated speculation
6. **Failed-path warnings** — patterns that look reasonable but don't work

To check whether prior thinking already exists (from a previous session or a teammate):

```bash
asd think bootstrap --check
```

Output example:
```
Inherited thinking   hypothesis: 3  mental_model: 1  failed_attempt: 0  open_question: 2
Your entries         hypothesis: 0  mental_model: 0  failed_attempt: 0  open_question: 0

Missing categories: hypothesis, mental_model, failed_attempt
```

## The embedded prompt

For agents that prefer a single-step kickoff:

```bash
asd think prompt
```

This prints the full initial-read prompt — a structured guide for reading a codebase and recording everything worth knowing. The prompt is embedded in the binary at compile time, so it works from any working directory.

## Deterministic IDs

Every thinking entry gets a Blake3-derived ID: `led_think_<24-char-hash>` of `(intent, qname, summary)`. This makes re-runs idempotent — running the same initial-read pass twice produces the same IDs, so git diffs stay clean.

## Export and sharing

Thinking entries travel with the repo naturally (they're in `.asd/v1/`). For cross-repo sharing or explicit snapshots:

```bash
# Write to .asd/conclusions/
asd conclusions export

# Load from .asd/conclusions/ (runs automatically on git pull via post-merge hook)
asd conclusions import
```
