const Footer = () => {
	return (
		<footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
			<nav className="grid grid-flow-col gap-4">
				<a className="link link-hover">Home</a>
				<a className="link link-hover">Leaderboard</a>
			</nav>
			<aside>
				<p>
					Copyright © {new Date().getFullYear()} - All right reserved by Ankit,
					Lena and Jackie <br /> WBS CODING SCHOOL BOOTCAMP 2024/2025 <br /> For
					more Infos visit <a href="https://pokeapi.co/">PokeAPI</a>
				</p>
			</aside>
		</footer>
	);
};

export default Footer;
