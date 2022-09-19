import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContextType } from '../../interfaces/types.userContext';
import { UserContext } from '../../utils/context/context';
import { HeaderStyledComponent, HeaderNav, LogoImg } from './HeaderStyle';
import EmptyAvatar from '../../assets/EmptyAvatar.png';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface IModerationRight {
  moderationRight: number | null;
}

const Header: React.FC<IModerationRight> = ({ moderationRight }) => {
  const { user, saveUser } = React.useContext(UserContext) as UserContextType;
  console.log(user);

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
        {moderationRight ? (
          <li className="user-actions">
            <Link to="/allEmployees">Modération</Link>
          </li>
        ) : null}
        <li className="user-actions" onClick={handleLogOut}>
          {/* <i className="fa-solid fa-arrow-up-left-from-circle"></i> */}
          Déconnexion
        </li>
        {user[0] && (
          <li className="go-to-profile-page">
            <Link to={`/employee/${user[0].id}`}>
              <img
                src={
                  user[0].profilePicture
                    ? `${user[0].profilePicture}`
                    : EmptyAvatar
                }
                alt="profil utilisateur"
              />
            </Link>
          </li>
        )}
      </HeaderNav>
    </HeaderStyledComponent>
  );
};

export default Header;
