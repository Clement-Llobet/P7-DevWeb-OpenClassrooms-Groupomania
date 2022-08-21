export interface EmployeesData {
  id?: number;
  name?: string;
  surname?: string;
  email?: string;
  password?: string | HashAlgorithmIdentifier;
  moderation?: boolean | null;
  profilePicture?: string;
}

export interface EmployeesLoginData {
  email: string;
  password: string | HashAlgorithmIdentifier;
}
