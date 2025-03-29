const UserStat = (user) => {
	return (
		<div className="card bg-base-100 w-96 shadow-sm">
			<div>
				<figure>
					<img
						src={`https://api.dicebear.com/9.x/identicon/svg`}
						alt={user.name}
                        className="rounded-full w-8 h-8"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">{user.name}</h2>
				</div>
			</div>
			<div>
				<p>{user.score}</p>
			</div>
		</div>
	);
};

export default UserStat;
