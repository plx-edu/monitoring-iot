import React, {useEffect, useState} from "react";
import {apiRequest, apiResource, formatDate, getRandNb, msToMins} from "../../utilities/methods";
import {typeModule} from "../../utilities/types";
import Module from "../Module/Module";

// Script interval in minutes
// msToMins(minInterval)
const minInterval = 0.2;

export default function DashBoard() {
	const [items, setItems] = useState<typeModule[]>([]);
	const [startScript, setStartScript] = useState(false);
	const [changeInterval, setChangeInterval] = useState(false);

	useEffect(() => {
		console.log(":: Modules Dashboard ::");
		const intervalId = setInterval(() => {
			setChangeInterval((ci) => !ci);
		}, msToMins(minInterval));

		fetch(apiResource("modules"))
			.then((res) => res.json())
			.then((result) => {
				setItems(result);

				// Wait before starting script
				setTimeout(() => {
					setStartScript(result.length > 0);
				}, 15 * 1000);
			});

		return () => clearInterval(intervalId);
	}, []);

	/*
	// *Automatic* Script
	useEffect(() => {
	}, [startScript]);
*/

	useEffect(() => {
		console.log(changeInterval ? "console" : "logged", items.length);

		// return () => {
		// 	second
		// }
	}, [changeInterval]);

	// function random

	return (
		<section className="flex flex-col h-full">
			Dashboard:{changeInterval ? "on" : "off"}
			<section className=" flex flex-row flex-wrap justify-center m-1 gap-1">
				{items.map((module: typeModule) => (
					<Module key={module.id} module={module} />
				))}
			</section>
		</section>
	);
}
