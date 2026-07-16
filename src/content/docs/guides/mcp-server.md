---
title: MCP Server (asd-mcp)
description: stdio MCP server exposing 14+ tools to coding agents.
---

`asd-mcp` is the stdio MCP server. Register it everywhere with:

```bash
asd mcp install
```

That writes the `asd-mcp` entry into `mcpServers` for Claude Code, Claude Desktop, and Cursor. Use `asd mcp status` to see which tools are registered. The server reads `ASD_DB` from its environment so agents always connect to the right project.
