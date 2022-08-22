import { useEffect, useState } from 'react';
import EmployeesList from '../components/Employees.components/EmployeesList';
import Header from '../components/Header';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';
import { useNavigate } from 'react-router-dom';
import { forbidAccessWithoutToken } from '../service/checkLocalStorage';
import { currentToken } from '../service/getCurrentToken';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<EmployeesData[] | null>(
    null
  );
  const [employeesList, setEmployeesList] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

  useEffect(() => {
    const getAllEmployees = async () => {
      const data = await api.apiGetAllEmployees(currentToken);
      setAllEmployees(data);
      setEmployeesList(true);
    };
    getAllEmployees();
  }, [employeesList]);

  return (
    <main>
      <Header />
      <section>
        <h2>Les employés de Groupomania :</h2>
        <EmployeesList allEmployees={allEmployees} />
      </section>
    </main>
  );
};

export default Employees;
