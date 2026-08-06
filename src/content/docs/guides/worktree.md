---
title: Parallel agents — worktrees
description: Plan-scoped git worktrees so parallel agents get isolated files and HEAD without clobbering each other.
---

`asd worktree` gives each unit of work its own git worktree and a
`plan/<name>` branch. Parallel agents then get **isolated files and HEAD** —
they can't clobber each other's working tree — while still sharing project
context through the ASD sidecar and (if you use it) the CTXone hub. It mirrors
`ctx worktree` in CTXone.

## Lifecycle

```bash
asd worktree start <plan>            # add ../<repo>-wt-<plan> on plan/<plan>
# open your agent session in that directory and work there
asd worktree list                    # this repo's plan-scoped worktrees and clones
asd worktree finish <plan> --push    # merge back, push, then tear down
```

- **`start <plan>`** creates `../<repo>-wt-<plan>` on a fresh `plan/<plan>`
  branch and prints its path. New worktrees auto-enable the repo's `.githooks`.
- **`list`** recovers the plan ↔ worktree binding from `git worktree list`.
- **`finish <plan>`** merges the plan's branch back and, by default, tears the
  worktree down (force-remove + delete branch + prune). `--keep` merges without
  teardown; `--push` pushes the merged branch.

## Options

- `--from <ref>` — branch the worktree from a ref other than `main`.
- `--shared-target` — share one Rust build cache across worktrees by pointing
  `target-dir` at `<repo>/.wt-target`, avoiding a multi-GB `target/` per tree.
- `--clone` — isolate via a fresh clone with its own `.git`
  (`../<repo>-clone-<plan>`) instead of a worktree, for remote/cloud agents on
  another machine; merge-back happens over `origin` rather than a local merge.

## When to use it

Reach for a worktree whenever two or more agents (or you and an agent) work the
same repo at once, or when a long-running task shouldn't block other edits.
Each worktree is a clean, isolated checkout — no stashing, no branch-switch
churn, no half-applied edits leaking between tasks.
