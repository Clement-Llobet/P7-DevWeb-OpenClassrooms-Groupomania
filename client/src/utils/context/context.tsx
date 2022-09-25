import * as React from 'react';
import {
  UserContextType,
  IUser,
  IUserProvider,
} from '../../interfaces/types.userContext';

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<IUserProvider> = ({ children }) => {
  const [user, setUser] = React.useState<IUser>();

  const saveUser = (user: IUser) => {
    if (user === undefined) return;

    const newUser: IUser = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      moderation: user.moderation,
      profilePicture: user.profilePicture,
    };
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
