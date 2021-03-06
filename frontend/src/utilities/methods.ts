export function getNavLinks() {
	return [
		{page: "Home", path: "/"},
		{page: "New Module", path: "/module"},
		{page: "New Type", path: "/type"},
	];
}

// Placeholder for "unique" randomly generated account number
export function getRandNb(a: number, b: number) {
	const min = a < b ? a : b;
	const max = a > b ? a : b;

	// console.log(Math.floor(Math.random() * (max - min + 1) + min));
	return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandName(type: string) {
	const vowels = ["a", "e", "i", "o", "u"];
	let name = type.substring(0, 1).toUpperCase();

	for (const k of type.substring(1)) {
		if (name.length < 3) name += !vowels.includes(k.toLowerCase()) ? k.toUpperCase() : "";
	}
	// get random letter from number(ascii code)
	const randLetter = String.fromCharCode(getRandNb(97, 122));
	name += "-" + getRandNb(100, 999) + randLetter;
	// console.log(name);

	return name;
}

export function formatDate(date: Date) {
	const d = new Date(date);

	const options: any = {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		millisecond: "numeric",
		hour12: false,
	};

	return d.toLocaleDateString("fr-FR", options);
}

export function getUptime(startTime: Date | null) {
	if (!startTime) return "n/a";

	let t = Date.now() - new Date(startTime).getTime();

	const ms = t % 1000;
	t = (t - ms) / 1000;

	const secs = t % 60;
	t = (t - secs) / 60;

	const mins = t % 60;
	const hours = (t - mins) / 60;

	return hours + "h" + mins + "min" + secs + "s";
	// return hours + "h" + mins + "min" + secs + "s" + ms + "ms";
}

export function getModuleName() {
	console.log("random name generator");
	// useEffect(() => {
	// 	console.log("suedfe");
	// }, []);
}

export async function startInterval(minutes: number) {
	setInterval(() => {
		console.log(getRandNb(0, 20));
		getRandNb(0, 20);
	}, msToMins(minutes));
}

export function msToMins(minutes: number) {
	// 1000ms = 1sec
	return minutes * (60 * 1000);
}

export function apiResource(resource: string, id?: number | string) {
	// const methodsAllowed = ["get", "post", "patch", "delete"];
	// if (!methodsAllowed.includes(method.toLowerCase())) return;

	return `http://localhost:3001/${resource}/${id ? id : ""}`;
}

export function apiRequest(method: string, body?: any) {
	const methodsAllowed = ["post", "patch", "delete"];
	method = method.toUpperCase();

	if (!methodsAllowed.includes(method.toLowerCase())) return;

	if (method === "DELETE") {
		return {
			method: method,
		};
	} else {
		return {
			headers: {
				"Content-Type": "application/json",
			},
			method: method,
			body: JSON.stringify(body),
		};
	}
}
