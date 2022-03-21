import React, {useEffect, useState} from "react";
import {AiFillCloseSquare} from "react-icons/ai";
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im";
import {useNavigate} from "react-router";
import {apiRequest, apiResource, getRandName} from "../../utilities/methods";
import {typeTypeRef} from "../../utilities/types";

export default function ModuleForm() {
	const [types, setTypes] = useState<typeTypeRef[]>([]);
	const [typeChoice, setTypeChoice] = useState(0);
	const [name, setName] = useState("");
	const [currentState, setCurrentState] = useState(true);
	const [location, setLocation] = useState("");
	const redirect = useNavigate();

	useEffect(() => {
		fetch(apiResource("types"))
			.then((res) => res.json())
			.then((result) => {
				setTypes(result);
			});
	}, []);

	function handleSubmit() {
		if (name === "" || location === "" || typeChoice <= 0) return;

		const newModule = {
			name: name,
			type: typeChoice,
			location: location.trim().toLowerCase(),
			current_state: currentState,
		};

		fetch(apiResource("modules"), apiRequest("post", newModule))
			.then((res) => res.json())
			.then((result) => {
				// console.log("New module:", result);

				let createdId = result.id;

				clearForm();
				redirect(`/module/${createdId}`);
			});
	}

	function handleNaming(typeId: number) {
		if (typeId <= 0) {
			setName("");
			return;
		}
		// Retrieve type name
		const typeName = types.filter((x) => x.id === typeId)[0].name;

		setTypeChoice(typeId);
		setName(getRandName(typeName));
	}

	function clearForm() {
		setName("");
		setLocation("");
		setTypeChoice(0);
		setCurrentState(true);
	}

	return (
		<section className="flex flex-col w-80 gap-2 m-auto mt-2 p-2 border-2 border-zinc-500">
			<p className="flex justify-center bg-zinc-800 text-white">New Module</p>
			<section className="flex flex-col gap-2">
				<p className="p-1 bg-zinc-400">
					<span className="font-semibold">{name ? name : "..."}</span>
				</p>

				{/* Select */}
				<select
					className="p-2 capitalize bg-zinc-200"
					onChange={(e) => {
						handleNaming(+e.target.value);
					}}
					value={typeChoice}
				>
					<option value="0">Select Type</option>

					{types.map((t) => (
						<option className="capitalize" key={t.id} value={t.id}>
							{t.name} ({t.unit})
						</option>
					))}
				</select>

				{/* Checkbox */}
				<button
					className="flex justify-between items-center bg-zinc-200 p-2"
					onClick={() => setCurrentState(!currentState)}
				>
					<p>Starting State</p>
					<p>{currentState ? <ImCheckboxChecked /> : <ImCheckboxUnchecked />}</p>
				</button>

				{/* Input */}
				<input
					className="p-1"
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Location (ex: Vehicle/City/etc.)"
				/>
			</section>

			{/* Button */}
			<section className="flex gap-2 justify-end text-white">
				<button
					className="flex justify-center items-center w-6 h-6 bg-zinc-800 hover:bg-stone-500"
					type="button"
					onClick={clearForm}
				>
					<AiFillCloseSquare />
				</button>
				<button
					className="flex justify-center items-center h-6 p-2 bg-zinc-800 hover:bg-stone-500"
					type="button"
					onClick={handleSubmit}
				>
					Add Module
				</button>
			</section>
		</section>
	);
}
