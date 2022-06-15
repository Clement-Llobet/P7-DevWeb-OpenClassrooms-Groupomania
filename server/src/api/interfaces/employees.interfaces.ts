export interface Employee {
    // id: number | null,
    name: string,
    surname: string,
    email: string,
    password: string | HashAlgorithmIdentifier,
    moderation: number,
    profilePicture: string
}