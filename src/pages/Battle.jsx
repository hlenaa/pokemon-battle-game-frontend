import { useState, useEffect } from "react";
import axios from "axios";
import PokeCard from "../components/PokeCard";
import { Zap, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Battle() {
  const testRoster = [
    {
      name: "squirtle",
      id: 7,
      sprites: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
      },
      stats: [
        { base_stat: 44, stat: { name: "hp" } },
        { base_stat: 48, stat: { name: "attack" } },
        { base_stat: 65, stat: { name: "defense" } },
        { base_stat: 50, stat: { name: "special-attack" } },
        { base_stat: 64, stat: { name: "special-defense" } },
        { base_stat: 43, stat: { name: "speed" } },
      ],
      types: [
        {
          slot: 1,
          type: { name: "water", url: "https://pokeapi.co/api/v2/type/11/" },
        },
      ],
    },
  ];

  const [myPokemon] = useState(testRoster[0]);
  const [enemyPokemon, setEnemyPokemon] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [awaitingUsername, setAwaitingUsername] = useState(false);
  const [usernameInput, setUsernameInput] = useState("");
  const [scoreSubmitted, setScoreSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getRandomPokemon = async () => {
      const randomId = Math.floor(Math.random() * 151) + 1; // Gen 1 (1–151)
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        setEnemyPokemon(response.data);
      } catch (error) {
        console.error("Error fetching random enemy Pokémon:", error);
      }
    };

    getRandomPokemon();
  }, []);

  const getTypeEffectiveness = async (attackerTypes, defenderTypes) => {
    try {
      let totalMultiplier = 1;

      for (const attackerType of attackerTypes) {
        const res = await axios.get(
          `https://pokeapi.co/api/v2/type/${attackerType}`
        );
        const relations = res.data.damage_relations;

        for (const defenderType of defenderTypes) {
          if (relations.no_damage_to.some((t) => t.name === defenderType)) {
            totalMultiplier *= 0;
          } else if (
            relations.double_damage_to.some((t) => t.name === defenderType)
          ) {
            totalMultiplier *= 2;
          } else if (
            relations.half_damage_to.some((t) => t.name === defenderType)
          ) {
            totalMultiplier *= 0.5;
          } else {
            totalMultiplier *= 1;
          }
        }
      }

      return totalMultiplier;
    } catch (err) {
      console.error("Error checking type effectiveness:", err);
      return 1;
    }
  };

  const handleBattle = async () => {
    if (!myPokemon || !enemyPokemon) return;

    const myTypes = myPokemon.types.map((t) => t.type.name);
    const enemyTypes = enemyPokemon.types.map((t) => t.type.name);

    const myStats = myPokemon.stats.reduce((acc, s) => acc + s.base_stat, 0);
    const enemyStats = enemyPokemon.stats.reduce(
      (acc, s) => acc + s.base_stat,
      0
    );

    const myMultiplier = await getTypeEffectiveness(myTypes, enemyTypes);
    const enemyMultiplier = await getTypeEffectiveness(enemyTypes, myTypes);

    const myPower = myStats * myMultiplier;
    const enemyPower = enemyStats * enemyMultiplier;

    let winner;
    if (myPower > enemyPower) {
      winner = myPokemon.name;
      const xp = enemyPokemon.base_experience || 50;
      setBattleResult(
        `Your Pokémon ${winner.toUpperCase()} wins the battle! You won ${xp} XP.`
      );
      setAwaitingUsername(true);
    } else if (enemyPower > myPower) {
      winner = enemyPokemon.name;
      setBattleResult(`${winner.toUpperCase()} wins the battle!`);
    } else {
      winner = Math.random() < 0.5 ? myPokemon.name : enemyPokemon.name;
      if (winner === myPokemon.name) {
        const xp = enemyPokemon.base_experience || 50;
        setBattleResult(
          `Your Pokémon ${winner.toUpperCase()} wins the battle! You won ${xp} XP.`
        );
        setAwaitingUsername(true);
      } else {
        setBattleResult(`${winner.toUpperCase()} wins the battle!`);
      }
    }
  };

  const handleSubmitUsername = async () => {
    if (!usernameInput.trim() || !enemyPokemon) return;

    const newEntry = {
      name: usernameInput.trim(),
      score: enemyPokemon.base_experience || 50,
    };

    try {
      console.log("Submitting:", newEntry);
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, newEntry);

      // Reset state
      setUsernameInput("");
      setAwaitingUsername(false);
    } catch (error) {
      console.error("Failed to submit score:", error);
      // You can add UI feedback here if needed
    }

    // Reset input state
    setUsernameInput("");
    setAwaitingUsername(false);
    setScoreSubmitted(true);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-10">
          Pokémon Battle!
        </h1>

        <div className="flex flex-col items-center lg:flex-row lg:justify-between gap-8">
          {/* My Pokémon */}
          <div className="flex-1">
            <PokeCard pokemon={myPokemon} pokemonId={myPokemon.id} />
          </div>

          {/* Battle Button */}
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={handleBattle}
              className="btn btn-warning flex items-center gap-2 text-lg"
            >
              <Zap size={20} /> Battle!
            </button>
            {battleResult && (
              <div className="text-center text-lg font-medium text-gray-700">
                <p>{battleResult}</p>
                {!awaitingUsername && (
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="btn bg-white border border-gray-300 hover:bg-gray-100 text-gray-800 shadow-sm flex items-center gap-2 px-4 py-2 rounded-lg transition-all"
                    >
                      <RotateCcw size={18} />
                      Retry
                    </button>
                  </div>
                )}
              </div>
            )}
            {scoreSubmitted && (
              <p className="text-sm text-center text-gray-500 mt-2">
                See your score on the{" "}
                <a
                  href="/leaderboard"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  leaderboard
                </a>
                !
              </p>
            )}

            {awaitingUsername && !scoreSubmitted && (
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  className="input input-bordered w-full mb-2"
                />
                <button
                  onClick={handleSubmitUsername}
                  className="btn btn-success w-full"
                >
                  Submit Score
                </button>
              </div>
            )}
          </div>
          {/* Enemy Pokémon */}
          <div className="flex-1">
            {enemyPokemon ? (
              <PokeCard pokemon={enemyPokemon} pokemonId={enemyPokemon.id} />
            ) : (
              <p className="text-center">Loading enemy Pokémon...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Battle;
