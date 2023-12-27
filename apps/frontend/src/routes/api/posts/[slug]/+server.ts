import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { db } from "$lib/supabaseClient";
import { admin } from "@/lib/supabaseAdmin";

export const GET: RequestHandler = async ({ params }) => {
	const slug = params.slug;
	const { data, error: dbError } = await db.from("posts").select().eq("slug", slug).limit(1);
	if (dbError) {
		error(404, {
			message: `Record with slug=${slug} not found in db.posts table`
		});
	}

	if (data.length === 0) {
		// create new record in db.posts table
		const { error: insertError } = await admin.from("posts").insert({ slug, viewers: 1 });
		if (insertError) {
			error(500, {
				message: `Failed to create new record with slug=${slug} in db.posts table`
			});
		}
		return json({
			viewers: 1
		});
	}

	// update existing record in db.posts table
	const viewerCount = data[0].viewers;
	const { error: updateError } = await admin
		.from("posts")
		.update({ viewers: viewerCount + 1 })
		.eq("slug", slug);
	if (updateError) {
		error(500, {
			message: `Failed to update viewer count for slug=${slug}`
		});
	}
	return json({
		viewers: viewerCount + 1
	});
};
