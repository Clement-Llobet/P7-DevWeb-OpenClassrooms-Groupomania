import { MutableRefObject, SyntheticEvent, useRef, useState } from 'react';
import { EmployeesData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';
import DeleteEmployeeModal from './employee.deleteModal';
import UpdateEmployeeModal from './employee.updateModal';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface EmployeesListProps {
  allEmployees: EmployeesData[] | null;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ allEmployees }) => {
  const [changeModeration, setChangeModeration] = useState<boolean | null>(
    null
  );
  const [deleteEmployee, setDeleteEmployee] = useState<boolean>(false);
  const [showUpdateAndDeleteButtons, setShowUpdateAndDeleteButtons] =
    useState<boolean>(true);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [updateThisPost, setUpdateThisPost] = useState<boolean>(false);
  const [errorUpdateMessage, setErrorUpdateMessage] = useState<boolean>(false);

  const getEmployeeId = (element: HTMLLIElement) => {
    let liElementValue = element.closest('li')?.value;
    if (!liElementValue) return;
    setEmployeeId(liElementValue);
    setChangeModeration(true);
  };

  let employeeToUpdate: EmployeesData = {
    moderation: changeModeration,
  };

  const sendUpdateOrder = async () => {
    if (employeeToUpdate.moderation === null) {
      setErrorUpdateMessage(true);
      return;
    }
    await api.apiUpdateEmployees(currentToken(), employeeToUpdate);
  };

  return (
    <div>
      <ul className="employees">
        {allEmployees?.map((employee) => (
          <li key={employee.id} value={employee.id}>
            <div>
              <p>{employee.id}</p>
            </div>
            <div>
              {/* <img
                src={employee.profilePicture}
                alt={`${employee.surname} ${employee.name} img`}
              /> */}
            </div>
            <div>
              <p>
                {employee.surname} {employee.name}
              </p>
            </div>
            <div>
              <p>{employee.email}</p>
            </div>
            <div>
              {!showUpdateAndDeleteButtons && employee.id === employeeId ? (
                <UpdateEmployeeModal
                  employee={employee}
                  showUpdateAndDeleteButtons={showUpdateAndDeleteButtons}
                />
              ) : (
                `Modération : ${employee.moderation ? 'Oui' : 'Non'}`
              )}
            </div>

            {deleteEmployee && <DeleteEmployeeModal />}
            {showUpdateAndDeleteButtons && (
              <div>
                <button
                  onClick={(e: SyntheticEvent) => {
                    setShowUpdateAndDeleteButtons(false);
                    getEmployeeId(e.currentTarget as HTMLLIElement);
                  }}
                >
                  Modifier
                </button>
                <button onClick={() => setDeleteEmployee(true)}>
                  Supprimer
                </button>
              </div>
            )}

            {/* {errorUpdateMessage && (
              <div>
                <p>
                  Attention ! Vous devez sélectionner un statut pour cet
                  employé.
                </p>
              </div>
            )} */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesList;
