import { NavigateFunction } from 'react-router-dom';

export const forbidAccessWithToken = (navigate: NavigateFunction) => {
  let findToken = localStorage.getItem('token');

  if (findToken) {
    navigate('/Home');
  } else {
    return;
  }
};

export const forbidAccessWithoutToken = (navigate: NavigateFunction) => {
  let findToken = localStorage.getItem('token');

  if (!findToken) {
    navigate('/');
  } else {
    return;
  }
};
