export interface EmployeesData {
  name: string;
  surname: string;
  email: string;
  password: string | HashAlgorithmIdentifier;
  moderation: boolean;
  profilePicture: string;
}

export interface EmployeesLoginData {
  email: string;
  password: string | HashAlgorithmIdentifier;
}
