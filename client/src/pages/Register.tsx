import { SyntheticEvent, useEffect, useState } from 'react';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [moderation, setModeration] = useState<boolean | null>(null);
  const [profilePicture, setProfilePicture] = useState('');

  const checkAndSetName = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setName('');
    } else {
      setName(input.value);
    }
    console.log(name);
  };

  const checkAndSetSurname = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setSurname('');
    } else {
      setSurname(input.value);
    }
    console.log(surname);
  };

  const checkAndSetEmail = (input: string) => {
    if (!regexEmail.exec(input)) {
      setEmail('');
    } else {
      setEmail(input);
    }
    console.log(email);
  };

  const checkAndSetPassword = (input: HTMLInputElement) => {
    if (input.value.length < 3) {
      setPassword('');
    } else {
      setPassword(input.value);
    }
    console.log(password);
  };

  const checkAndSetModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setModeration(true);
    } else if (option.value === 'non-executive') {
      setModeration(false);
    } else {
      setModeration(null);
    }

    console.log(moderation);
  };

  const manageProfilePicture = async (data: HTMLInputElement) => {
    const file: FileList | null = data.files;

    if (file === null) {
      setProfilePicture('');
      return;
    }

    setProfilePicture(URL.createObjectURL(file[0]));
    console.log(profilePicture);
  };

  const handleSubmit = async () => {
    console.log(
      name +
        ' === ' +
        surname +
        ' === ' +
        email +
        ' === ' +
        password +
        ' === ' +
        moderation +
        ' === ' +
        profilePicture
    );

    // if (
    //   name === '' ||
    //   surname === '' ||
    //   email === '' ||
    //   password === '' ||
    //   moderation === null
    // ) {
    //   console.log('Il y a une erreur');
    //   return Error;
    // } else {
    //   console.log("Pas d'erreur. Création de l'objet en cours.");

    // let data: registerData = {
    //   name: name,
    //   surname: surname,
    //   email: email,
    //   password: password,
    //   moderation: moderation,
    //   profilePicture: profilePicture,
    // };

    let data: EmployeesData = {
      name: 'Test',
      surname: 'Ceci est un',
      email: 'ceciestuntest@mail.com',
      password: 'dev',
      moderation: false,
      profilePicture:
        'blob:http://localhost:3000/f347cae0-2c97-4461-929b-a6d557704be1',
    };

    console.log(
      "L'objet a les caractéristiques suivantes : ========== " + data
    );

    await api.apiEmployeesSignUp(data);
    // }
  };

  return (
    <section>
      <h1>Inscrivez-vous</h1>
      <form>
        <fieldset>
          <legend>Inscription</legend>
          <label>Nom</label>
          <input
            type="text"
            name="name"
            id="registration_name"
            required
            onBlur={(e: SyntheticEvent) =>
              checkAndSetName(e.currentTarget as HTMLInputElement)
            }
          />

          <label>Prénom</label>
          <input
            type="text"
            name="surname"
            id="registration_surname"
            required
            onBlur={(e: SyntheticEvent) =>
              checkAndSetSurname(e.currentTarget as HTMLInputElement)
            }
          />

          <label>Email</label>
          <input
            type="email"
            id="registration_email"
            required
            onBlur={(e) => checkAndSetEmail(e.target.value)}
          />

          <label>Mot de passe</label>
          <input
            type="password"
            name="password"
            id="registration_password"
            required
            onBlur={(e: SyntheticEvent) =>
              checkAndSetPassword(e.currentTarget as HTMLInputElement)
            }
          />

          <label>Statut</label>
          <select
            name="status"
            id="registration_status"
            required
            onChange={(e: SyntheticEvent) =>
              checkAndSetModeration(e.currentTarget as HTMLSelectElement)
            }
          >
            <option value="choose-status">Votre statut</option>
            <option value="executive">Cadre</option>
            <option value="non-executive">Non-cadre</option>
          </select>

          <label>Avatar</label>
          <legend>Type d'images acceptées : JPEG, JPG, PNG, WEBP</legend>
          <input
            type="file"
            id="registration_avatar"
            multiple={false}
            accept=".jpeg, .jpg, .png, .webp"
            onChange={(e: SyntheticEvent) =>
              manageProfilePicture(e.currentTarget as HTMLInputElement)
            }
          />
          <img src={profilePicture} alt="" />
        </fieldset>
      </form>
      <button onClick={handleSubmit}>Valider</button>
    </section>
  );
};

export default Register;
