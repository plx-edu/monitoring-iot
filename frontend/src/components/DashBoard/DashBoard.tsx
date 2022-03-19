import React, {useEffect, useState} from "react";
import {typeModule} from "../../utilities/types";
import Module from "../Module/Module";

export default function DashBoard() {
	const [items, setItems] = useState<typeModule[]>([]);

	useEffect(() => {
		fetch(`http://localhost:3001/modules`)
			.then((res) => res.json())
			.then((result) => setItems(result));
	}, []);

	return (
		<section className="flex flex-col h-full">
			Modules:
			<section className=" flex flex-row flex-wrap m-1 gap-1">
				{items.map((module) => (
					<Module key={module.id} module={module} />
				))}
			</section>
		</section>
	);
}
