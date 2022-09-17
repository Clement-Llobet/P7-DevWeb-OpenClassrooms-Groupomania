import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextType } from '../../interfaces/types.userContext';
import { UserContext } from '../../utils/context/context';
import { HeaderStyledComponent, HeaderNav, LogoImg } from './HeaderStyle';
import EmptyAvatar from '../../assets/EmptyAvatar.png';

interface IModerationRight {
  moderationRight: number | null;
}

const Header: React.FC<IModerationRight> = ({ moderationRight }) => {
  const { user } = React.useContext(UserContext) as UserContextType;
  console.log(user);

  useEffect(() => {}, [user]);

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
        <li className="go-to-profile-page">
          <Link to={`/employee/${36}`}>
            <img
              src={EmptyAvatar}
              // {
              //   user[0].profilePicture === undefined
              //     ? EmptyAvatar
              //     : `${user[0].profilePicture}`
              // }
              alt="profil utilisateur"
            />
          </Link>
        </li>
      </HeaderNav>
    </HeaderStyledComponent>
  );
};

export default Header;
