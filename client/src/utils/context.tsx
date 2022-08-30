import * as React from 'react';
import {
  UserContextType,
  IUser,
  IUserProvider,
} from '../interfaces/types.userContext';

export const UserContext = React.createContext<UserContextType | null>(null);

const UserProvider: React.FC<IUserProvider> = ({ children }) => {
  const [user, setUser] = React.useState<IUser[]>([]);

  const saveUser = (user: IUser[]) => {
    if (user === undefined) return;

    const newUser: IUser = {
      id: user[0].id,
      name: user[0].name,
      surname: user[0].surname,
      email: user[0].email,
      password: user[0].password,
      moderation: user[0].moderation,
      profilePicture: user[0].profilePicture,
    };
    setUser([...user, newUser]);
  };

  return (
    <UserContext.Provider value={{ user, saveUser, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
