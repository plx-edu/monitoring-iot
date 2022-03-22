import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {typeModule} from "../../utilities/types";
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import {getRandNb, getUptime, startInterval} from "../../utilities/methods";

export default function Module(props: {module: typeModule | undefined}) {
	const [uptime, setUptime] = useState("n/a");

	useEffect(() => {
		if (props.module) setUptime(getUptime(props.module.uptime_start));
		// setInterval(() => (props.module ? setUptime(getUptime(props.module?.uptime_start)) : setUptime("n/a")), 5 * 1000);

		setInterval(async () => {
			if (props.module) setUptime(getUptime(props.module.uptime_start));
			// console.log(":::", uptime);
		}, 10 * 1000);
	}, []);
	// }, [props.module]);

	if (props.module === undefined) {
		return <div>Module error.</div>;
	} else {
		return (
			<article
				className={
					"flex flex-col w-40 h-40 rounded overflow-hidden " +
					(props.module.current_state ? "bg-emerald-400" : "bg-red-500")
				}
			>
				{/* <p>id: {props.module.id}</p> */}
				<div className="flex flex-row  justify-between items-center p-1 border-stone-900 border-b">
					<p className="flex">{props.module.current_state ? <AiOutlineCheckCircle /> : <AiOutlineWarning />}</p>
					<NavLink to={`/module/${props.module.id}`} className="flex">
						<p className="font-semibold">{props.module.name}</p>
					</NavLink>
				</div>
				{/* Module id n°{id} */}
				<p className="text-xs capitalize">{props.module.type_ref.name}</p>
				<div className="flex flex-col h-full justify-center items-center">
					<p className="text-4xl font-semibold">
						{props.module.current_value ? props.module.current_value : "n/a"}
						<span className="text-xl font-normal"> {props.module.current_value ? props.module.type_ref.unit : ""}</span>
					</p>
				</div>

				<div className="flex flex-col justify-center items-center">
					<p className="text-xs font-normal">
						Uptime:
						{/* <span className="font-semibold"> {getUptime(props.module.uptime_start)}</span> */}
						<span className="font-semibold"> {uptime}</span>
					</p>
				</div>

				<div className="flex flex-col justify-center items-center">
					<p className="text-xs">
						Location:
						<span className="font-semibold"> {props.module.location}</span>
					</p>
				</div>

				{/* <p>{props.module.created}</p> */}
				{/* <button type="button" onClick={() => console.log(props.module)}>
				Hello
			</button> */}
			</article>
		);
	}
}
