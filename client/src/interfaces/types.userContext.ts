export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password?: HashAlgorithmIdentifier;
  moderation: number;
  profilePicture?: string;
}

export type UserContextType = {
  user: IUser | undefined;
  saveUser: (user: IUser) => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
};

export interface IUserProvider {
  children: React.ReactNode;
}
