import React, { SyntheticEvent, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../service/api.service';
import { forbidAccessWithoutToken } from '../../service/access.service';
import { currentToken } from '../../service/getCurrentToken';
import { EmployeeIdParams } from '../../types/types';
import { EmployeesData } from '../../interfaces';
import { Main, ThisEmployeeProfile } from './EmployeeProfileStyle';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const regexEmail =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const EmployeeProfile = () => {
  const { id } = useParams<EmployeeIdParams>();
  // const { state } = useLocation();
  const { user } = React.useContext(UserContext) as UserContextType;

  const [singleEmployee, setSingleEmployee] = useState<EmployeesData | null>(
    null
  );
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [name, setName] = useState<string>(user[0].name);
  const [surname, setSurname] = useState<string>(user[0].surname);
  const [email, setEmail] = useState<string>(user[0].email);
  const [password, setPassword] = useState<string>();
  const [moderation, setModeration] = useState<string>(
    user[0].moderation.toString()
  );
  const [profilePicture, setProfilePicture] = useState<string | File>(
    user[0].profilePicture!
  );

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

  useEffect(() => {
    const getSingleEmployee = async () => {
      const data = await api.apiGetEmployeeById(currentToken(), id);
      setSingleEmployee(data);
    };
    getSingleEmployee();
  }, [id]);

  let employeeToCreate = new FormData();

  const checkAndSetName = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setName(user[0].name);
      return;
    } else {
      setName(input.value);
    }
  };

  const checkAndSetSurname = (input: HTMLInputElement) => {
    if (input.value.length < 2) {
      setSurname(user[0].surname);
    } else {
      setSurname(input.value);
    }
  };

  const checkAndSetEmail = (input: string) => {
    if (!regexEmail.exec(input)) {
      setEmail(user[0].email);
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

    employeeToCreate.append('id', id!);
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
      id
    );
    setSingleEmployee(updatedSingleEmployee);
    user[0].profilePicture = updatedSingleEmployee.profilePicture;
    setIsModifying(false);
  };

  return (
    <Main>
      <button>
        <Link to="/home">Retour</Link>
      </button>
      <ThisEmployeeProfile>
        {isModifying ? (
          <div className="employee-profile__modify">
            <div className="employee-profile__modify__header">
              <div>
                <img src={`${singleEmployee?.profilePicture}`} alt="Avatar" />
                <input
                  type="file"
                  multiple={false}
                  accept=".jpeg, .jpg, .png, .webp"
                  onChange={(e: SyntheticEvent) =>
                    manageProfilePicture(e.currentTarget as HTMLInputElement)
                  }
                />
              </div>

              <div>
                <label>Prénom</label>
                <input
                  type="text"
                  name="surname"
                  required
                  onBlur={(e: SyntheticEvent) =>
                    checkAndSetSurname(e.currentTarget as HTMLInputElement)
                  }
                />

                <label>Nom</label>
                <input
                  type="text"
                  name="name"
                  required
                  onBlur={(e: SyntheticEvent) =>
                    checkAndSetName(e.currentTarget as HTMLInputElement)
                  }
                />
              </div>
            </div>
            <hr />
            <div>
              <label>Email</label>
              <input
                type="email"
                required
                onBlur={(e) => checkAndSetEmail(e.target.value)}
              />
            </div>
            <hr />
            <div>
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
            </div>
            <div className="employee-profile__modify__buttons">
              <button onClick={(e) => handleSubmit(e)}>Valider</button>
              <button onClick={() => setIsModifying(false)}>Annuler</button>
            </div>
          </div>
        ) : (
          <div>
            <div className="employee-profile__header">
              <img src={`${singleEmployee?.profilePicture}`} alt="Avatar" />
              <div>
                <p>{singleEmployee?.surname}</p>
                <p>{singleEmployee?.name}</p>
              </div>
              <div className="employee-profile__button-actions">
                <button onClick={() => setIsModifying(true)}>Modifier</button>
                <button>Supprimer</button>
              </div>
            </div>
            <hr />
            <div>
              <p>Email : {singleEmployee?.email}</p>
            </div>
            <hr />
            <div>Mot de passe : ************</div>
          </div>
        )}
      </ThisEmployeeProfile>
    </Main>
  );
};

export default EmployeeProfile;
