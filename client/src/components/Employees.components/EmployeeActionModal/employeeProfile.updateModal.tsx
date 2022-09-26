import React, { SyntheticEvent, useState } from 'react';
import { EmployeesData } from '../../../interfaces';
import { UserContextType } from '../../../interfaces/types.userContext';
import { ApiService } from '../../../service/api.service';
import { currentToken } from '../../../service/getCurrentToken';
import { UserContext } from '../../../utils/context/context';

const api = new ApiService('http://localhost:8000/');

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface IUpdateEmployeeProfile {
  singleEmployee: EmployeesData | null;
  employeeId: string | undefined;
  singleEmployeeSetter: React.Dispatch<
    React.SetStateAction<EmployeesData | null>
  >;
  isModifyingSetter: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateEmployeeProfile: React.FC<IUpdateEmployeeProfile> = ({
  singleEmployee,
  singleEmployeeSetter,
  employeeId,
  isModifyingSetter,
}) => {
  const { user } = React.useContext(UserContext) as UserContextType;

  const [name, setName] = useState<string>(user!.name);
  const [surname, setSurname] = useState<string>(user!.surname);
  const [email, setEmail] = useState<string>(user!.email);
  const [password, setPassword] = useState<string>();
  const [profilePicture, setProfilePicture] = useState<string | File>(
    user!.profilePicture!
  );

  let employeeToCreate = new FormData();

  const checkAndSetName = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setName(user!.name);
      return;
    } else {
      setName(input.value);
    }
  };

  const checkAndSetSurname = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setSurname(user!.surname);
    } else {
      setSurname(input.value);
    }
  };

  const checkAndSetEmail = (input: string) => {
    if (!regexEmail.exec(input)) {
      setEmail(user!.email);
    } else {
      setEmail(input);
    }
  };

  const checkAndSetPassword = (input: HTMLInputElement) => {
    if (input.value.length < 3) {
      return;
    } else {
      setPassword(input.value);
    }
  };

  const manageProfilePicture = (data: HTMLInputElement) => {
    const fileResult: FileList | null = data.files;

    if (fileResult === null || fileResult === undefined) {
      return;
    }

    let file: File = fileResult[0];

    if (!file) return;
    file.name.replace(/\s+/g, '_');
    setProfilePicture(file);
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    employeeToCreate.append('id', employeeId!);
    employeeToCreate.append('name', `${name}`);
    employeeToCreate.append('surname', `${surname}`);
    employeeToCreate.append('email', `${email}`);

    if (password !== undefined && password.length >= 3) {
      employeeToCreate.append('password', `${password}`);
    }

    if (profilePicture !== undefined) {
      employeeToCreate.append('picture', profilePicture!);
    }

    await api.apiUpdateEmployees(currentToken(), employeeToCreate);
    const updatedSingleEmployee = await api.apiGetEmployeeById(
      currentToken(),
      employeeId
    );
    singleEmployeeSetter(updatedSingleEmployee);
    user!.profilePicture = updatedSingleEmployee.profilePicture;
    isModifyingSetter(false);
  };

  return (
    <div className="employee-profile__modify">
      <div className="employee-profile__modify__header">
        <div>
          <label htmlFor="modify-profile-file">Avatar : </label>
          <img src={`${singleEmployee?.profilePicture}`} alt="Avatar" />
          <input
            type="file"
            id="modify-profile-file"
            multiple={false}
            accept=".jpeg, .jpg, .png, .webp"
            onChange={(e: SyntheticEvent) =>
              manageProfilePicture(e.currentTarget as HTMLInputElement)
            }
          />
        </div>

        <div className="employee-profile__modify__header__name-and-surname">
          <label htmlFor="modify-profile-surname">Prénom</label>
          <input
            type="text"
            id="modify-profile-surname"
            name="surname"
            required
            onBlur={(e: SyntheticEvent) =>
              checkAndSetSurname(e.currentTarget as HTMLInputElement)
            }
          />

          <label htmlFor="modify-profile-name">Nom</label>
          <input
            type="text"
            id="modify-profile-name"
            name="name"
            required
            onBlur={(e: SyntheticEvent) =>
              checkAndSetName(e.currentTarget as HTMLInputElement)
            }
          />
        </div>
      </div>
      <hr className="modify" />
      <div>
        <label htmlFor="modify-profile-email">Email</label>
        <input
          type="email"
          id="modify-profile-email"
          required
          onBlur={(e) => checkAndSetEmail(e.target.value)}
        />
      </div>
      <hr className="modify" />
      <div>
        <label htmlFor="modify-profile-password">Mot de passe</label>
        <input
          type="password"
          id="modify-profile-password"
          name="password"
          required
          onBlur={(e: SyntheticEvent) =>
            checkAndSetPassword(e.currentTarget as HTMLInputElement)
          }
        />
      </div>
      <div className="employee-profile__modify__buttons">
        <button onClick={(e) => handleSubmit(e)}>Valider</button>
        <button onClick={() => isModifyingSetter(false)}>Annuler</button>
      </div>
    </div>
  );
};

export default UpdateEmployeeProfile;
