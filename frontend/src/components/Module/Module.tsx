import React, {useEffect} from "react";
import {useParams} from "react-router-dom";

export default function Module() {
	const {id} = useParams();

	useEffect(() => {
		console.log(id);
	}, []);

	return (
		<div>
			Module id n°{id}
			<button type="button" onClick={() => console.log("hello")}>
				Hello
			</button>
		</div>
	);
}
