export interface IUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  password: HashAlgorithmIdentifier;
  moderation: number;
  profilePicture?: string;
}

export type UserContextType = {
  user: IUser[];
  saveUser: (user: IUser[]) => void;
  setUser: React.Dispatch<React.SetStateAction<IUser[]>>;
};

export interface IUserProvider {
  children: React.ReactNode;
}
