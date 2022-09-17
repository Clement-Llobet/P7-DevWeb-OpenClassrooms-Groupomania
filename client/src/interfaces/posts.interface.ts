export interface PostsData {
  id?: number;
  text?: string;
  urlImage?: string;
  // | File | FormData;
  EmployeeId?: number | HashAlgorithmIdentifier | null;
  profilePicture?: string;
  author?: {
    createdAt: string;
    id: number;
    name: string;
    surname: string;
    profilePicture?: string | File;
  };
  likers?: [];
}
