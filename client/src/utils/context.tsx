import { createContext, useState } from 'react';

interface IUserContext {
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: HashAlgorithmIdentifier;
    moderation: number;
    profilePicture: string;
  };
  setUser: React.Dispatch<React.SetStateAction<{}>>;
}

interface IUserProvider {
  children: React.ReactNode;
}

export const UserContext = createContext<Partial<IUserContext>>({});

export const UserProvider = ({ children }: IUserProvider) => {
  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
