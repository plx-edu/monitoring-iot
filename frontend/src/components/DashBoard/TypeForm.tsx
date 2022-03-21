import React, {useEffect, useState} from "react";
import {AiFillCloseSquare} from "react-icons/ai";
import {apiRequest, apiResource} from "../../utilities/methods";
import {typeTypeRef} from "../../utilities/types";

export default function TypeForm() {
	const [name, setName] = useState("");
	const [unit, setUnit] = useState("");
	const [types, setTypes] = useState<typeTypeRef[]>([]);

	useEffect(() => {
		fetch(apiResource("types"))
			.then((res) => res.json())
			.then((result) => {
				setTypes(result);
			});
	}, []);

	function handleSubmit() {
		console.log("'" + name.trim().toLowerCase() + "'");
		console.log(unit.trim().toLowerCase());
		const newType = {
			name: name.trim().toLowerCase(),
			unit: unit.trim().toLowerCase(),
		};

		fetch(apiResource("types"), apiRequest("post", newType))
			.then((res) => res.json())
			.then((result) => {
				console.log("New type:", result);

				let arr = types;
				arr.push(result);
				setTypes(arr);

				clearForm();
			});
	}

	function clearForm() {
		setName("");
		setUnit("");
	}

	return (
		<>
			<section className="flex flex-col w-80 gap-2 m-auto mt-2 p-2 border-2 border-zinc-500">
				<p className="flex justify-center bg-zinc-800 text-white">New Type</p>
				<section className="flex flex-col gap-2">
					<input
						className=" p-1"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						placeholder="Type (ex: Speed)"
					/>
					<input
						className=" p-1"
						type="text"
						value={unit}
						onChange={(e) => setUnit(e.target.value)}
						placeholder="Unit (ex: km/h)"
					/>
				</section>
				<section className="flex gap-2 justify-end text-white">
					<button className="flex justify-center items-center w-6 h-6 bg-zinc-800" type="button" onClick={clearForm}>
						<AiFillCloseSquare />
					</button>
					<button
						className="flex justify-center items-center h-6 px-2 bg-zinc-800"
						type="button"
						onClick={handleSubmit}
					>
						Add Type
					</button>
				</section>
			</section>

			<section className="flex flex-col w-80 gap-2 m-auto mt-2 p-2 border-2 border-zinc-500">
				<p className="flex justify-center bg-zinc-800 text-white">Types</p>
				<div className="flex flex-wrap">
					{types.map((item) => (
						<article key={item.id}>{item.name}</article>
					))}
				</div>
			</section>
		</>
	);
}
