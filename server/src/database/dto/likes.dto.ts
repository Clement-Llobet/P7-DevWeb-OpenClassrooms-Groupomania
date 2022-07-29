import { Optional } from "sequelize/types";

export type createLikeDTO = {
    EmployeeId: number;
    PostId: number;
}

export type updateLikeDTO = Optional<createLikeDTO, "EmployeeId">