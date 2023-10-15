import { CollectionConfig } from "payload/types";
import { lexicalRichTextField } from "payload-plugin-lexical";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    defaultColumns: ["title", "author", "category", "tags"],
    useAsTitle: "title",
  },
  access: {
    read: () => true,
    readVersions: () => true,
  },
  versions: {
    drafts: true,
  },
  defaultSort: "-publishedDate",
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "text",
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
    },
    {
      name: "tags",
      type: "relationship",
      relationTo: "tags",
      hasMany: true,
    },
    lexicalRichTextField({
      name: "content",
      label: "Lexical Rich Text Editor",
      required: true,
    }),
  ],
};

export default Posts;
