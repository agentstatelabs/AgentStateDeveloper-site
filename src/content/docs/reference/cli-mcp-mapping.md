---
title: CLI ↔ MCP Mapping
description: Canonical mapping between MCP tool names and CLI commands.
---

ASD has two surfaces with two naming conventions. MCP uses a flat namespace (`ledger_append`, `code_search`) so tools do not collide with other MCP servers; the CLI nests (`asd ledger append`, `asd search`). Both forms work on the CLI via clap aliases.

The canonical mapping table lives in `docs/mcp-cli-mapping.md` in the repo.
