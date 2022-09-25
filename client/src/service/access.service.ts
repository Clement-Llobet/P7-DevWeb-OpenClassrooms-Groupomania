import { NavigateFunction } from 'react-router-dom';
import { IUser } from '../interfaces/types.userContext';
import { currentToken } from './getCurrentToken';

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

export const forbidAccessWithoutModerationRight = (
  navigate: NavigateFunction,
  user: IUser
) => {
  if (user.moderation !== 1) {
    navigate('/Home');
  } else {
    return;
  }
};
