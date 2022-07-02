import { Optional } from "sequelize/types";

export type createCommentsDto = {
    text: string;
}

export type updateCommentsDto = Optional<createCommentsDto, "text">

export type filterCommentsDto = {
    isDeleted?: boolean
    includeDeleted?: boolean
}