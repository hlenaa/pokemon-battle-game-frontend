import { AppContext } from "../App";
import { useContext } from "react";

//API endpoint
const PokemonBaseUrl = `https://pokeapi.co/api/v2/pokemon`;

//create Hook because useContext cant be used in async functions
const useGetPokemons = () => {
  const { setStatus, setPokemons } = useContext(AppContext);

  const fetchPokemons = async () => {
    setStatus("loading");

    try {
      // Step 1: Fetch list of 150 Pokémon with name + URL
      const response = await fetch(`${PokemonBaseUrl}?limit=150`);
      if (!response.ok) {
        throw new Error(
          `Failed fetching pokemon list. Error Status: ${response.status}`
        );
      }
      const data = await response.json();

      // Step 2: Fetch full details for each Pokémon in parallel
      const detailedPromises = data.results.map((pokemon) =>
        fetch(pokemon.url).then((res) => res.json())
      );
      const detailedPokemons = await Promise.all(detailedPromises);

      setPokemons(detailedPokemons);
      setStatus("");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return { fetchPokemons }; //return function to use in components
};

export default useGetPokemons;
