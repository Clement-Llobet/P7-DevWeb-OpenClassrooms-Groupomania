import { Link, useNavigate } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { ApiService } from '../service/api.service';
import { EmployeesLoginData } from '../interfaces';
import { forbidAccessWithToken } from '../service/checkLocalStorage';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [connected, setConnected] = useState(false);

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

  const handleSubmit = async (employee: EmployeesLoginData) => {
    if (email === '' || password === '') {
      return Error;
    } else {
      await api.apiEmployeesLogin(employee);
      handleRedirect();
      setConnected(true);
    }
  };

  const handleRedirect = () => {
    if (localStorage.getItem('token')) {
      navigate(`/Home`);
    } else {
      console.log(Error);
      return Error;
    }
  };

  return (
    <section>
      <h2>Connexion à Groupomania</h2>
      <form action="">
        <fieldset>
          <legend>Connexion</legend>

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
      </form>
      <button onClick={() => handleSubmit(employeeToLogin)}>Valider</button>

      <p>
        Pas encore inscrit ? <Link to="/register">Faites-le ici</Link>
      </p>
    </section>
  );
};

export default Login;
