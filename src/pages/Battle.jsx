import { useState, useEffect } from "react";
import axios from "axios";

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
    } else if (enemyPower > myPower) {
      winner = enemyPokemon.name;
    } else {
      winner = Math.random() < 0.5 ? myPokemon.name : enemyPokemon.name;
    }

    setBattleResult(`${winner.toUpperCase()} wins the battle!`);

    if (winner === myPokemon.name) {
      setAwaitingUsername(true); // show input field
    }
  };

  const handleSubmitUsername = () => {
    if (!usernameInput.trim() || !enemyPokemon) return;

    const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    const newEntry = {
      id: leaderboard.length + 1,
      username: usernameInput.trim(),
      score: enemyPokemon.base_experience || 50,
      date: new Date().toISOString(),
    };
    leaderboard.push(newEntry);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Reset input state
    setUsernameInput("");
    setAwaitingUsername(false);
  };

  return (
    <>
      <div className="container">
        <h1>Pokémon Battle!</h1>

        <div className="battle">
          {/* User's Pokemon */}
          <div className="pokemon">
            <h2>{myPokemon.name.toUpperCase()}</h2>
            <img src={myPokemon.sprites.front_default} alt={myPokemon.name} />
            <div className="types">
              <strong>Type{myPokemon.types.length > 1 ? "s" : ""}:</strong>{" "}
              {myPokemon.types.map((t) => (
                <span
                  key={t.type.name}
                  className={`type-badge type-${t.type.name}`}
                >
                  {t.type.name.toUpperCase()}
                </span>
              ))}
            </div>
            <ul>
              {myPokemon.stats.map((stat) => (
                <li key={stat.stat.name}>
                  {stat.stat.name}: {stat.base_stat}
                </li>
              ))}
            </ul>
          </div>

          <h2>VS</h2>

          {/* Random Enemy Pokemon */}
          {enemyPokemon ? (
            <div className="pokemon">
              <h2>{enemyPokemon.name.toUpperCase()}</h2>
              <img
                src={enemyPokemon.sprites.front_default}
                alt={enemyPokemon.name}
              />
              <div className="types">
                <strong>Type{enemyPokemon.types.length > 1 ? "s" : ""}:</strong>{" "}
                {enemyPokemon.types.map((t) => (
                  <span
                    key={t.type.name}
                    className={`type-badge type-${t.type.name}`}
                  >
                    {t.type.name.toUpperCase()}
                  </span>
                ))}
              </div>
              <ul>
                {enemyPokemon.stats.map((stat) => (
                  <li key={stat.stat.name}>
                    {stat.stat.name}: {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Loading enemy Pokémon...</p>
          )}
        </div>

        <button onClick={handleBattle} className="battle-btn">
          Battle!
        </button>

        {battleResult && <h3 className="result">{battleResult}</h3>}

        {awaitingUsername && (
          <div className="leaderboard-entry">
            <input
              type="text"
              placeholder="Enter your name"
              value={usernameInput}
              onChange={(e) => setUsernameInput(e.target.value)}
            />
            <button onClick={handleSubmitUsername}>Submit Score</button>
          </div>
        )}
      </div>
    </>
  );
}

export default Battle;
