import { ImageResponse } from "@ethercorps/sveltekit-og";
import type { RequestHandler } from "@sveltejs/kit";

const template = (text1 = "swh00tw.dev", text2 = "Personal Blog by Frank Hsu") => `
 <div tw="flex w-full h-full items-center justify-center bg-[#242424] flex-row text-[DM_Sans]">
    <div tw="flex flex-col md:flex-row w-[70%] py-12 px-4 md:items-center justify-between p-8">
      <h2 tw="flex flex-col text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 text-left">
        <span tw="text-white">${text1}</span>
        <span tw="text-[#9f3ae0] mt-4 text-[20px]">${text2}</span>
      </h2>
    </div>
  </div>
`;

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
	const fontDataBold = await getFont(`${url.origin}${dmSans700}`);
	const fontDataMedium = await getFont(`${url.origin}${dmSans500}`);
	const fontDataRegular = await getFont(`${url.origin}${dmSans400}`);
	return await ImageResponse(template(), {
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
	});
};
