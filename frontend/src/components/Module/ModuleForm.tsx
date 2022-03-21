import React, {useState} from "react";
import {AiFillCloseSquare} from "react-icons/ai";

export default function ModuleForm() {
	const [type, setType] = useState(0);
	const [name, setName] = useState("");
	const [location, setLocation] = useState("");

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
				<input
					className=" p-1"
					type="text"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Location (ex: Vehicle/City/etc.)"
				/>
			</section>
			<section className="flex gap-2 justify-end text-white">
				<button className="flex justify-center items-center w-6 h-6 bg-zinc-800" type="button" onClick={clearForm}>
					<AiFillCloseSquare />
				</button>
				<button className="flex justify-center items-center h-6 px-2 bg-zinc-800" type="button" onClick={handleSubmit}>
					Add Type
				</button>
			</section>
		</section>
	);
}
