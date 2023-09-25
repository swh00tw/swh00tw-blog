import path from "path";
import type { CollectionConfig } from "payload/types";

const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
  },
  upload: {
    staticDir: path.resolve(__dirname, "../../media"),
    staticURL: "/media",
    disableLocalStorage: true,
    // Specify the size name that you'd like to use as admin thumbnail
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        height: 144,
        width: 256,
        crop: "center",
        name: "thumbnail",
      },
      {
        height: 900,
        width: 1600,
        crop: "center",
        name: "background",
      },
    ],
  },
  fields: [],
};

export default Media;
