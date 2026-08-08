import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
	blog: defineCollection({
		loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
		schema: z.object({
			title: z.string(),
			description: z.string(),
			// Publish date. An article is shown once this date is on/before the
			// current date (client-side JS) or the build date (static / SEO).
			date: z.coerce.date(),
			author: z.string().default('The ASD team'),
			// Per-article accent color used on the index + article page.
			color: z.enum(['purple', 'green', 'amber', 'blue', 'pink', 'cyan']).default('purple'),
		}),
	}),
};
