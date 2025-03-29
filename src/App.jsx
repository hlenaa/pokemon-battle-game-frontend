import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext } from "react";
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import PersonalRoster from "./pages/PersonalRoster";
import Battle from "./pages/Battle";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";

const basepath = "/";
export const AppContext = createContext();

function App() {
	const [pokemons, setPokemons] = useState([]); //initital state is empty array
	const [roster, setRoster] = useState(() => {
		return JSON.parse(localStorage.getItem("roster")) || [];
	}); //initital state is empty array or localStortage
	const [status, setStatus] = useState("loading"); //initital state for fetching data -> for UX
	const [userScore, setUserScore] = useState(0); //initital state for user score
	const [leaderboard, setLeaderboard] = useState([]);

	return (
		<AppContext.Provider
			value={{
				pokemons,
				setPokemons,
				status,
				setStatus,
				roster,
				setRoster,
				leaderboard,
				setLeaderboard,
				userScore,
				setUserScore,
			}}
		>
			<BrowserRouter>
				<Routes>
					<Route path={basepath} element={<MainLayout />}>
						<Route index element={<Home />} />
						<Route path="pokemon/:id" element={<PokemonDetail />} />
						<Route path="my-roster" element={<PersonalRoster />} />
						<Route path="battle" element={<Battle />} />
						<Route path="leaderboard" element={<Leaderboard />} />
						<Route path="NotFound" element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AppContext.Provider>
	);
}

export default App;
