import { SyntheticEvent, useEffect, useState } from 'react';
import { EmployeesData } from '../../interfaces';
import { forbidAccessWithoutModeration } from '../../service/access.service';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';
import DeleteEmployeeModal from './employee.deleteModal';
import UpdateEmployeeModal from './employee.updateModal';

interface EmployeesListProps {
  allEmployees: EmployeesData[] | null;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ allEmployees }) => {
  const [changeModeration, setChangeModeration] = useState<boolean>(false);
  const [wantsToChange, setWantsToChange] = useState<boolean>(false);
  const [wantsToDelete, setWantsToDelete] = useState<boolean>(false);
  const [showUpdateAndDeleteButtons, setShowUpdateAndDeleteButtons] =
    useState<boolean>(true);
  const [showDeleteButtons, setShowDeleteButtons] = useState<boolean>(true);
  const [employeeId, setEmployeeId] = useState<number>(0);

  const getEmployeeId = (element: HTMLLIElement) => {
    let liElementValue = element.closest('li')?.value;
    if (!liElementValue) return;
    setEmployeeId(liElementValue);
    setChangeModeration(true);
  };

  useEffect(() => {
    forbidAccessWithoutModeration(currentToken());
  }, [allEmployees]);

  return (
    <div>
      <ul className="employees">
        {allEmployees?.map((employee) => (
          <li key={employee.id} value={employee.id}>
            <div>
              <p>{employee.id}</p>
            </div>
            <div>
              {employee.profilePicture ? (
                <img
                  // src={employee.profilePicture}
                  alt="profil"
                />
              ) : (
                <img
                  // src={employee.profilePicture}
                  alt="profil"
                />
              )}
            </div>
            <div>
              <p>
                {employee.surname} {employee.name}
              </p>
            </div>
            <div>
              <p>{employee.email}</p>
            </div>
            {showUpdateAndDeleteButtons && (
              <div>
                <button
                  onClick={(e: SyntheticEvent) => {
                    setWantsToChange(true);
                    setWantsToDelete(false);
                    setShowUpdateAndDeleteButtons(false);
                    getEmployeeId(e.currentTarget as HTMLLIElement);
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
            )}
            {!showUpdateAndDeleteButtons &&
            wantsToChange &&
            employee.id === employeeId ? (
              <UpdateEmployeeModal
                employee={employee}
                showUpdateAndDeleteButtons={showUpdateAndDeleteButtons}
              />
            ) : (
              `Modération : ${employee.moderation ? 'Oui' : 'Non'}`
            )}
            {!showUpdateAndDeleteButtons &&
              wantsToDelete &&
              employee.id === employeeId && (
                <DeleteEmployeeModal
                  employee={employee}
                  showDeleteButtons={showDeleteButtons}
                />
              )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesList;
