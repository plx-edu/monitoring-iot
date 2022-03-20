export type typeModule = {
	id: number;
	name: string;
	type: number;
	location: string;
	current_value: number;
	current_state: boolean;
	created: Date;
	uptime_start: Date;
	state_log: typeStateLog[];
	data_log: typeDataLog[];
	type_ref: typeTypeRef;
};

export type typeStateLog = {
	id: number;
	module_id: number;
	state: boolean;
	user_set: boolean;
	time: Date;
};

export type typeDataLog = {
	id: number;
	module_id: number;
	measured: number;
	time: Date;
};

export type typeTypeRef = {
	id: number;
	name: string;
	unit: string;
};

export const placeholder = () => {
	return {
		id: -1,
		name: "Placeholder",
		type: 1,
		location: "Placeholder",
		current_value: -1,
		current_state: false,
		created: new Date(),
		uptime_start: new Date(),
		state_log: [
			{
				id: -1,
				module_id: -1,
				state: false,
				user_set: false,
				time: new Date(),
			},
		],
		data_log: [
			{
				id: -1,
				module_id: -1,
				measured: -1,
				time: new Date(),
			},
		],
		type_ref: {id: -1, name: "", unit: ""},
	};
};
