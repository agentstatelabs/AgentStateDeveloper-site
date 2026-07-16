---
title: Policy
description: File-backed rules — allow, deny, or require-approval per action and actor kind.
---

Policy is a JSON file (`policy.json`) that allows, denies, or requires-approval per action and actor kind. Example: require-approval on `ledger.append` when `actor_kind == agent` and the symbol matches `payments.*`. Policy is evaluated on every ledger mutation and emitted to the audit stream.
