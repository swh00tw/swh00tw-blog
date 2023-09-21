import { PUBLIC_FRONTEND_GQL_API_ENDPOINT } from "$env/static/public";

export const getImagePrefix = () =>
	PUBLIC_FRONTEND_GQL_API_ENDPOINT.split("/").slice(0, -2).join("/");
