import { SyntheticEvent, useState } from 'react';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';
import DeleteEmployeeModal from './employee.deleteModal';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

interface EmployeesListProps {
  allEmployees: EmployeesData[] | null;
}

const EmployeesList: React.FC<EmployeesListProps> = ({ allEmployees }) => {
  const [changeModeration, setChangeModeration] = useState<boolean | null>(
    null
  );
  const [deleteEmployee, setDeleteEmployee] = useState<boolean | null>(null);

  const checkAndUpdateModeration = async (option: HTMLSelectElement) => {
    if (option.value === 'executive') {
      setChangeModeration(true);
    } else if (option.value === 'non-executive') {
      setChangeModeration(false);
    } else {
      setChangeModeration(null);
    }

    console.log(changeModeration);
  };

  return (
    <div>
      <ul className="employees">
        {allEmployees?.map((employee) => (
          <li key={employee.id}>
            <img src="" alt="" />
            <h2>
              {employee.surname} {employee.name}
            </h2>
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
                </form>
              ) : (
                'Modération :' + employee.moderation
              )}
              {deleteEmployee && <DeleteEmployeeModal />}
            </>
            <p onClick={() => setChangeModeration(true)}>Modifier</p>
            <p onClick={() => setDeleteEmployee(true)}>Supprimer</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeesList;
