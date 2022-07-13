import * as service from "../../services/PostService";
import { createPostsDto, FilterPostsDto, updatePostsDto } from "../../../database/dto/posts.dto";
import { Post } from "../../interfaces/posts.interface";
import * as mapper from "./postsMappers";
import { Request, Response, NextFunction } from "express";

export const createPost = async (payload: createPostsDto): Promise<Post> => {
    return mapper.toPost(await service.create(payload));
}

export const updatePost = async (id: number, payload: updatePostsDto): Promise<Post> => {
    return mapper.toPost(await service.update(id, payload));
}

export const getPostById = async (id: number): Promise<Post> =>  {
    return mapper.toPost(await service.getPostsById(id));
}

export const deletePostById = async (id: number): Promise<Boolean> => {
    const isDeleted = await service.deletePostById(id);
    return isDeleted
}

export const getAllPosts = async (filters: FilterPostsDto): Promise<Post[]> => {
    return (await service.getAllPosts((filters))).map(mapper.toPost);
}