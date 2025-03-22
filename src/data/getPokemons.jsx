//API endpoint
const PokemonBaseUrl = `https://pokeapi.co/api/v2/pokemon/`;

const GetPokemons = async () => {
	let pokemons = [];

	try {
		//UX: Set loading state

		let response = await fetch(PokemonBaseUrl);

		if (!response.ok) {
			throw new Error(
				`Failed fetching pokemon. Error Status: ${response.status}`
			);
			//UX: Set error state
		}

		let data = await response.json();
		console.log(data);
		//UX: Set loading state to empty & show data instead
	} catch (error) {
		console.log(error);
	}
};

export default GetPokemons;
