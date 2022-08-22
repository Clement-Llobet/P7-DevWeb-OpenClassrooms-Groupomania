import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiService } from '../service/api.service';
import { currentToken } from '../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Header: React.FC = () => {
  const [employeesListAccess, setEmployeesListAccess] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmployeesListAccess = async () => {
    let findToken = localStorage.getItem('token');

    await api.apiGetEmployeeById(currentToken);
  };

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
        {employeesListAccess && (
          <li>
            <Link to="/allEmployees">Modération</Link>
          </li>
        )}
        <li onClick={handleLogOut}>Déconnexion</li>
      </nav>
    </div>
  );
};

export default Header;
