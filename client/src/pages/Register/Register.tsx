import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeesData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { forbidAccessWithToken } from '../../service/access.service';
import { LogoImg, Wrapper } from './RegisterStyle';

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
  };

  const checkAndSetSurname = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setSurname('');
    } else {
      setSurname(input.value);
    }
  };

  const checkAndSetEmail = (input: string) => {
    if (!regexEmail.exec(input)) {
      setEmail('');
    } else {
      setEmail(input);
    }
  };

  const checkAndSetPassword = (input: HTMLInputElement) => {
    if (input.value.length < 3) {
      setPassword('');
    } else {
      setPassword(input.value);
    }
  };

  const checkAndSetModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setModeration('1');
    } else if (option.value === 'non-executive') {
      setModeration('0');
    } else {
      setModeration('');
    }
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
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    employeeToCreate.append('name', `${name}`);
    employeeToCreate.append('surname', `${surname}`);
    employeeToCreate.append('email', `${email}`);
    employeeToCreate.append('password', `${password}`);
    employeeToCreate.append('moderation', `${moderation}`);
    employeeToCreate.append('profilePicture', profilePicture!);

    console.log(Array.from(employeeToCreate));

    await api.apiEmployeesSignUp(employeeToCreate);
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
    <Wrapper>
      <LogoImg />
      <h1>Inscrivez-vous</h1>
      <form>
        <fieldset>
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
          <p>Type d'images acceptées : JPEG, JPG, PNG, WEBP</p>
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
        <button onClick={(e) => handleSubmit(e)}>Valider</button>
      </form>
    </Wrapper>
  );
};

export default Register;