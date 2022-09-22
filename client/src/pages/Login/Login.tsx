import { Link, useNavigate } from 'react-router-dom';
import React, { FC, useContext, useEffect, useState } from 'react';
import { ApiService } from '../../service/api.service';
import { EmployeesLoginData } from '../../interfaces';
import { forbidAccessWithToken } from '../../service/access.service';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { Wrapper, LogoImg } from './LoginStyle';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [deletedEmployeeMessage, setDeletedEmployeeMessage] =
    useState<boolean>(false);

  const { user, saveUser } = React.useContext(UserContext) as UserContextType;

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithToken(navigate);
  });

  let employeeToLogin: EmployeesLoginData = {
    email: email,
    password: password,
  };

  const checkEmail = (data: string) => {
    if (!regexEmail.exec(data)) {
      setEmail('');
    } else {
      setEmail(data);
    }
  };

  const checkPassword = (data: string) => {
    if (data.length < 3) {
      setPassword('');
    } else {
      setPassword(data);
    }
  };

  useEffect(() => {
    employeeToLogin.email = email;
    employeeToLogin.password = password;
  });

  const handleSubmit = async (
    e: React.MouseEvent,
    employee: EmployeesLoginData
  ) => {
    e.preventDefault();

    if (email === '' || password === '') {
      return Error;
    } else {
      const callApiLogin = await api.apiEmployeesLogin(employee);

      if (callApiLogin.status === 401 || callApiLogin.status === 400) {
        setDeletedEmployeeMessage(true);
        return;
      }
      getLoginedUserDatas(callApiLogin);
      localStorage.setItem('token', callApiLogin.token);
    }
  };

  const getLoginedUserDatas = async (thisUser: any) => {
    const callApi = await api.apiGetEmployeeById(
      thisUser.token,
      thisUser.userId.toString()
    );
    const response = [callApi];
    saveUser(response);
  };

  return (
    <Wrapper>
      <section className="Groupomania-logo">
        <LogoImg />
      </section>

      <section className="login-section">
        <h1>Connexion à Groupomania</h1>
        {deletedEmployeeMessage && (
          <div className="invalid-message">
            <p>Identifiant ou mot de passe incorrect.</p>
            <button onClick={() => setDeletedEmployeeMessage(false)}>
              Fermer
            </button>
          </div>
        )}
        <form action="">
          <fieldset>
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="employee_email"
              onBlur={(e) => checkEmail(e.target.value)}
              required
            />
            <p id="invalid-email-text"></p>

            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              id="employee_password"
              onBlur={(e) => checkPassword(e.target.value)}
              required
            />
            <p id="invalid-password-text"></p>
          </fieldset>

          <button onClick={(e) => handleSubmit(e, employeeToLogin)}>
            Valider
          </button>

          <p>
            Pas encore inscrit ? <Link to="/register">Faites-le ici</Link>
          </p>
        </form>
      </section>
    </Wrapper>
  );
};

export default Login;
