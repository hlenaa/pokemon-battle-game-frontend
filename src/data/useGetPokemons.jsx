import { AppContext } from "../App";
import { useContext } from "react";

//API endpoint
const PokemonBaseUrl = `https://pokeapi.co/api/v2/pokemon`;

//create Hook because useContext cant be used in async functions
const useGetPokemons = () => {
	const { setStatus, setPokemons } = useContext(AppContext);

	const fetchPokemons = async (id = null) => {
		const query = id ? `/${id}` : `?limit=150`; //if null = falsy -> return array of pokemons
		setStatus("loading"); //UX: Set loading state

//fetch image for every pokemon in list -> 

		try {
			let response = await fetch(`${PokemonBaseUrl}${query}`);

			if (!response.ok) {
				throw new Error(
					`Failed fetching pokemon. Error Status: ${response.status}`
				);
			}
			let data = await response.json();
			console.log(data);
			setPokemons(id ? data : data.results);
			setStatus(""); //UX: Set loading state to empty & show data instead
		} catch (error) {
			console.log(error);
			//UX: Set error state
			setStatus("error");
		}
	};

	return { fetchPokemons }; //return function to use in components
};

export default useGetPokemons;
