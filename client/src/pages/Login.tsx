import { Link } from 'react-router-dom';
import React, { FC, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ApiService } from '../service/api.service';

// interface FormData {
//   email: string;
//   password: string;
// }
const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const { register, handleSubmit } = useForm<FormData>();

  useEffect(() => {
    const employeeLogin = async () => {
      const response = await api.apiEmployeesLogin();
      console.log(response);
    };
    employeeLogin();
  }, []);

  const checkEmail = (data: any) => {
    if (!regex.exec(data)) {
      console.log("Le format de l'email n'est pas bon");
    } else {
      setEmail(data);
    }
  };

  const checkPassword = (data: any) => {
    if (!data) {
      console.log('Le format du mot de passe est invalide');
    } else {
      setPassword(data);
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
      <button>Valider</button>

      <p>
        Pas encore inscrit ? <Link to="/register">Connectez-vous ici</Link>
      </p>
    </section>
  );
};

export default Login;
