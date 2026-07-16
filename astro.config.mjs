// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://agentstatedeveloper.dev',
	integrations: [
		starlight({
			title: 'AgentStateDeveloper',
			social: [{ icon: 'gitlab', label: 'GitLab', href: 'https://github.com/agentstatelabs/AgentStateDeveloper' }],
			customCss: ['./src/styles/custom.css'],
			sidebar: [
				{
					label: 'Getting Started',
					items: [
						{ label: 'Introduction', slug: 'guides/introduction' },
						{ label: 'Quick Start', slug: 'guides/quickstart' },
						{ label: 'Concepts', slug: 'guides/concepts' },
					],
				},
				{
					label: 'Capabilities',
					items: [
						{ label: 'Decision Ledger', slug: 'guides/decision-ledger' },
						{ label: 'Effects', slug: 'guides/effects' },
						{ label: 'Call Graph', slug: 'guides/call-graph' },
						{ label: 'Policy', slug: 'guides/policy' },
						{ label: 'Ratification', slug: 'guides/ratification' },
						{ label: 'Audit', slug: 'guides/audit' },
						{ label: 'Agent Thinking', slug: 'guides/agent-thinking' },
					],
				},
				{
					label: 'Surfaces',
					items: [
						{ label: 'CLI (asd)', slug: 'guides/cli' },
						{ label: 'MCP Server (asd-mcp)', slug: 'guides/mcp-server' },
						{ label: 'HTTP & Lens (asd-serve)', slug: 'guides/asd-serve' },
					],
				},
				{
					label: 'Reference',
					items: [
						{ label: 'MCP Tools', slug: 'reference/mcp-tools' },
						{ label: 'CLI ↔ MCP Mapping', slug: 'reference/cli-mcp-mapping' },
					],
				},
			],
		}),
	],
});
