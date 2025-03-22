const NavBar = () => {
	return (
		<div className="navbar bg-base-100 shadow-sm">
			<div className="navbar-start">
				<div className="flex-none">
					<ul className="menu menu-horizontal px-1">
						<li>
							<a>Home</a>
						</li>
						<li>
							<details>
								<summary>Compete</summary>
								<ul className="bg-base-100 rounded-t-none p-2">
									<li>
										<a>My Roster</a>
									</li>
									<li>
										<a>Start a Battle!</a>
									</li>
									<li>
										<a>Leaderboard</a>
									</li>
								</ul>
							</details>
						</li>
					</ul>
				</div>
			</div>
			<div className="navbar-center">
				<a className="btn btn-ghost text-xl">PokeChamp</a>
			</div>
			<div className="navbar-end">
				<button className="btn btn-ghost btn-circle">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						{" "}
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>{" "}
					</svg>
				</button>
			</div>
		</div>
	);
};

export default NavBar;
