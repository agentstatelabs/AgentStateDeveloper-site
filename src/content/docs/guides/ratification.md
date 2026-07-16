---
title: Ratification
description: Approve, reject, or withdraw ledger entries. Optionally Ed25519-signed.
---

Ledger entries enter the system as proposed. Ratification is the approval workflow: `asd ledger approve <id>` (with optional Ed25519 signature), `asd ledger reject <id>`, `asd ledger withdraw <id>`. The ratification state is part of the ledger entry's identity and travels with it in the sidecar.
