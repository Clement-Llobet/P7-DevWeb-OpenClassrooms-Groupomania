import { useState } from 'react';
import { Url, URL } from 'url';
import { ApiService } from '../service/api.service';

interface registerData {
  name: string;
  surname: string;
  email: string;
  password: string | HashAlgorithmIdentifier;
  moderation: boolean;
  profilePicture: string;
}

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [moderation, setModeration] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');

  const checkEmail = (data: string) => {
    if (!regexEmail.exec(data)) {
      setEmail('');
      console.log(email);
    } else {
      setEmail(data);
    }
  };

  const checkPassword = (data: string) => {
    if (data.length <= 3) {
      setPassword('');
    } else {
      setPassword(data);
    }
  };

  const checkModeration = (data: any) => {
    console.log(data.value);

    if (data.value === 'executive') {
      setModeration(true);
      console.log(moderation);
    } else if (data.value === 'non-executive') {
      setModeration(false);
      console.log(moderation);
    } else {
      return Error;
    }
  };

  const manageProfilePicture = (e: any) => {
    // setProfilePicture(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async () => {
    if (email === '' || password === '') {
      return Error;
    } else {
      let data: registerData = {
        name: name,
        surname: surname,
        email: email,
        password: password,
        moderation: moderation,
        profilePicture: profilePicture,
      };
      await api.apiEmployeesLogin(data);
    }
  };

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
          <input
            type="email"
            id="registration_email"
            required
            onBlur={(e) => checkEmail(e.target.value)}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            id="registration_password"
            required
            onBlur={(e) => checkPassword(e.target.value)}
          />

          <label>Statut</label>
          <select name="status" id="registration_status" required>
            <option
              value="choose-status"
              onClick={(e) => checkModeration(e.target)}
            >
              Votre statut
            </option>
            <option
              value="executive"
              onClick={(e) => checkModeration(e.target)}
            >
              Cadre
            </option>
            <option
              value="non-executive"
              onClick={(e) => checkModeration(e.target)}
            >
              Non-cadre
            </option>
          </select>

          <label>Avatar</label>
          <legend>Type d'images acceptées : JPEG, JPG, PNG, WEBP</legend>
          <input
            type="file"
            id="registration_avatar"
            multiple={false}
            accept=".jpeg, .jpg, .png, .webp"
            onChange={(e) => manageProfilePicture(e)}
          />
          <img src={profilePicture} alt="" />
        </fieldset>
      </form>
      <button>Valider</button>
    </section>
  );
};

export default Register;
