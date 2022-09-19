import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ApiService } from '../../service/api.service';
import { UserContext } from '../../utils/context/context';
import { IUser, UserContextType } from '../../interfaces/types.userContext';
import { forbidAccessWithToken } from '../../service/access.service';
import { LogoImg, Wrapper } from './RegisterStyle';
import { currentToken } from '../../service/getCurrentToken';
import { EmployeesData } from '../../interfaces';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string | File>();
  const [tryToValid, setTryToValid] = useState<boolean | null>(null);

  const navigate = useNavigate();

  const { user, saveUser } = React.useContext(UserContext) as UserContextType;

  useEffect(() => {
    forbidAccessWithToken(navigate);
  }, [tryToValid, navigate]);

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
    employeeToCreate.append('moderation', `0`);
    employeeToCreate.append('picture', profilePicture!);

    console.log(Array.from(employeeToCreate));

    const apiResponse = await api.apiEmployeesSignUp(employeeToCreate);
    delete apiResponse.token;

    const response = [apiResponse];
    saveUser(response);

    if (apiResponse) {
      setTryToValid(true);
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

      <p className="go-to-login">
        Déjà inscrit ? <Link to="/">Connectez-vous.</Link>
      </p>
    </Wrapper>
  );
};

export default Register;
