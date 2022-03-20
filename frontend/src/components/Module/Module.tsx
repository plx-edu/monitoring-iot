import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {typeModule} from "../../utilities/types";
import {AiOutlineCheckCircle, AiOutlineWarning} from "react-icons/ai";
import {NavLink} from "react-router-dom";
import {getUptime} from "../../utilities/methods";

export default function Module(props: {module: typeModule}) {
	const {id} = useParams();
	// const [module, setModule] = useState(null);

	// useEffect(() => {
	// 	fetch(`http://localhost:3001/modules/1`)
	// 		.then((res) => res.json())
	// 		.then((result) => console.log(result));
	// }, []);

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
			<div className="flex h-full justify-center items-center">
				<p className="text-4xl font-semibold">{props.module.current_value ? props.module.current_value : "n/a"}</p>
				<p>type: {props.module.type}</p>
			</div>

			<div className="flex flex-col justify-center items-center">
				<p>
					<span className="text-xs">Uptime: </span>
					{getUptime(new Date(props.module.created))}
				</p>
			</div>

			<div className="flex flex-col justify-center items-center">
				<p>
					<span className="text-xs">Location: </span>
					{props.module.location}
				</p>
			</div>

			{/* <p>{props.module.created}</p> */}
			{/* <button type="button" onClick={() => console.log(props.module)}>
				Hello
			</button> */}
		</article>
	);
}