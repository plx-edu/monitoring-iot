import "./App.css";
import Layout from "./components/Layout/Layout";
import {Routes, Route} from "react-router";
import DashBoard from "./components/DashBoard/DashBoard";
import Module from "./components/Module/Module";

function App() {
	return (
		<section className="App h-screen w-screen bg-slate-300 overflow-hidden">
			<Layout>
				<Routes>
					<Route path="/" element={<DashBoard />} />
					{/* <Route path="/module/:id" element={<Module />} /> */}
				</Routes>
			</Layout>
		</section>
	);
}

export default App;
