import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderStyledComponent, HeaderNav, LogoImg } from './HeaderStyle';

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
    <HeaderStyledComponent>
      <HeaderNav>
        <li>
          <Link to="/Home">
            <LogoImg />
          </Link>
        </li>
        {moderationRight ? (
          <li className="user-actions">
            <Link to="/allEmployees">Modération</Link>
          </li>
        ) : null}
        <li className="user-actions" onClick={handleLogOut}>
          {/* <i className="fa-solid fa-arrow-up-left-from-circle"></i> */}
          Déconnexion
        </li>
      </HeaderNav>
    </HeaderStyledComponent>
  );
};

export default Header;
