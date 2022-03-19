export function getNavLinks() {
	return [
		{page: "Home", path: "/"},
		{page: "New Module", path: "/module"},
	];
}

// Placeholder for "unique" randomly generated account number
export function getRandNb(a: number, b: number) {
	// const min = 1000;
	// const max = 9999;

	const min = a < b ? a : b;
	const max = a > b ? a : b;

	// console.log(Math.floor(Math.random() * (max - min + 1) + min));
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function formatDate(date: Date) {
	const d = new Date(date);
	const day = d.getUTCDate();
	const month = d.getUTCMonth() + 1;
	const year = d.getUTCFullYear();

	// console.log(day, month, year);
	// console.log(d.toLocaleDateString("fr-FR"));
	return d.toLocaleDateString("fr-FR");
}

export function getUptime(startTime: Date) {
	// console.log(startTime);
	let uptime = Date.now() - startTime.getTime();

	const ms = uptime % 1000;
	uptime = (uptime - ms) / 1000;

	const secs = uptime % 60;
	uptime = (uptime - secs) / 60;

	const mins = uptime % 60;
	const hours = (uptime - mins) / 60;

	return hours + "h" + mins + "min" + secs + "s";
	// return hours + "h" + mins + "min" + secs + "s" + ms + "ms";
}
