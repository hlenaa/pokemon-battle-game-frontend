import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Shield,
  Zap,
  HeartPulse,
  Swords,
  ShieldCheck,
  Gauge,
} from "lucide-react";

const PokeCard = ({ pokemon, pokemonId, roster, setRoster }) => {
  const isInRoster = roster.some((p) => p.id === pokemonId); // Check if the Pokémon is already in the roster
  const location = useLocation(); // Get the current route
  const isHomePage = location.pathname === "/"; // Check if the current route is the home page
  const isMyRosterPage = location.pathname === "/my-roster"; // Check if the current route is the my-roster page
  const isBattlePage = location.pathname === "/battle"; // Check if the current route is the battle page

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

  const typeColors = {
    normal: "bg-gray-100",
    fighting: "bg-red-100",
    flying: "bg-indigo-100",
    poison: "bg-purple-100",
    ground: "bg-yellow-100",
    rock: "bg-yellow-200",
    bug: "bg-lime-100",
    ghost: "bg-violet-100",
    steel: "bg-gray-200",
    fire: "bg-orange-100",
    water: "bg-blue-100",
    grass: "bg-green-100",
    electric: "bg-yellow-100",
    psychic: "bg-pink-100",
    ice: "bg-cyan-100",
    dragon: "bg-indigo-200",
    dark: "bg-gray-300",
    fairy: "bg-pink-100",
    stellar: "bg-gray-100",
    unknown: "bg-gray-100",
  };

  const typeBadgeColors = {
    normal: "bg-gray-600",
    fighting: "bg-red-700",
    flying: "bg-indigo-600",
    poison: "bg-purple-700",
    ground: "bg-yellow-800",
    rock: "bg-yellow-700",
    bug: "bg-lime-700",
    ghost: "bg-violet-700",
    steel: "bg-gray-500",
    fire: "bg-orange-600",
    water: "bg-blue-600",
    grass: "bg-green-600",
    electric: "bg-yellow-500",
    psychic: "bg-pink-600",
    ice: "bg-cyan-500",
    dragon: "bg-indigo-800",
    dark: "bg-gray-800",
    fairy: "bg-pink-500",
    stellar: "bg-gray-400",
    unknown: "bg-gray-400",
  };

  return (
    <div
      className="card shadow-sm"
      style={{
        backgroundColor: typeColors[pokemon.types?.[0]?.type.name] || "#f8f8f8",
      }}
    >
      <figure>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
          alt={pokemon.name}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title justify-center">{pokemon.name}</h2>
        <div className="types mb-4 flex flex-wrap justify-center">
          {pokemon.types?.map((t) => {
            const type = t.type.name;
            const typeClass = typeBadgeColors[type] || "bg-gray-600";
            return (
              <span
                key={type}
                className={`inline-block ${typeClass} text-white font-semibold px-3 py-1 rounded-lg text-sm capitalize mr-2 mb-2`}
              >
                {type}
              </span>
            );
          })}
        </div>
        {isBattlePage && (
          <>
            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="stat-card">
                <Zap className="text-yellow-500" size={20} />
                <span>Attack</span>
                <strong>
                  {
                    pokemon.stats.find((s) => s.stat.name === "attack")
                      ?.base_stat
                  }
                </strong>
              </div>
              <div className="stat-card">
                <Shield className="text-cyan-500" size={20} />
                <span>Defense</span>
                <strong>
                  {
                    pokemon.stats.find((s) => s.stat.name === "defense")
                      ?.base_stat
                  }
                </strong>
              </div>
              <div className="stat-card">
                <HeartPulse className="text-red-500" size={20} />
                <span>HP</span>
                <strong>
                  {pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat}
                </strong>
              </div>
              <div className="stat-card">
                <Swords className="text-purple-500" size={20} />
                <span>Sp. Atk</span>
                <strong>
                  {
                    pokemon.stats.find((s) => s.stat.name === "special-attack")
                      ?.base_stat
                  }
                </strong>
              </div>
              <div className="stat-card">
                <ShieldCheck className="text-green-500" size={20} />
                <span>Sp. Def</span>
                <strong>
                  {
                    pokemon.stats.find((s) => s.stat.name === "special-defense")
                      ?.base_stat
                  }
                </strong>
              </div>
              <div className="stat-card">
                <Gauge className="text-pink-500" size={20} />
                <span>Speed</span>
                <strong>
                  {
                    pokemon.stats.find((s) => s.stat.name === "speed")
                      ?.base_stat
                  }
                </strong>
              </div>
            </div>
          </>
        )}

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
