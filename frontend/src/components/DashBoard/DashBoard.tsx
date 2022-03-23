import React, {useEffect, useState} from "react";
import {apiResource, msToMins} from "../../utilities/methods";
import {typeModule} from "../../utilities/types";
import Module from "../Module/Module";

// Script interval in minutes
// msToMins(minInterval)
const minInterval = 0.2;
let startScript = false;

export default function DashBoard() {
	const [items, setItems] = useState<typeModule[]>([]);
	const [checkChanges, setCheckChanges] = useState(false);

	useEffect(() => {
		console.log(":: Modules Dashboard ::");

		// Wait before starting script
		const allowScript = setTimeout(() => {
			startScript = true;
		}, 15 * 1000);

		const intervalId = setInterval(() => {
			setCheckChanges((ci) => !ci);
		}, msToMins(minInterval));

		fetchModules();

		return () => {
			clearTimeout(allowScript);
			clearInterval(intervalId);
		};
	}, []);

	useEffect(() => {
		if (!startScript) return;
		fetchModules();
	}, [checkChanges]);

	function fetchModules() {
		fetch(apiResource("modules"))
			.then((res) => res.json())
			.then((result) => setItems(result));
	}

	return (
		<section className="flex flex-col h-full">
			Dashboard:{checkChanges ? "on" : "off"}
			<section className=" flex flex-row flex-wrap justify-center m-1 gap-1">
				{items.map((module: typeModule) => (
					<Module key={module.id} module={module} />
				))}
			</section>
		</section>
	);
}
