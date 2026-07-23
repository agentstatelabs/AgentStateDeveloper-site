---
title: MCP Server (asd-mcp)
description: stdio MCP server exposing 14+ tools to coding agents.
---

`asd-mcp` is the stdio MCP server. `asd onboard` registers it for you (project-scoped,
in the repo's `.mcp.json`) as its final step — so most users never call this directly.

To register manually, or to write into your agents' global configs, run:

```bash
asd mcp install
```

That writes the `asd-mcp` entry into `mcpServers` for Claude Code, Claude Desktop, and Cursor. Add `--project` to scope it to a single repo's `.mcp.json` instead (this is what `asd onboard` does). Use `asd mcp status` to see which tools are registered. The server reads `ASD_DB` from its environment so agents always connect to the right project.
