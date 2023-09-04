export const encodePostKey = (title: string) => {
	// make the string all lowercase
	// replace all spaces with dashes
	return title.toLowerCase().replace(/ /g, "-");
};
