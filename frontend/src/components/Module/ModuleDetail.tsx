import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {typeModule} from "../../utilities/types";
import {AiOutlineWarning} from "react-icons/ai";
import {formatDate, apiResource, apiRequest, msToMins} from "../../utilities/methods";
import Module from "./Module";
import Chart from "./Chart";

// Script interval in minutes
// msToMins(minInterval)
const minInterval = 0.2;

export default function ModuleDetail() {
	const {id} = useParams();
	const [item, setItem] = useState<typeModule>();
	const [error, setError] = useState(null);
	const redirect = useNavigate();

	useEffect(() => {
		function fetchModule() {
			fetch(apiResource("modules", id))
				.then((res) => res.json())
				.then(
					(result) => {
						setItem((x) => (x = result));
					},
					(error) => setError(error),
				);
		}
		fetchModule();

		const refresh = setInterval(() => {
			fetchModule();
		}, msToMins(minInterval));

		return () => {
			clearInterval(refresh);
		};
	}, [id]);

	function handleToggle() {
		const newState = {
			current_state: !item?.current_state,
			user_set: true,
		};

		fetch(apiResource("modules", item?.id), apiRequest("patch", newState))
			.then((res) => res.json())
			.then((result) => {
				setItem(result);
			});
	}

	function handleDelete() {
		if (window.confirm("Cannot be undone !")) {
			fetch(apiResource("modules", item?.id), apiRequest("delete"))
				.then((res) => res.json())
				.then((result) => {
					// console.log("Deleted", result);
					redirect("/");
				});
		}
	}

	if (error) {
		return <section>Error: {JSON.stringify(error)}</section>;
	} else {
		return (
			<section className="flex justify-between">
				{/* Module section */}
				{/* <section className="flex flex-col gap-5 bg-zinc-800"> */}
				<section className="relative w-60 bg-zinc-xxx top-0 bottom-0">
					<section className="flex flex-col gap-5 items-center sticky top-20">
						<Module module={item} />
						<button
							type="button"
							onClick={handleToggle}
							className={
								"flex flex-col w-40 rounded overflow-hidden " + (item?.current_state ? "bg-red-500" : "bg-emerald-400")
							}
						>
							{item?.current_state ? "Deactivate" : "Activate"}
						</button>
						<button
							type="button"
							onClick={handleDelete}
							className="flex flex-col w-40 rounded overflow-hidden bg-red-600"
						>
							<div className="flex h-full justify-around items-center">
								<AiOutlineWarning />
								<p>Delete</p>
								<AiOutlineWarning />
							</div>
						</button>
					</section>
				</section>

				{/* Logs Section */}
				<section className="flex flex-col w-full items-center gap-5 pt-2">
					{/* Graph */}
					<section className="flex flex-col w-5/6 overflow-hidden rounded border border-zinc-800">
						<div className="flex flex-row  bg-zinc-800 text-white">
							<h1 className="font-bold w-full text-center">Graph...</h1>
						</div>
						<div className="flex">
							<Chart logData={item?.data_log} stateData={item?.state_log} />
						</div>
					</section>

					{/* Data Logs */}
					<section className="flex flex-col max-h-64 w-5/6 overflow-hidden rounded border border-zinc-800">
						<div className="flex flex-row  bg-zinc-800 text-white">
							<h1 className="font-bold w-full text-center">Value</h1>
							<h1 className="font-bold w-full text-center">Time</h1>
						</div>
						<section className="overflow-y-auto">
							{item?.data_log.reverse().map((data) => (
								<div key={data.id} className="flex flex-row">
									<p className="w-full text-center">{data.measured ? data.measured : "n/a"}</p>
									<p className="w-full text-center">{formatDate(data.time)}</p>
								</div>
							))}
						</section>
					</section>

					{/* State Logs */}
					<section className="flex flex-col max-h-64 w-5/6 overflow-hidden rounded border border-zinc-800">
						<div className="flex flex-row  bg-zinc-800 text-white">
							<h1 className="font-bold w-full text-center">State</h1>
							<h1 className="font-bold w-full text-center">Origin</h1>
							<h1 className="font-bold w-full text-center">Time</h1>
						</div>
						<section className="overflow-y-auto">
							{item?.state_log.reverse().map((state) => (
								<div key={state.id} className="flex flex-row">
									<p className="w-full text-center">{state.state ? "Active" : "Inactive"}</p>
									<p className="w-full text-center">{state.user_set ? "User" : "Unknown"}</p>
									<p className="w-full text-center">{formatDate(state.time)}</p>
								</div>
							))}
						</section>
					</section>
				</section>
			</section>
		);
	}
}
