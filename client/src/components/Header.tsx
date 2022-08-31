import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface IModerationRight {
  moderationRight: number | null;
}

const Header: React.FC<IModerationRight> = ({ moderationRight }) => {
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
        {moderationRight ? (
          <li>
            <Link to="/allEmployees">Modération</Link>
          </li>
        ) : null}
        <li onClick={handleLogOut}>Déconnexion</li>
      </nav>
    </div>
  );
};

export default Header;
