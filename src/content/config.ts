import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/blog" }),
    schema: z.object({
        title: z.string(),
        date: z.date(),
        description: z.string().optional(),
        tags: z.array(z.string()).optional(),
    }),
});

const project = defineCollection({
    loader: glob({ pattern: "**/*.mdx", base: "./src/content/project" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        featured: z.boolean().default(false),
        tech: z.array(z.string()),
        links: z.object({
            github: z.string().optional(),
            demo: z.string().optional(),
            paper: z.string().optional(),
            docs: z.string().optional(),
        }),
        achievements: z.array(z.string()),
        category: z.string(),
    }),
});

export const collections = { blog, project };