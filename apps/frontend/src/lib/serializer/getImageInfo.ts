import type { LexicalNode } from "./types";
import { lexicalRootSchema } from "./types";
import { getImagePrefix } from "../getImagePrefix";
import { z } from "zod";

export const imageNodeSchema = z
	.object({
		caption: z
			.object({
				editorState: z
					.object({
						root: lexicalRootSchema
					})
					.passthrough()
			})
			.passthrough(),
		data: z
			.object({
				url: z.string()
			})
			.passthrough()
	})
	.passthrough();

interface ImageInfo {
	url: string;
}

export function getImageInfo(node: LexicalNode): ImageInfo | undefined {
	const res = imageNodeSchema.safeParse(node);
	if (!res.success) {
		return undefined;
	}
	return {
		url: getImagePrefix() + res.data.data.url
	};
}
