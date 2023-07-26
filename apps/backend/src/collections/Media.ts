import path from "path";
import type { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(__dirname, "../../media"),
    // Specify the size name that you'd like to use as admin thumbnail
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        height: 800,
        width: 450,
        crop: "center",
        name: "thumbnail",
      },
    ],
  },
  fields: [],
};

export default Media;
