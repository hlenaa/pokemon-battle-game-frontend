import PokeCard from "../components/PokeCard";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import useGetPokemons from "../data/useGetPokemons";

const Home = () => {
  const { pokemons, status, roster, setRoster } = useContext(AppContext);
  const { fetchPokemons } = useGetPokemons(); //destructure function from hook

  useEffect(() => {
    fetchPokemons();
  }, []); //load data on mount

  return (
    <div className="grid grid-cols-3 gap-8">
      {status === "loading" ? (
        <p>Trying to catch 'em all</p>
      ) : status === "error" ? (
        <p>
          Unfortunately, we ran into an error. There is a high chance of a wild
          Snorlax blocking the path.
        </p>
      ) : (
        pokemons.map((pokemon) => {
          const id = pokemon.id; //extract id from pokemon url
          return (
            <PokeCard
              key={id}
              pokemon={pokemon}
              pokemonId={id}
              roster={roster}
              setRoster={setRoster}
            />
          );
        })
      )}
    </div>
  );
};

export default Home;
