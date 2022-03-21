import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";
import {typeDataLog, typeStateLog} from "../../utilities/types";
import {formatDate} from "../../utilities/methods";

export default function Chart(props: {logData?: typeDataLog[]; stateData?: typeStateLog[]}) {
	ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
			},
			// title: {
			// 	display: true,
			// 	text: "Chart.js Line Chart",
			// },
		},
	};

	let logDataValue;
	let logDataLabels;

	if (props.logData) {
		logDataValue = props.logData.map((x) => {
			// if null return 0
			return x.measured ? x.measured : 0;
		});

		logDataLabels = props.logData.map((x) => {
			return x.time ? formatDate(x.time) : 0;
		});

		// console.log(":::::", logDataValue);
		// console.log(":::::", logDataLabels);
	}

	const labels = logDataLabels;
	// const labels = props.logData;

	const data = {
		labels,
		datasets: [
			{
				label: "Module Dataset",
				backgroundColor: "hsl(252, 82.9%, 67.8%)",
				borderColor: "hsl(252, 82.9%, 67.8%)",
				data: logDataValue,
				// data: props.logData,
			},
		],
	};

	return (
		<div className="w-full h-full">
			<Line options={options} data={data} />
		</div>
	);
}
