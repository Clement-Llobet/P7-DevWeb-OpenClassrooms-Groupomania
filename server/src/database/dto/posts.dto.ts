import { Optional } from "sequelize/types";

export type createPostsDto = {
    text: string;
    urlImage: string;
    likes: number;
    publishDate: string;
}

export type updatePostsDto = Optional<createPostsDto, "text">

export type FilterPostsDto = {
    isDeleted?: boolean
    includeDeleted?: boolean
}