import React, {useContext, useEffect, useState} from "react";
import {ModulesContext} from "../../App";
import {apiResource} from "../../utilities/methods";
import {typeModule} from "../../utilities/types";
import Module from "../Module/Module";

export default function DashBoard() {
	// const [items, setItems] = useState<typeModule[]>([]);
	const [items, setItems] = useContext(ModulesContext);

	// useEffect(() => {
	// 	// console.log("dashboard re");

	// 	fetch(apiResource("modules"))
	// 		.then((res) => res.json())
	// 		.then((result) => setItems(result));
	// }, []);

	return (
		<section className="flex flex-col h-full">
			Modules:
			<section className=" flex flex-row flex-wrap justify-center m-1 gap-1">
				{items.map((module: typeModule) => (
					<Module key={module.id} module={module} />
				))}
			</section>
		</section>
	);
}
