import { ImageResponse } from "@ethercorps/sveltekit-og";
import type { RequestHandler } from "@sveltejs/kit";

const template = (props: { title?: string; desc?: string }) => {
	const { title, desc } = props;
	return `
 <div tw="flex w-full h-full items-center justify-between bg-[#242424] flex-row text-[DM_Sans] px-12">
    <div tw="flex flex-col w-[50%] py-12 justify-between">
      <h2 tw="flex flex-col text-3xl text-gray-900 text-left">
        <span tw="text-white font-bold">swh00tw.dev</span>
        <span tw="text-[#9f3ae0] mt-4 text-[20px]">${title}</span>
        <span tw="text-[14px] mt-4 text-[#bbbbbb80]">${desc}</span>
      </h2>
    </div>
    <div tw="flex w-[40%] justify-center">
      <img src="https://imgur.com/Rz101jA.png" width="150" height="150" tw="rounded-full" />
    </div>
  </div>
`;
};

import dmSans700 from "$lib/fonts/DM_Sans/static/DMSans-Bold.ttf";
import dmSans500 from "$lib/fonts/DM_Sans/static/DMSans-Medium.ttf";
import dmSans400 from "$lib/fonts/DM_Sans/static/DMSans-Regular.ttf";

const fontMemo = {};

async function getFont(path: string): Promise<ArrayBuffer> {
	if (fontMemo[path]) return fontMemo[path];
	const result = await fetch(path).then((r) => r.arrayBuffer());
	fontMemo[path] = result;
	return result;
}

export const GET: RequestHandler = async (event) => {
	const { url } = event;
	const query = url.searchParams;
	console.log(query.get("title"));
	console.log(query.get("desc"));
	const fontDataBold = await getFont(`${url.origin}${dmSans700}`);
	const fontDataMedium = await getFont(`${url.origin}${dmSans500}`);
	const fontDataRegular = await getFont(`${url.origin}${dmSans400}`);
	return await ImageResponse(
		template({
			title: query.get?.("title") ?? "Personal Blog by Frank Hsu",
			desc: query.get?.("desc") ?? "Web Dev / UI / UX / Life"
		}),
		{
			height: 250,
			width: 500,
			fonts: [
				{
					name: "DM Sans",
					data: fontDataBold,
					weight: 700
				},
				{
					name: "DM Sans",
					data: fontDataMedium,
					weight: 500
				},
				{
					name: "DM Sans",
					data: fontDataRegular,
					weight: 400
				}
			]
		}
	);
};
