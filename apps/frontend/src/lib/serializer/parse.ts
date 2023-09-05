import { lexicalNodeSchema, jsonContentSchema } from "./types";

export function parseJson(json: unknown) {
	return jsonContentSchema.safeParse(json);
}

export function parseNode(node: unknown) {
	return lexicalNodeSchema.safeParse(node);
}
