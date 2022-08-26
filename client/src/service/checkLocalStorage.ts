import { NavigateFunction } from 'react-router-dom';
import { currentToken } from './getCurrentToken';

export const forbidAccessWithToken = (navigate: NavigateFunction) => {
  console.log();

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
