import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export default defineConfig({
	plugins: [
		sveltekit(),
		{
			name: "image-converter",
			enforce: "pre",
			async buildStart() {
				console.log("🧙‍💫💫💫");
				console.log("image-converter: buildStart");
				const imagePath = path.join(__dirname, "static", "posts");
				console.log(imagePath);
				const files = fs.readdirSync(imagePath);
				const outputDirPath = path.join(__dirname, "static", "posts", "build");
				// if the output directory doesn't exist, create it
				if (!fs.existsSync(outputDirPath)) {
					fs.mkdirSync(outputDirPath);
				}
				for (const file of files) {
					if (!file.endsWith(".webp")) continue;
					console.log(file);
					const webpPath = path.join(imagePath, file);
					const pngPath = path.join(outputDirPath, file.replace(".webp", ".png"));
					// Convert the WebP image to PNG using Sharp
					await sharp(webpPath).toFile(pngPath);
					console.log(`Converted ${webpPath} to ${pngPath}`);
				}
				console.log("image-converter: buildEnd");
				console.log("🧙‍💫💫💫");
			}
		}
	]
});
