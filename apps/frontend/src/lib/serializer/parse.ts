import { lexicalNodeSchema, jsonContentSchema } from "./types";
import { goto } from "$app/navigation";

export function parseJson(json: unknown) {
	const res = jsonContentSchema.safeParse(json);
	if (!res.success) {
		// handle error
		goto("/", { replaceState: true });
		throw new Error("Invalid JSON");
	}
	return res.data;
}

export function parseNode(node: unknown) {
	const res = lexicalNodeSchema.safeParse(node);
	if (!res.success) {
		// handle error
		goto("/", { replaceState: true });
		throw new Error("Invalid JSON");
	}
	return res.data;
}
