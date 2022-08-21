import { SyntheticEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Register: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [moderation, setModeration] = useState<boolean | null>(null);
  const [profilePicture, setProfilePicture] = useState<string>('');

  const navigate = useNavigate();

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

  let employeeToCreate: EmployeesData = {
    name: name,
    surname: surname,
    email: email,
    password: password,
    moderation: moderation,
    profilePicture: profilePicture,
  };

  useEffect(() => {
    employeeToCreate.name = name;
    employeeToCreate.surname = surname;
    employeeToCreate.email = email;
    employeeToCreate.password = password;
    employeeToCreate.moderation = moderation;
    employeeToCreate.profilePicture = profilePicture;

    console.log(employeeToCreate);
  });

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

    console.log(
      "L'objet a les caractéristiques suivantes : ========== " +
        employeeToCreate
    );

    const signupResult = await api.apiEmployeesSignUp(employeeToCreate);
    handleRedirect(signupResult.token);
  };

  const handleRedirect = (res: any) => {
    if (res) {
      navigate(`/Home`);
    } else {
      console.log(Error);
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
          <img src={profilePicture} alt="" />
        </fieldset>
      </form>
      <button onClick={handleSubmit}>Valider</button>
    </section>
  );
};

export default Register;
