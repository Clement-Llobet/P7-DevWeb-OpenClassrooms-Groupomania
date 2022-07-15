import { Link } from 'react-router-dom';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  email: string;
  password: string;
}

const Login: FC = () => {
  const [name, setName] = useState('Clément');
  const { register, handleSubmit, setError } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section>
      <h2>Connexion à Groupomania</h2>
      <form action="" onSubmit={onSubmit}>
        <fieldset>
          <legend>Connexion</legend>

          <label>Email</label>
          <input
            {...register('email', {
              required: true,
            })}
            type="email"
            name="email"
            id="employee_email"
          />

          <label>Mot de passe</label>
          <input
            {...register('password')}
            type="password"
            name="password"
            id="employee_password"
            required
          />
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
