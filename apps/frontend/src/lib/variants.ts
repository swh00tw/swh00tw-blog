import { cva } from "class-variance-authority";

export const textVariant = cva(["font-dmSans"], {
	variants: {
		size: {
			heading: ["font-workSans", "text-[32px]", "font-bold"],
			subheading: ["font-workSans", "text-[24px]", "font-medium"],
			body: ["text-[18px]"],
			h1: ["text-[32px]", "font-bold"],
			h2: ["text-[30px]", "font-bold"],
			h3: ["text-[24px]", "font-bold"],
			h4: ["text-[16px]"],
			h5: ["text-[13.28px]"],
			h6: ["text-[12px]"]
		}
	},
	defaultVariants: {
		size: "body"
	}
});
