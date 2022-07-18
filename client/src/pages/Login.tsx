import { Link } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

const regex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Login: FC = () => {
  const [name, setName] = useState('Clément');
  const [isEmail, setIsEmail] = useState(false);
  const { register, handleSubmit } = useForm<FormData>();
  // const [authData, setAuthData] = useState({});

  // useEffect(() => {
  //   fetch('https://localhost:8000/api/auth')
  //     .then((response) => response.json())
  //     .then(({ authData }) => console.log(authData))
  //     .catch((error) => console.log(error));
  // }, []);

  const OnSubmit = (data: any) => {
    console.log(data);
  };

  const isFunction = (input: any) => {
    console.log(input);
  };

  return (
    <section>
      <h2>Connexion à Groupomania</h2>
      <form action="">
        <fieldset>
          <legend>Connexion</legend>

          <label>Email</label>
          <input
            {...register('email', {
              required: true,
              // validate: input => isFunction(input)
            })}
            type="email"
            name="email"
            id="employee_email"
            onChange={OnSubmit}
          />
          <p id="invalid-email-text"></p>

          <label>Mot de passe</label>
          <input
            {...register('password')}
            type="password"
            name="password"
            id="employee_password"
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
