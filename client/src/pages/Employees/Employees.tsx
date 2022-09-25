import React, { useEffect, useState } from 'react';
import EmployeesList from '../../components/Employees.components/EmployeesList/EmployeesList';
import Header from '../../components/Header/Header';
import { EmployeesData } from '../../interfaces';
import { ApiService } from '../../service/api.service';
import { useNavigate } from 'react-router-dom';
import {
  forbidAccessWithoutModerationRight,
  forbidAccessWithoutToken,
} from '../../service/access.service';
import { currentToken } from '../../service/getCurrentToken';
import { UserContext } from '../../utils/context/context';
import { UserContextType } from '../../interfaces/types.userContext';
import { Employee } from './EmployeeStyle';

const api = new ApiService('http://localhost:8000/');

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<EmployeesData[] | null>(
    null
  );
  const [employeesList, setEmployeesList] = useState(false);
  const { user } = React.useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
    forbidAccessWithoutModerationRight(navigate, user!);
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
      <Header moderationRight={user && user.moderation} />
      <Employee>
        <h1>Les employés de Groupomania :</h1>
        <EmployeesList
          allEmployees={allEmployees}
          employeesListSetter={setAllEmployees}
        />
      </Employee>
    </main>
  );
};

export default Employees;
