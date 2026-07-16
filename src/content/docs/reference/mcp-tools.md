---
title: MCP Tools
description: 19+ MCP tools exposed by asd-mcp.
---

Agents access ASD through 19+ MCP tools organized by category.

## Code navigation

| Tool | Description |
|---|---|
| `code_query` | Search the semantic index by symbol name or pattern |
| `code_read` | Read a symbol's source with surrounding context |
| `code_search` | Full-text search across the indexed codebase |
| `callers_of` | Return all callers of a symbol (inbound edges) |
| `callees_of` | Return all callees of a symbol (outbound edges) |

## Decision ledger

| Tool | Description |
|---|---|
| `ledger_get` | Get all entries for a symbol |
| `ledger_find` | Search entries by tag, text, or kind |
| `ledger_append` | Append a new entry (decision, hazard, rationale, constraint) |
| `ledger_approve` | Approve a pending entry |
| `ledger_reject` | Reject a pending entry |
| `ledger_withdraw` | Withdraw an entry |
| `ledger_supersede` | Replace an entry with a new one |
| `ledger_rebind` | Re-attach an entry to a new qname (after a rename) |

## Effects and call graph

| Tool | Description |
|---|---|
| `effect_declare` | Declare an effect on a symbol |
| `effects_of` | Get declared effects for a symbol |
| `traces_of` | Get the transitive effect trace for a symbol |

## Agent thinking

| Tool | Description |
|---|---|
| `think_speculate` | Record a hypothesis with a confidence score |
| `think_model` | Record a mental model spanning multiple symbols |
| `think_failed` | Record a failed attempt (what was tried, why it failed) |
| `think_question` | Record an open question blocking confident action |
| `think_list` | List thinking entries, filtered by kind or symbol |

## Housekeeping

| Tool | Description |
|---|---|
| `health` | Check index freshness and server status |
| `reindex` | Trigger a full reindex of the workspace |
| `audit_tail` | Stream recent audit events |
| `audit_verify` | Verify the hash chain of the audit log |
