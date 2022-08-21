import { Link, useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div>
      <img src={''} alt="Logo Groupomania" />
      <nav>
        <li>
          <Link to="/Home">Accueil</Link>
        </li>
        <li onClick={handleLogOut}>Déconnexion</li>
      </nav>
    </div>
  );
};

export default Header;
