import { z } from "zod";

export const lexicalNodeBaseSchema = z.object({
	direction: z.string().or(z.null()).optional(),
	format: z.number().or(z.string()),
	indent: z.union([z.number(), z.string()]).optional(),
	type: z.string(),
	version: z.number(),
	style: z.string().optional(),
	mode: z.string().optional(),
	text: z.string().optional()
});

export type LexicalNode = z.infer<typeof lexicalNodeBaseSchema> & {
	children?: LexicalNode[];
};

export const lexicalNodeSchema: z.ZodType<LexicalNode> = lexicalNodeBaseSchema.extend({
	children: z.lazy(() => lexicalNodeSchema.array().optional())
});

export const lexicalRootSchema = z.object({
	type: z.string(),
	format: z.string(),
	indent: z.number(),
	version: z.number(),
	children: z.array(lexicalNodeSchema)
});

export const jsonContentSchema = z.object({
	root: lexicalRootSchema
});
export type JsonContent = z.infer<typeof jsonContentSchema>;
