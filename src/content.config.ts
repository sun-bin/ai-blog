import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客文章
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
		}),
});

// 每日新闻
const news = defineCollection({
	loader: glob({ base: './src/content/news', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			source: z.string().optional(),
			tags: z.array(z.string()).optional(),
			heroImage: image().optional(),
		}),
});

// 身边事/生活记录
const life = defineCollection({
	loader: glob({ base: './src/content/life', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			location: z.string().optional(),
			mood: z.string().optional(),
			heroImage: image().optional(),
		}),
});

// 思路记录/想法
const thoughts = defineCollection({
	loader: glob({ base: './src/content/thoughts', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			category: z.string().optional(),
			status: z.enum(['draft', 'published', 'archived']).default('published'),
			heroImage: image().optional(),
		}),
});

// 今日说股
const stocks = defineCollection({
	loader: glob({ base: './src/content/stocks', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().optional(),
			pubDate: z.coerce.date(),
			marketIndex: z.string().optional(),
			topGainers: z.array(z.string()).optional(),
			potential: z.array(z.string()).optional(),
			heroImage: image().optional(),
		}),
});

export const collections = { blog, news, life, thoughts, stocks };
