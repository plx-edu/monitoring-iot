import React, {useEffect, useState} from "react";
import {AiFillCloseSquare} from "react-icons/ai";
import {apiResource} from "../../utilities/methods";

export default function ModuleForm() {
	const [type, setType] = useState(0);
	const [name, setName] = useState("");
	const [currentState, setCurrentState] = useState(false);
	const [location, setLocation] = useState("");

	useEffect(() => {
		fetch(apiResource("types"))
			.then((res) => res.json())
			.then((result) => {
				// setTypes(result);
			});
	}, []);

	function handleSubmit() {
		console.log("submitting form");
	}

	function clearForm() {
		// console.log("clearing form");
		setType(0);
		setName("");
		setLocation("");
	}

	return (
		<section className="flex flex-col w-80 gap-2 m-auto mt-2 p-2 border-2 border-zinc-500">
			<p className="flex justify-center bg-zinc-800 text-white">New Module</p>
			<section className="flex flex-col gap-2">
				<p className="p-1 bg-zinc-400">
					Name: <span className="font-semibold">{name ? name : "Module Name"}</span>
					{/* onChange={(e) => setLocation(e.target.value)} */}
				</p>
				<input
					className=" p-1"
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Location (ex: Vehicle/City/etc.)"
				/>
				<select className="">
					<option value="0">Select Type</option>

					{
						// <option key={} value={}>
						// 	{}
						// </option>
					}
				</select>
			</section>
			<section className="flex gap-2 justify-end text-white">
				<button
					className="flex justify-center items-center w-6 h-6 bg-zinc-800 hover:bg-stone-500"
					type="button"
					onClick={clearForm}
				>
					<AiFillCloseSquare />
				</button>
				<button
					className="flex justify-center items-center h-6 px-2 bg-zinc-800 hover:bg-stone-500"
					type="button"
					onClick={handleSubmit}
				>
					Add Type
				</button>
			</section>
		</section>
	);
}
