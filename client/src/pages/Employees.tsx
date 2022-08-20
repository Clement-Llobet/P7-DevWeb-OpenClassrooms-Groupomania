import { useEffect, useState } from 'react';
import EmployeesList from '../components/Employees.components/EmployeesList';
import Header from '../components/Header';
import { EmployeesData } from '../interfaces';
import { ApiService } from '../service/api.service';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const Employees = () => {
  const [allEmployees, setAllEmployees] = useState<EmployeesData[] | null>(
    null
  );

  useEffect(() => {
    const getAllEmployees = async () => {
      const data = await api.apiGetAllEmployees();
      setAllEmployees(data);
    };
    getAllEmployees();
  }, [allEmployees]);

  return (
    <main>
      <Header />
      <section>
        <h2>Les employés de Groupomania :</h2>
        <EmployeesList allEmployees={null} />
      </section>
    </main>
  );
};

export default Employees;
