import { Link } from "react-router-dom";

const PokeCard = ({ pokemon, pokemonId, roster, setRoster }) => {
	const isInRoster = roster.includes(pokemonId); // Check if the Pokémon is already in the roster

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
					<Link to={`pokemon/${pokemonId}`} className="btn btn-primary">
						See Entry
					</Link>
					<button
						className="btn btn-primary"
						onClick={() => {
							if (!isInRoster) {
								setRoster([...items, pokemonId]);
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
