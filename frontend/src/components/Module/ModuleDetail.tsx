import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router";
import {placeholder, typeModule} from "../../utilities/types";
import {AiOutlineWarning} from "react-icons/ai";
import {startInterval, formatDate, apiResource, apiRequest} from "../../utilities/methods";
import Module from "./Module";

export default function ModuleDetail() {
	const {id} = useParams();
	const [item, setItem] = useState<typeModule>();
	const [error, setError] = useState(null);
	const redirect = useNavigate();

	useEffect(() => {
		fetch(apiResource("modules", id))
			.then((res) => res.json())
			.then(
				(result) => {
					setItem(result);
				},
				(error) => setError(error),
			);
		// startInterval(1);
	}, []);

	function handleToggle() {
		const newState = {
			current_state: !item?.current_state,
			user_set: true,
		};

		fetch(apiResource("modules", item?.id), apiRequest("patch", newState))
			.then((res) => res.json())
			.then((result) => {
				console.log(item);
				console.log(result);

				// setItem(placeholder);
				setItem(result);
				console.log(item);
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
			<section className="flex">
				{/* Logs Section */}
				<div className="flex">
					<ul>
						{item?.data_log.reverse().map((data) => (
							<li key={data.id}>
								<p>{data.measured}</p>
								<p>{formatDate(data.time)}</p>
							</li>
						))}
					</ul>

					<ul>
						{item?.state_log.reverse().map((state) => (
							<li key={state.id}>
								<p>State: {state.state ? "true" : "false"}</p>
								<p>Set by user: {state.user_set ? "true" : "false"}</p>
								<p>{formatDate(state.time)}</p>
							</li>
						))}
					</ul>
				</div>

				{/* Module section */}
				<section className="flex flex-col gap-5">
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
		);
	}
}
