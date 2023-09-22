import { buildConfig } from "payload/config";
import { LexicalPlugin } from "payload-plugin-lexical";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { s3Adapter } from "@payloadcms/plugin-cloud-storage/s3";
import path from "path";
import Categories from "./collections/Categories";
import Posts from "./collections/Posts";
import Tags from "./collections/Tags";
import Users from "./collections/Users";
import Media from "./collections/Media";
import dotenv from "dotenv";
dotenv.config();

const adapter = s3Adapter({
  config: {
    region: process.env["S3_REGION"],
    credentials: {
      accessKeyId: process.env["S3_ACCESS_KEY_ID"],
      secretAccessKey: process.env["S3_SECRET_ACCESS_KEY"],
    },
  },
  bucket: process.env["S3_BUCKET"],
});

const config = buildConfig({
  admin: {
    user: Users.slug,
  },
  collections: [Categories, Posts, Tags, Users, Media],
  plugins: [
    LexicalPlugin({}),
    cloudStorage({
      collections: {
        media: {
          adapter: adapter,
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
});

export default config;
