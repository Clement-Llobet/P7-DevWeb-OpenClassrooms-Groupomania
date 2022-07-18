import { useEffect, useState } from 'react';

const Register: React.FC = () => {
  const [register, isRegister] = useState(false);

  useEffect(() => {
    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({
    //     name: 'Bidule',
    //     surname: 'MachinChouette',
    //     email: 'machinchouettebidule@mail.com',
    //     password: ',kjfhfbwdf,sdjfkn!è§',
    //     moderation: 0,
    //     profilePicture:
    //       'https://upload.chien.com/img_global/24-comportement-education-du-chien/les-problemes-comportementaux-du-chien/_light-17621-pourquoi-les-chiens-ont-plus-de-problemes-de-comportement-de-nos-jours.jpg',
    //   }),
    // };
    // const signUp = () => {
    //   fetch(`https://localhost:8000/api/signup`, requestOptions)
    //     .then((response) => response.json())
    //     .then(({ data }) => console.log(data))
    //     .catch((error) => console.log(error));
    // };
    // signUp();
  }, []);

  return (
    <section>
      <h1>Inscrivez-vous</h1>
      <form>
        <fieldset>
          <legend>Inscription</legend>
          <label>Nom</label>
          <input type="text" name="name" id="registration_name" required />

          <label>Prénom</label>
          <input
            type="text"
            name="surname"
            id="registration_surname"
            required
          />

          <label>Email</label>
          <input type="email" id="registration_email" required />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            id="registration_password"
            required
          />

          <label>Statut</label>
          <select name="status" id="registration_status" required>
            <option value="executive">Votre statut</option>
            <option value="executive">Cadre</option>
            <option value="non-executive">Non-cadre</option>
          </select>

          <label>Avatar</label>
          <input type="text" id="registration_avatar" />
        </fieldset>
      </form>
      <button>Valider</button>
    </section>
  );
};

export default Register;
