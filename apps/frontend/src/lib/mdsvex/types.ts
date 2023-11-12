import { z } from "zod";

export const postSchema = z.object({
	title: z.string(),
	slug: z.string(),
	description: z.string(),
	publishedAt: z.string(),
	tags: z.array(z.string()),
	published: z.boolean(),
	coverImgSrc: z.string(),
	backgroundImgSrc: z.string().optional(),
	lang: z.union([z.literal("en"), z.literal("zh")])
});

export type Post = z.infer<typeof postSchema>;
