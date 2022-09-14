import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ApiService } from '../../service/api.service';
import { forbidAccessWithoutToken } from '../../service/access.service';
import { currentToken } from '../../service/getCurrentToken';
import { EmployeeIdParams } from '../../types/types';
import { EmployeesData } from '../../interfaces';

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

const EmployeeProfile = () => {
  const { id } = useParams<EmployeeIdParams>();
  const { state } = useLocation();

  const [singlePost, setSinglePost] = useState<EmployeesData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    forbidAccessWithoutToken(navigate);
  });

  useEffect(() => {
    const getSinglePost = async () => {
      const data = await api.apiGetPostById(currentToken(), id);
      setSinglePost(data);
    };
    getSinglePost();
  }, [id]);
  //   return <PostDetails singlePost={singlePost} likers={state as []} />;
  return <div></div>;
};

export default EmployeeProfile;
