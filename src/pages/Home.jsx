import PokeCard from "../components/PokeCard";
import { useContext } from "react";
import { AppContext } from "../App";

const Home = () => {
	const { pokemons } = useContext(AppContext);

	return (
		<div
			className="grid grid-cols-3 gap-8
>
"
		>
			{pokemons.map((pokemon) => (
				<PokeCard key={pokemon.id} pokemon={pokemon} />
			))}
		</div>
	);
};

export default Home;
