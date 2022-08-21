export interface Employee {
    id: number
    name: string,
    surname: string,
    email: string,
    password: string | HashAlgorithmIdentifier,
    moderation: number,
    profilePicture: string
}