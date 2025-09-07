import { Link } from 'react-router-dom';
import { FaHeart, FaHome } from "react-icons/fa";
import '../style/Navbar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">TMDBFlix</Link>
            <div className="nav-links">
                <Link to="/"><FaHome /> Início</Link>
                <Link to="/favorites"><FaHeart /> Favoritos</Link>
            </div>
        </nav>
    );
};
export default NavBar;