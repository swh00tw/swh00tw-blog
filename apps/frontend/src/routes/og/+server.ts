import { ImageResponse } from "@ethercorps/sveltekit-og";
import type { RequestHandler } from "@sveltejs/kit";
import dmSans700 from "$lib/fonts/DM_Sans/static/DMSans-Bold.ttf";
import dmSans500 from "$lib/fonts/DM_Sans/static/DMSans-Medium.ttf";
import dmSans400 from "$lib/fonts/DM_Sans/static/DMSans-Regular.ttf";
import notoSans700 from "$lib/fonts/Noto_Sans_TC/static/NotoSansTC-Bold.ttf";
import notoSans500 from "$lib/fonts/Noto_Sans_TC/static/NotoSansTC-Medium.ttf";
import notoSans400 from "$lib/fonts/Noto_Sans_TC/static/NotoSansTC-Regular.ttf";
import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

const template = (props: { title?: string; desc?: string; image: string }) => {
	const { title, desc, image } = props;
	return `
  <div tw="flex w-full h-full items-center justify-center bg-[#242424] flex-row text-['DM Sans']">
    <img src="${image}" alt="og" width="1200" height="675" tw="absolute inset-0 z-[-2]" />
    <div tw="bg-[#00000099] absolute w-full h-full z-[-1] flex" />
    <div tw="flex flex-col w-[60%] text-white">
      <p tw="text-[48px] font-bold">${title}</p>
      <div tw="flex flex-row gap-4 items-center">
        <p tw="text-[24px] font-medium">${desc}</p>
        <div tw="h-[26px] w-[2px] bg-white mx-4 flex" />
        <p tw="text-[18px] font-medium"> swh00tw.dev </p>
      </div>
    </div>
  </div>
`;
};

const fontMemo: Record<string, ArrayBuffer> = {};

async function getFont(path: string): Promise<ArrayBuffer> {
	if (fontMemo[path]) return fontMemo[path];
	const result = await fetch(path).then((r) => r.arrayBuffer());
	fontMemo[path] = result;
	return result;
}

function webp2PngPath(url: string | null) {
	if (!url) return null;
	// split by slash
	const parts = url.split("/");
	// insert build after posts
	parts.splice(1, 0, "build");
	// replace webp with png
	parts[parts.length - 1] = parts[parts.length - 1].replace(".webp", ".png");
	// join back
	return parts.join("/");
}

export const GET: RequestHandler = async (event) => {
	const { url } = event;
	const query = url.searchParams;
	console.log(query.get("title"));
	console.log(query.get("desc"));
	console.log(query.get("image"));
	const dmSansBold = await getFont(`${url.origin}${dmSans700}`);
	const dmSansMedium = await getFont(`${url.origin}${dmSans500}`);
	const notoSansBold = await getFont(`${url.origin}${notoSans700}`);
	const notoSansMedium = await getFont(`${url.origin}${notoSans500}`);
	const imagePathPrefix =
		PUBLIC_FRONTEND_ENV === "dev" ? "http://localhost:5173/" : "https://swh00tw.dev/";
	const fallbackImage = imagePathPrefix + "posts/og.png";
	const imagePath = imagePathPrefix + webp2PngPath(query.get?.("image"));

	return await ImageResponse(
		template({
			title: query.get?.("title") ?? "Blog by Frank Hsu",
			desc: query.get?.("desc") ?? (query.get?.("title") ? "Blog by Frank Hsu" : "Web Dev / Life"),
			image: query.get?.("image") ? imagePath : fallbackImage
		}),
		{
			height: 630,
			width: 1200,
			fonts: [
				{
					name: "DM Sans",
					data: dmSansBold,
					weight: 700
				},
				{
					name: "DM Sans",
					data: dmSansMedium,
					weight: 500
				},
				// {
				// 	name: "DM Sans",
				// 	data: dmSansRegular,
				// 	weight: 400
				// }
				{
					name: "Noto Sans TC",
					data: notoSansBold,
					weight: 700
				},
				{
					name: "Noto Sans TC",
					data: notoSansMedium,
					weight: 500
				}
				// {
				// 	name: "Noto Sans TC",
				// 	data: notoSansRegular,
				// 	weight: 400
				// }
			]
		}
	);
};
