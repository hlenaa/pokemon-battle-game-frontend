const PokeCard = ({ pokemon }) => {
	return (
		<div className="card bg-base-100 w-96 shadow-sm">
			<figure>
				<img
					src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
					alt="Pokemon"
				/>
			</figure>
			<div className="card-body">
				<h2 className="card-title">PokemonName</h2>
				<div className="card-actions justify-end">
					<button className="btn btn-primary">Buy Now</button>
				</div>
			</div>
		</div>
	);
};

export default PokeCard;
