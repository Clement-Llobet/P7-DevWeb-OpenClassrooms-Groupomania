import { NavigateFunction } from 'react-router-dom';
import { IUser } from '../interfaces/types.userContext';
import { ApiService } from './api.service';
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
  user: IUser[]
) => {
  if (user[0].moderation !== 1) {
    navigate('/Home');
  } else {
    return;
  }
};
