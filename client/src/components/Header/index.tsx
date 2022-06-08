import { Outlet, Link } from "react-router-dom";

const Header: React.FC = () => {
    return (
        <div>
            <nav>
                <li>
                    <Link to="/">Accueil</Link>
                </li>
                <li>
                    <Link to="/login">Connexion</Link>
                </li>
            </nav>
            {/* <Outlet /> */}
        </div>
        
    )
}

export default Header