---
title: Effects
description: 17 effect categories declared per symbol and propagated transitively.
---

Every symbol can declare an effect — for example `io.fs.read`, `io.net.out`, `io.db.write`. Declared effects propagate transitively through the call graph: a function that calls something with `io.db.write` inherits `io.db.write`.

Use `asd effects_of <symbol>` to see the full effect set with provenance (declared vs. transitive). Use `asd effect_declare` to add a declaration.
