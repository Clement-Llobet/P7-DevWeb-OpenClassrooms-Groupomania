import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextType } from '../../interfaces/types.userContext';
import { UserContext } from '../../utils/context/context';
import { HeaderStyledComponent, HeaderNav, LogoImg } from './HeaderStyle';
import EmptyAvatar from '../../assets/EmptyAvatar.png';
import { ApiService } from '../../service/api.service';

const api = new ApiService('http://localhost:8000/');

interface IModerationRight {
  moderationRight: number | undefined;
}

const Header: React.FC<IModerationRight> = ({ moderationRight }) => {
  const { user } = React.useContext(UserContext) as UserContextType;

  useEffect(() => {}, [user]);

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <HeaderStyledComponent>
      <div>
        <Link to="/Home">
          <LogoImg />
        </Link>
      </div>
      <HeaderNav>
        <ul>
          {moderationRight === 1 ? (
            <li className="user-actions">
              <Link to="/allEmployees">Modération</Link>
            </li>
          ) : null}
          <li className="user-actions" onClick={handleLogOut}>
            Déconnexion
          </li>
          {user && (
            <li className="go-to-profile-page">
              <Link to={`/employee/${user.id}`} state={user.moderation}>
                <img
                  src={
                    user.profilePicture ? `${user.profilePicture}` : EmptyAvatar
                  }
                  alt="profil utilisateur"
                />
              </Link>
            </li>
          )}
        </ul>
      </HeaderNav>
    </HeaderStyledComponent>
  );
};

export default Header;
