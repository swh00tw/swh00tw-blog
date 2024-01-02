import type { LayoutLoadEvent } from "./$types";
import { dev } from "$app/environment";
import { inject } from "@vercel/analytics";

inject({ mode: dev ? "development" : "production" });

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
