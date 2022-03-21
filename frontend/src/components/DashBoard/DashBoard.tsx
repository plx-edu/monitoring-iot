import React, {useEffect, useState} from "react";
import {apiRequest, apiResource, formatDate, getRandNb, msToMins} from "../../utilities/methods";
import {typeModule} from "../../utilities/types";
import Module from "../Module/Module";

// Script interval in minutes
const minInterval = 30;

export default function DashBoard() {
	const [items, setItems] = useState<typeModule[]>([]);
	const [startScript, setStartScript] = useState(false);

	useEffect(() => {
		// console.log(":: Modules Dashboard ::");

		fetch(apiResource("modules"))
			.then((res) => res.json())
			.then((result) => {
				setItems(result);

				// Wait before starting script
				setTimeout(() => {
					setStartScript(result.length > 0);
				}, 15 * 1000);
			});
	}, []);

	// *Automatic* Script
	useEffect(() => {
		if (items.length <= 0) return;
		// console.log(":: Starting Script ::");

		setInterval(() => {
			const moduleToUpdate = items[getRandNb(0, items.length - 1)];
			// console.log("#", moduleToUpdate);

			// If module is not active, don't do anything :/
			if (!moduleToUpdate.current_state) return;

			const newData = {
				state: {
					current_state: false,
					user_set: false,
				},
				measurement: {
					current_value: getRandNb(0, 50),
				},
			};

			// More chances of updating measurement than failing module state
			const dataToUpdate = getRandNb(1, 100) <= 10 ? newData.state : newData.measurement;
			// console.log("::", newData);

			fetch(apiResource("modules", moduleToUpdate.id), apiRequest("patch", dataToUpdate))
				.then((res) => res.json())
				.then((result) => {
					console.log(formatDate(new Date(Date.now())), result);

					setItems(
						items.map((x) => {
							if (x.id === result.id) return result;
							return x;
						}),
					);
				});
		}, msToMins(minInterval));
	}, [startScript]);

	return (
		<section className="flex flex-col h-full">
			Dashboard:
			<section className=" flex flex-row flex-wrap justify-center m-1 gap-1">
				{items.map((module: typeModule) => (
					<Module key={module.id} module={module} />
				))}
			</section>
		</section>
	);
}
