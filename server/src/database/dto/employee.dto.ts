import { Optional } from "sequelize/types";

export type CreateEmployeeDTO = {
    name: string;
    surname: string;
    email: string;
    password: string | HashAlgorithmIdentifier;
    moderation: number;
    profilePicture: string;
}

export type updateEmployeeDTO = Optional<CreateEmployeeDTO, 'name'>

export type FilterEmployeeDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}