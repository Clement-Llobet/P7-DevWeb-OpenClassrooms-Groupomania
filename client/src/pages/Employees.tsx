import React, { useEffect, useState } from 'react';
import EmployeesList from '../components/Employees.components/EmployeesList';
import Header from '../components/Header';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';
import { useNavigate } from 'react-router-dom';
import {
  forbidAccessWithoutModerationRight,
  forbidAccessWithoutToken,
} from '../service/access.service';
import { currentToken } from '../service/getCurrentToken';
import { UserContext } from '../utils/context';
import { UserContextType } from '../interfaces/types.userContext';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<EmployeesData[] | null>(
    null
  );
  const [employeesList, setEmployeesList] = useState(false);
  const { user } = React.useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
    forbidAccessWithoutModerationRight(navigate, user);
  });

  useEffect(() => {
    const getAllEmployees = async () => {
      const data = await api.apiGetAllEmployees(currentToken());
      setAllEmployees(data);
      setEmployeesList(true);
    };
    if (allEmployees === null) {
      getAllEmployees();
    }
  }, [employeesList, allEmployees]);

  return (
    <main>
      <Header moderationRight={user[0] && user[0].moderation} />
      <section>
        <h2>Les employés de Groupomania :</h2>
        <EmployeesList allEmployees={allEmployees} />
      </section>
    </main>
  );
};

export default Employees;
