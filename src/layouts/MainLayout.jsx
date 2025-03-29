import { Outlet } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

const MainLayout = () => {
	return (
		<>
			<Navbar />
			<div className="container mx-auto mt-16">
				<Outlet />
			</div>
			<Footer />
		</>
	);
};

export default MainLayout;
