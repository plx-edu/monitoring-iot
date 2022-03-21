import {useEffect, useState} from "react";

export function getNavLinks() {
	return [
		{page: "Home", path: "/"},
		{page: "New Module", path: "/module"},
		// {page: "New Type", path: "/type"},
	];
}

// Placeholder for "unique" randomly generated account number
export function getRandNb(a: number, b: number) {
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

	const options: any = {
		// weekday: "long",
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "numeric",
		minute: "numeric",
		second: "numeric",
		millisecond: "numeric",
		hour12: false,
	};

	// console.log(day, month, year);
	// console.log(d.toLocaleDateString("fr-FR"));
	// return d.toLocaleString();
	// return d.toLocaleDateString("fr-FR");
	// return d.toLocaleString("fr-FR", options);
	return d.toLocaleDateString("fr-FR", options);
}

export function getUptime(startTime: Date) {
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
	// interval in ms
	// 1000 = 1sec
	const seconds = 60 * 1000;
	const interval = minutes * seconds;

	setInterval(() => {
		console.log(getRandNb(0, 20));
	}, interval);
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
