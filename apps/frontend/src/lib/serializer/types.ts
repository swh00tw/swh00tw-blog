import { z } from "zod";

const linkAttributesSchema = z
	.object({
		url: z.string().optional()
	})
	.passthrough();

export const lexicalNodeBaseSchema = z
	.object({
		direction: z.string().or(z.null()).optional(),
		format: z.number().or(z.string()),
		indent: z.union([z.number(), z.string()]).optional(),
		type: z.string(),
		version: z.number(),
		style: z.string().optional(),
		mode: z.string().optional(),
		text: z.string().optional(),
		// hacky fix for https://github.com/AlessioGr/payload-plugin-lexical/blob/21a8235fdacf745d7d14afc07d92a7b3c1bb5bd8/serialize-example/ReactSerializer.tsx
		checked: z.boolean().optional(),
		listType: z.string().optional(),
		// svelte+ts specific workarounds
		tag: z.string().optional(),
		attributes: linkAttributesSchema.optional()
	})
	.passthrough();

export type LexicalNode = z.infer<typeof lexicalNodeBaseSchema> & {
	children?: LexicalNode[];
	[other: string]: unknown;
};

export const lexicalNodeSchema: z.ZodType<LexicalNode> = lexicalNodeBaseSchema
	.extend({
		children: z.lazy(() => lexicalNodeSchema.array().optional())
	})
	.passthrough();

export const lexicalRootSchema = z
	.object({
		type: z.string(),
		format: z.string(),
		indent: z.number(),
		version: z.number(),
		children: z.array(lexicalNodeSchema)
	})
	.passthrough();

export const jsonContentSchema = z
	.object({
		root: lexicalRootSchema
	})
	.passthrough();
export type JsonContent = z.infer<typeof jsonContentSchema>;
