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
import Header from '../../components/Header/Header';
import UpdateEmployeeProfile from '../../components/Employees.components/EmployeeActionModal/employeeProfile.updateModal';
import DeleteEmployeeProfile from '../../components/Employees.components/EmployeeActionModal/employeeProfile.deleteModal';

const api = new ApiService('http://localhost:8000/');

const EmployeeProfile = () => {
  const { id } = useParams<EmployeeIdParams>();
  const { user } = React.useContext(UserContext) as UserContextType;

  const [singleEmployee, setSingleEmployee] = useState<EmployeesData | null>(
    null
  );
  const [isModifying, setIsModifying] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

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

  return (
    <Main>
      <Header moderationRight={user[0] && user[0].moderation} />
      <ThisEmployeeProfile>
        {isModifying ? (
          <UpdateEmployeeProfile
            singleEmployee={singleEmployee}
            singleEmployeeSetter={setSingleEmployee}
            employeeId={id}
            isModifyingSetter={setIsModifying}
          />
        ) : isDeleting ? (
          <DeleteEmployeeProfile
            singleEmployee={singleEmployee}
            isDeletingSetter={setIsDeleting}
          />
        ) : (
          <div className="employee-profile">
            <div className="employee-profile__header">
              <img src={`${singleEmployee?.profilePicture}`} alt="Avatar" />
              <div className="employee-profile__header__name-and-surname">
                <p>{singleEmployee?.surname}</p>
                <p>{singleEmployee?.name}</p>
              </div>
              <div className="employee-profile__button-actions">
                <button onClick={() => setIsModifying(true)}>Modifier</button>
                <button onClick={() => setIsDeleting(true)}>Supprimer</button>
              </div>
            </div>
            <hr />
            <div className="employee-profile__login">
              <p>Email : {singleEmployee?.email}</p>
            </div>
            <hr />
            <div className="employee-profile__login">
              <p>Mot de passe : ************</p>
            </div>
          </div>
        )}
      </ThisEmployeeProfile>
    </Main>
  );
};

export default EmployeeProfile;
