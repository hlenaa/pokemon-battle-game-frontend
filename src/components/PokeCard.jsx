import { Link } from "react-router-dom";
import {
  Shield,
  Zap,
  HeartPulse,
  Swords,
  ShieldCheck,
  Gauge,
} from "lucide-react";

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
        <div className="types mb-2">
          {pokemon.types && (
            <>
              <strong>Type{pokemon.types.length > 1 ? "s" : ""}:</strong>{" "}
              {pokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`type-badge type-${t.type.name} ml-1`}
                >
                  {t.type.name.toUpperCase()}
                </span>
              ))}
            </>
          )}
        </div>
        <ul className="mb-4">
          {pokemon.stats &&
            pokemon.stats.map((stat) => (
              <li key={stat.stat.name}>
                {stat.stat.name}: {stat.base_stat}
              </li>
            ))}
        </ul>
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
