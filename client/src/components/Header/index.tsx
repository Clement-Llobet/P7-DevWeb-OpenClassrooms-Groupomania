import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav>
            <Link to="/">Accueil</Link>
            <Link to="/login">Connexion</Link>
        </nav>
    )
}

export default Header