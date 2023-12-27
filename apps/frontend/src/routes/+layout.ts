import type { LayoutLoadEvent } from "./$types";

export const config = {
	isr: {
		expiration: 60
	}
};

export async function load({ url }: LayoutLoadEvent) {
	return {
		url: url.pathname
	};
}
