import { buildConfig } from "payload/config";
import { LexicalPlugin } from "payload-plugin-lexical";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import dotenv from "dotenv";
dotenv.config();
const isDev = process.env["BACKEND_ENV"] === "dev";
const config = buildConfig({
  serverURL: `http${isDev ? "" : "s"}://${isDev ? "localhost" : "0.0.0.0"}:${
    process.env["PORT"] || 3000
  }`,
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users, Media],
  plugins: [LexicalPlugin({})],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});

export default config;
