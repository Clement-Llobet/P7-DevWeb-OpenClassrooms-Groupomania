import { SyntheticEvent, useRef, useState } from 'react';
import { EmployeesData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { currentToken } from '../../service/getCurrentToken';
import DeleteEmployeeModal from './employee.deleteModal';

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
  const [errorUpdateMessage, setErrorUpdateMessage] = useState<boolean>(false);

  const checkAndUpdateModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setChangeModeration(true);
    } else if (option.value === 'non-executive') {
      setChangeModeration(false);
    } else {
      setChangeModeration(null);
    }
  };

  let employeeToUpdate: EmployeesData = {
    moderation: changeModeration,
  };

  const sendUpdateOrder = async () => {
    if (employeeToUpdate.moderation === null) {
      setErrorUpdateMessage(true);

      return;
    }
    await api.apiUpdateEmployees(currentToken, employeeToUpdate);
  };

  return (
    <div>
      <ul className="employees">
        {allEmployees?.map((employee) => (
          <li key={employee.id}>
            <div>
              <p>{employee.id}</p>
            </div>
            <div>
              <img
                src={employee.profilePicture}
                alt={`${employee.surname} ${employee.name} img`}
              />
            </div>
            <div>
              <p>
                {employee.surname} {employee.name}
              </p>
            </div>
            <div>
              <p>{employee.email}</p>
            </div>
            <>
              {changeModeration ? (
                <form action="">
                  <select
                    name="status"
                    id="registration_status"
                    required
                    onChange={(e: SyntheticEvent) =>
                      checkAndUpdateModeration(
                        e.currentTarget as HTMLSelectElement
                      )
                    }
                  >
                    <option value="choose-status">Votre statut</option>
                    <option value="executive">Cadre</option>
                    <option value="non-executive">Non-cadre</option>
                  </select>
                  <button onClick={sendUpdateOrder}>Valider</button>
                  <button
                    onClick={() => {
                      setChangeModeration(false);
                      setShowUpdateAndDeleteButtons(true);
                    }}
                  >
                    Annuler
                  </button>
                </form>
              ) : (
                `Modération : ${employee.moderation ? 'Oui' : 'Non'}`
              )}
              {deleteEmployee && <DeleteEmployeeModal />}
            </>
            {showUpdateAndDeleteButtons && (
              <div>
                <button
                  onClick={() => {
                    setChangeModeration(true);
                    setShowUpdateAndDeleteButtons(false);
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
