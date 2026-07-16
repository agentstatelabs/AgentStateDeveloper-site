---
title: Audit
description: Hash-chained JSONL log of every ledger mutation and policy evaluation.
---

Every ledger mutation and policy evaluation is appended to a hash-chained JSONL log. Each entry references the prior entry's hash. `asd audit tail` prints the latest entries; `asd audit verify` walks the chain and confirms it has not been tampered with. The audit log is replayable and independently verifiable.
