import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <div>
      <img src={''} alt="Logo Groupomania" />
      <nav>
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="#">Déconnexion</Link>
        </li>
      </nav>
    </div>
  );
};

export default Header;
