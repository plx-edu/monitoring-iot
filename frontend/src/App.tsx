import "./App.css";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from "react-router";
import DashBoard from "./components/DashBoard/DashBoard";
import ModuleDetail from "./components/Module/ModuleDetail";
import ModuleForm from "./components/Module/ModuleForm";
import TypeForm from "./components/DashBoard/TypeForm";
import {apiRequest, apiResource, formatDate, getRandNb, msToMins, startInterval} from "./utilities/methods";
import {createContext, useEffect, useState} from "react";
import {typeModule} from "./utilities/types";

// export const ModulesContext = createContext<typeModule[]>([[], () => {}]);
export const ModulesContext = createContext<any>([[], () => {}]);

function App() {
	const [modulesList, setModulesList] = useState<typeModule[]>([]);
	const [startScript, setStartScript] = useState(false);

	useEffect(() => {
		console.log(":: Hello Module ::");

		fetch(apiResource("modules"))
			.then((res) => res.json())
			.then((result) => {
				setModulesList(result);
				setTimeout(() => {
					setStartScript(result.length > 0);
				}, 5 * 1000);
			});
	}, []);

	// *Automatic* Script
	useEffect(() => {
		if (modulesList.length <= 0) return;
		console.log(":: Starting Script ::");

		setInterval(() => {
			const moduleToUpdate = modulesList[getRandNb(0, modulesList.length - 1)];
			console.log("#", moduleToUpdate);

			// If module is not active, don't do anything :/
			if (!moduleToUpdate.current_state) return;

			const newData = {
				state: {
					current_state: false,
					user_set: false,
				},
				measurement: {
					current_state: true,
					current_value: getRandNb(0, 50),
				},
			};

			// More chances of updating measurement than failing module state
			const dataToUpdate = getRandNb(1, 100) <= 10 ? newData.state : newData.measurement;
			console.log("::", newData);

			fetch(apiResource("modules", moduleToUpdate.id), apiRequest("patch", dataToUpdate))
				.then((res) => res.json())
				.then((result) => {
					console.log(formatDate(new Date(Date.now())), result);

					setModulesList(
						modulesList.map((x) => {
							if (x.id === result.id) return result;
							return x;
						}),
					);
				});
		}, msToMins(10));
	}, [startScript]);

	return (
		<section className="App h-screen w-screen bg-slate-300 overflow-hidden">
			<Layout>
				<ModulesContext.Provider value={[modulesList, setModulesList]}>
					<Routes>
						<Route path="/" element={<DashBoard />} />

						<Route path="/module/" element={<ModuleForm />} />
						<Route path="/module/:id" element={<ModuleDetail />} />
						<Route path="/type/" element={<TypeForm />} />
					</Routes>
				</ModulesContext.Provider>
			</Layout>
		</section>
	);
}

export default App;
