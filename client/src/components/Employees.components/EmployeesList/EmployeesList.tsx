import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import { EmployeesData } from '../../../interfaces';
import { ApiService } from '../../../service/api.service';
import { currentToken } from '../../../service/getCurrentToken';
import DeleteEmployeeModal from '../EmployeeActionModal/employee.deleteModal';
import UpdateEmployeeModal from '../EmployeeActionModal/employee.updateModal';
import { PostDetails } from './EmployeesListStyle';
import EmptyAvatar from '../../../assets/EmptyAvatar.png';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface EmployeesListProps {
  allEmployees: EmployeesData[] | null;
  employeesListSetter: Dispatch<SetStateAction<EmployeesData[] | null>>;
}

const EmployeesList: React.FC<EmployeesListProps> = ({
  allEmployees,
  employeesListSetter,
}) => {
  const [wantsToChange, setWantsToChange] = useState<boolean>(false);
  const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
  const [showUpdateAndDeleteButtons, setShowUpdateAndDeleteButtons] =
    useState<boolean>(true);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [moderation, setModeration] = useState<number | null>(null);

  const getEmployeeId = (element: HTMLLIElement) => {
    let liElementValue = element.closest('li')?.value;
    if (!liElementValue) return;
    setEmployeeId(liElementValue);
  };

  useEffect(() => {}, [moderation]);

  const sendUpdateOrder = async (
    e: React.MouseEvent,
    employee: EmployeesData
  ) => {
    e.preventDefault();
    if (moderation === null) return;

    let employeeToUpdate = new FormData();
    employeeToUpdate.append('id', employee.id!.toString());
    employeeToUpdate.append('moderation', moderation.toString());

    await api.apiUpdateEmployees(currentToken(), employeeToUpdate);
    const callApi = await api.apiGetAllEmployees(currentToken());
    employeesListSetter(callApi);
  };

  const resetModeration = async (employee: EmployeesData) => {
    const callApi = await api.apiGetEmployeeById(
      currentToken(),
      employeeId.toString()
    );
    setModeration(callApi.moderation);
  };

  return (
    <PostDetails>
      <ul className="employees">
        <li className="li-head employee-row">
          <div className="employee-row__id">Id</div>
          <div className="employee-row__avatar">Avatar</div>
          <div className="employee-row__surname">Prénom</div>
          <div className="employee-row__name">Nom</div>
          <div className="employee-row__email">Email</div>
          <div className="employee-row__moderation">Modération</div>
          <div className="employee-row__action">Actions</div>
        </li>
        {allEmployees?.map((employee) => (
          <li key={employee.id} value={employee.id} className="employee-row">
            <div className="employee-row__id">
              <p>{employee.id}</p>
            </div>
            <div className="employee-row__avatar">
              {employee.profilePicture ? (
                <img src={`${employee.profilePicture}`} alt="profil" />
              ) : (
                <img src={EmptyAvatar} alt="profil" />
              )}
            </div>
            <div className="employee-row__surname">{employee.surname}</div>
            <div className="employee-row__name">{employee.name}</div>
            <div className="employee-row__email">{employee.email}</div>
            <div className="employee-row__moderation">
              {!showUpdateAndDeleteButtons &&
              wantsToChange &&
              employee.id === employeeId ? (
                <UpdateEmployeeModal
                  showUpdateAndDeleteButtons={showUpdateAndDeleteButtons}
                  setShowUpdateAndDeleteButtons={setShowUpdateAndDeleteButtons}
                  moderationSetter={setModeration}
                />
              ) : (
                `${employee.moderation ? 'Oui' : 'Non'}`
              )}
            </div>
            <div className="employee-row__action">
              {showUpdateAndDeleteButtons ? (
                <div className="employee-row__update-and-delete button-container">
                  <button
                    onClick={(e: SyntheticEvent) => {
                      setWantsToChange(true);
                      setWantsToDelete(false);
                      setShowUpdateAndDeleteButtons(false);
                      getEmployeeId(e.currentTarget as HTMLLIElement);
                      // saveCurrentModeration(employee);
                    }}
                  >
                    Modifier
                  </button>
                  <button
                    onClick={(e: SyntheticEvent) => {
                      setWantsToDelete(true);
                      setWantsToChange(false);
                      setShowUpdateAndDeleteButtons(false);
                      getEmployeeId(e.currentTarget as HTMLLIElement);
                    }}
                  >
                    Supprimer
                  </button>
                </div>
              ) : (
                !showUpdateAndDeleteButtons &&
                !wantsToDelete &&
                employee.id === employeeId && (
                  <div className="button-container">
                    <button
                      onClick={(e) => {
                        sendUpdateOrder(e, employee);
                        setShowUpdateAndDeleteButtons(true);
                      }}
                    >
                      Valider
                    </button>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setShowUpdateAndDeleteButtons(true);
                        resetModeration(employee);
                      }}
                    >
                      Annuler
                    </button>
                  </div>
                )
              )}

              {!showUpdateAndDeleteButtons &&
                wantsToDelete &&
                employee.id === employeeId && (
                  <DeleteEmployeeModal
                    employee={employee}
                    showUpdateAndDeleteButtons={showUpdateAndDeleteButtons}
                    setShowUpdateAndDeleteButtons={
                      setShowUpdateAndDeleteButtons
                    }
                    employeesListSetter={employeesListSetter}
                  />
                )}
            </div>
          </li>
        ))}
      </ul>
    </PostDetails>
  );
};

export default EmployeesList;
