import { Optional } from "sequelize/types";
import Employees from "../models/Employees.model";

export type createPostsDto = {
    text: string;
    urlImage: string;
    likers: Employees[];
    author: string;
}

export type updatePostsDto = Optional<createPostsDto, "text">

export type FilterPostsDto = {
    isDeleted?: boolean
    includeDeleted?: boolean
}