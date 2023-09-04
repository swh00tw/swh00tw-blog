export const getDateString = (date: string) => {
	const dateObj = new Date(date);
	const dateTimeFormat = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	});
	return dateTimeFormat.format(dateObj);
};
