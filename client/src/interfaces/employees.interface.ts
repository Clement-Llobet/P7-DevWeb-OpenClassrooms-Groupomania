export interface EmployeesData {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  password?: string | HashAlgorithmIdentifier;
  moderation?: number | null;
  profilePicture?: File | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
}

export interface EmployeesLoginData {
  email: string;
  password: string | HashAlgorithmIdentifier;
}
