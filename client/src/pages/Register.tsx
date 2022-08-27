import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';
import { forbidAccessWithToken } from '../service/checkLocalStorage';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [moderation, setModeration] = useState<string>('0');
  const [profilePicture, setProfilePicture] = useState<string | File>();

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithToken(navigate);
  });

  let employeeToCreate = new FormData();

  const checkAndSetName = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setName('');
    } else {
      setName(input.value);
    }
    employeeToCreate.append('name', name);
  };

  const checkAndSetSurname = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setSurname('');
    } else {
      setSurname(input.value);
    }
    employeeToCreate.append('surname', surname);
  };

  const checkAndSetEmail = (input: string) => {
    if (!regexEmail.exec(input)) {
      setEmail('');
    } else {
      setEmail(input);
    }
    employeeToCreate.append('email', email);
  };

  const checkAndSetPassword = (input: HTMLInputElement) => {
    if (input.value.length < 3) {
      setPassword('');
    } else {
      setPassword(input.value);
    }
    employeeToCreate.append('password', password);
  };

  const checkAndSetModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setModeration('1');
    } else if (option.value === 'non-executive') {
      setModeration('0');
    } else {
      setModeration('');
    }
    employeeToCreate.append('moderation', moderation);
  };

  const manageProfilePicture = (data: HTMLInputElement) => {
    const fileResult: FileList | null = data.files;

    if (fileResult === null || fileResult === undefined) {
      setProfilePicture('');
      return;
    }

    let file: File = fileResult[0];

    if (!file) return;

    file.name.replace(/\s+/g, '_');
    setProfilePicture(file);
    employeeToCreate.append('profilePicture', profilePicture!);
  };

  const handleSubmit = async () => {
    console.log(await employeeToCreate);

    // const signupResponse = await api.apiEmployeesSignUp(employeeToCreate);
    // handleRedirect(signupResponse.token);
  };

  const handleRedirect = (token: string) => {
    if (token) {
      navigate(`/Home`);
    } else {
      return Error;
    }
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
          {/* <img src={profilePicture} alt="" /> */}
        </fieldset>
      </form>
      <button onClick={handleSubmit}>Valider</button>
    </section>
  );
};

export default Register;
