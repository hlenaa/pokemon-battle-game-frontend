import UserStat from "../components/UserStat";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

const Leaderboard = () => {
	const { status, setStatus, setLeaderboard, leaderboard, userScore } =
		useContext(AppContext);
	//get userScore from localStorage

	const fetchLeaderboard = async () => {
		setStatus("loading");

		try {
			const response = await fetch(
				`https://pokemon-battle-game-backend.onrender.com/users`
			);
			if (!response.ok) {
				throw new Error(
					`Failed fetching leaderboard data. Error Status: ${response.status}`
				);
			}
			const data = await response.json();
			console.log("Fetched leaderboard data:", data); // Debug log

			setLeaderboard([data]);
			setStatus("");
		} catch (error) {
			console.error(error);
			setStatus("error");
		}
	};

	useEffect(() => {
		fetchLeaderboard();
	}, []); //load data on mount

	return (
		<div className="flex flex-col gap-16 justify-center mx-40">
			{status === "loading" ? (
			<div className="flex flex-col items-center gap-4  w-64 mx-auto">
				<p>Your latest score:</p>
				<p>{userScore}</p>
			</div>
		) : leaderboard.length > 0 ? (
				leaderboard.map((user) => <UserStat key={user._id} user={user} />)
			) : (
				<p>No leaderboard data available.</p>
			)}
		</div>
	);
};

export default Leaderboard;
