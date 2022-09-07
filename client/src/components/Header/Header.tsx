import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HeaderStyledComponent, HeaderNav, LogoImg } from './HeaderStyle';
import Logo from '../../assets/Logo.png';

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
          <li>
            <Link to="/allEmployees">Modération</Link>
          </li>
        ) : null}
        <li onClick={handleLogOut}>
          {/* <i className="fa-solid fa-arrow-up-left-from-circle"></i> */}
          Déconnexion
        </li>
      </HeaderNav>
    </HeaderStyledComponent>
  );
};

export default Header;
