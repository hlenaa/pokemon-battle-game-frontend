//import useGetPokemons from "../data/useGetPokemons";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import PokeCard from "../components/PokeCard";


const PersonalRoster = () => {
	const roster = JSON.parse(localStorage.getItem("roster")) || []; //get roster from localStorage -> has name + id of pokemon
	const { status, setRoster , } = useContext(AppContext);

	if (!roster || roster.length === 0) {
		return <p>You didn't catch any pokemon yet :(</p>;
	}

	/*
	useEffect(() => {
		fetchRoster({ roster });
	}, []); //load data on mount
	*/

	return (
		<>
			<h1 className="text-3xl font-bold">My Roster</h1>
			<div className="grid grid-cols-3 gap-8">
				{status === "loading" ? (
					<p>Trying to catch 'em all</p>
				) : status === "error" ? (
					<p>
						Unfortunately, we ran into an error. There is a high chance of a
						wild Snorlax blocking the path.
					</p>
				) : (
					roster.map((pokemon) => {
						return (
							<PokeCard
								key={pokemon.id}
								pokemon={pokemon}
								pokemonId={pokemon.id}
								roster={roster}
								setRoster={setRoster}
							/>
						);
					})
				)}
			</div>
		</>
	);
};

export default PersonalRoster;
