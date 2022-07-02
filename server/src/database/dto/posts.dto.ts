import { Optional } from "sequelize/types";

export type createPostsDto = {
    text: string;
    urlImage: string;
    publishDate: string;
    likes: number;
    dislikes: number;
    usersLiked: string[];
    usersDisliked: string[];
}

export type updatePostsDto = Optional<createPostsDto, "text">

export type FilterPostsDto = {
    isDeleted?: boolean
    includeDeleted?: boolean
}