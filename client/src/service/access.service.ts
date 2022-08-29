import { NavigateFunction } from 'react-router-dom';
import { ApiService } from './api.service';
import { currentToken } from './getCurrentToken';

// const jwt = require('jsonwebtoken');

const api = new ApiService(process.env.REACT_APP_REMOTE_SERVICE_BASE_URL);

export const forbidAccessWithToken = (navigate: NavigateFunction) => {
  if (currentToken()) {
    navigate('/Home');
  } else {
    return;
  }
};

export const forbidAccessWithoutToken = (navigate: NavigateFunction) => {
  if (!currentToken()) {
    navigate('/');
  } else {
    return;
  }
};

// export const forbidAccessWithoutModeration = async (token: string | null) => {
//   if (token === null) return;
//   let getUserAuth = await api.apiGetAuth(token);
//   console.log(getUserAuth);
// };
