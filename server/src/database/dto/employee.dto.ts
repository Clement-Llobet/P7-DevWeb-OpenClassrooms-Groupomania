import { Optional } from "sequelize/types";

export type CreateEmployeeDTO = {
    name: string;
    surname: string;
    email: string;
    password: string;
    moderation: number;
}

export type updateEmployeeDTO = Optional<CreateEmployeeDTO, 'name'>

export type FilterEmployeeDTO = {
    isDeleted?: boolean
    includeDeleted?: boolean
}