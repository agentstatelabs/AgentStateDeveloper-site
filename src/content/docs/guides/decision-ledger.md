---
title: Decision Ledger
description: Append, query, approve, reject, and withdraw decisions attached to any symbol.
---

The decision ledger lets agents and humans attach structured records to any symbol: `decision`, `hazard`, `rationale`, `constraint`. Each entry carries a kind, summary, author, timestamp, and an approval state. Entries survive renames via symbol identity rebinding.

Commands: `asd ledger append`, `asd ledger get`, `asd ledger approve`, `asd ledger reject`, `asd ledger withdraw`, `asd ledger supersede`.
