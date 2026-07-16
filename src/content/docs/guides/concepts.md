---
title: Concepts
description: Core concepts — symbols, ledger entries, effects, ratification, sidecar.
---

ASD models a codebase as a graph of **symbols** (functions, methods, classes). Each symbol can carry **ledger entries** (decisions, hazards, rationale), **effect declarations** (17 categories like `io.fs.read`, propagated transitively), and edges in the **call graph**.

Ledger entries are append-only and ratified through an approval workflow. The live database is `.asd-state.db` (gitignored); the human-authored subset is mirrored into `.asd/v1/` (tracked) by the **sidecar**, so the context travels with the repo.
