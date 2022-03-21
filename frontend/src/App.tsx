import "./App.css";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from "react-router";
import DashBoard from "./components/DashBoard/DashBoard";
import ModuleDetail from "./components/Module/ModuleDetail";
import ModuleForm from "./components/Module/ModuleForm";
import TypeForm from "./components/DashBoard/TypeForm";

function App() {
	return (
		<section className="App h-screen w-screen bg-slate-300 overflow-hidden">
			<Layout>
				<Routes>
					<Route path="/" element={<DashBoard />} />

					<Route path="/module/" element={<ModuleForm />} />
					<Route path="/module/:id" element={<ModuleDetail />} />
					<Route path="/type/" element={<TypeForm />} />
				</Routes>
			</Layout>
		</section>
	);
}

export default App;
