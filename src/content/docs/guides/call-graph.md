---
title: Call Graph
description: Intra- and cross-module edges, used to propagate effects and answer impact queries.
---

ASD's tree-sitter pass builds a call graph across 9 languages. Edges are intra- and cross-module. Use `asd callers_of` and `asd callees_of` to walk the graph. Effects propagate along graph edges automatically — change a leaf, and the inherited effect set on its callers updates on the next `asd index`.
