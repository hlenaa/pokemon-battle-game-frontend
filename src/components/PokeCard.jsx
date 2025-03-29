import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PokeCard = ({ pokemon, pokemonId, roster, setRoster }) => {
	const isInRoster = roster.some((p) => p.id === pokemonId); // Check if the Pokémon is already in the roster
	const location = useLocation(); // Get the current route
	const isHomePage = location.pathname === "/"; // Check if the current route is the home page
	const isMyRosterPage = location.pathname === "/my-roster"; // Check if the current route is the my-roster page

	useEffect(() => {
		// Update localStorage whenever the roster changes
		localStorage.setItem("roster", JSON.stringify(roster));
	}, [roster]); // Runs every time the roster changes

	const removePokemon = (pokemonId) => {
		const updatedRoster = roster.filter((pokemon) => pokemon.id !== pokemonId);
		setRoster(updatedRoster);
	};

	const addPokemon = (pokemonId, pokemonName) => {
		setRoster([...roster, { id: pokemonId, name: pokemonName }]);
	};

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
					{isHomePage ? (
						<button
							className="btn btn-primary"
							onClick={() => addPokemon(pokemonId, pokemon.name)}
						>
							{isInRoster ? "Caught ✅" : "Catch"}
						</button>
					) : isMyRosterPage ? (
						<button
							className="btn btn-primary"
							onClick={() => removePokemon(pokemonId)}
						>
							Remove
						</button>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default PokeCard;
