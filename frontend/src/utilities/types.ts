export type typeModule = {
	id: number;
	name: string;
	type: 1;
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
	module_id: string;
	state: boolean;
	user_set: boolean;
	time: Date;
};

export type typeDataLog = {
	id: number;
	module_id: string;
	measured: number;
	time: Date;
};

export type typeTypeRef = {
	id: number;
	name: string;
	unit: string;
};
