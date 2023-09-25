import { componentToImageResponse } from "@ethercorps/sveltekit-og";
import type { RequestHandler } from "@sveltejs/kit";
import OG from "$lib/components/OG/index.svelte";

const fontFile = await fetch(
	"https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100;0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800;0,9..40,900;0,9..40,1000;1,9..40,100;1,9..40,200;1,9..40,300;1,9..40,400;1,9..40,500;1,9..40,600;1,9..40,700;1,9..40,800;1,9..40,900;1,9..40,1000&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
);
const fontData: ArrayBuffer = await fontFile.arrayBuffer();

export const GET: RequestHandler = async () => {
	return await componentToImageResponse(
		OG,
		{},
		{
			height: 250,
			width: 500,
			fonts: [
				{
					name: "DM Sans",
					data: fontData,
					weight: 700
				},
				{
					name: "DM Sans",
					data: fontData,
					weight: 400
				},
				{
					name: "DM Sans",
					data: fontData,
					weight: 500
				}
			]
		}
	);
};
