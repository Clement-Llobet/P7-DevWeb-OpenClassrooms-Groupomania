import { EmployeesData } from './employees.interface';

export interface PostsData {
  id?: number;
  text?: string;
  urlImage?: string;
  EmployeeId?: number | HashAlgorithmIdentifier | null;
  author: {
    createdAt: string;
    id: number;
    name: string;
    surname: string;
    profilePicture: string;
  };
  likers?: EmployeesData[];
}
