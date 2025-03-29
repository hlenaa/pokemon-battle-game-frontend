import { Link } from "react-router-dom";
import { useEffect } from "react";

const PokeCard = ({ pokemon, pokemonId, roster, setRoster }) => {
	const isInRoster = roster.some((p) => p.id === pokemonId); // Check if the Pokémon is already in the roster

	useEffect(() => {
		// Update localStorage whenever the roster changes
		localStorage.setItem("roster", JSON.stringify(roster));
	}, [roster]); // Runs every time the roster changes

	return (
		<div className="card bg-base-100 w-96 shadow-sm">
			<figure>
				<img
					src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
					alt={pokemon.name}
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">{pokemon.name}</h2>
				<div className="card-actions justify-end">
					<Link to={`/pokemon/${pokemonId}`} className="btn btn-primary">
						See Entry
					</Link>
					<button
						className="btn btn-primary"
						onClick={() => {
							if (!isInRoster) {
								setRoster([...roster, { id: pokemonId, name: pokemon.name }]); // Add the Pokémon to the roster
							}
						}}
					>
						{" "}
						{isInRoster ? "Caught ✅" : "Catch"}
					</button>
				</div>
			</div>
		</div>
	);
};

export default PokeCard;
