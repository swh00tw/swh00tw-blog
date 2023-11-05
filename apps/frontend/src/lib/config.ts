import { PUBLIC_FRONTEND_ENV } from "$env/static/public";

export const rootUrl =
	PUBLIC_FRONTEND_ENV === "dev" ? "http://localhost:5173" : "https://swh00tw.dev";
