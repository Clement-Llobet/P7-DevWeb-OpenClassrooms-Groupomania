import * as postsDal from "../../database/dal/posts.dal";
import { GetAllPostsFilters } from "../../database/dal/types";
import { PostsInput, PostsOutput } from "../../database/models/Posts.model";

export const create = (payload: PostsInput): Promise<PostsOutput> => {
    return postsDal.createPosts(payload);
}

export const update = (id: number, payload: Partial<PostsInput>): Promise<PostsOutput> => {
    return postsDal.updatePosts(id, payload);
}

export const getPostsById = (id: number): Promise<PostsOutput> => {
    return postsDal.getPostsById(id);
}

export const deletePostById = (id: number): Promise<boolean> => {
    return postsDal.deletePostsById(id);
}

export const getAllPosts = (filters: GetAllPostsFilters): Promise<PostsOutput[]> => {
    return postsDal.getAllPosts(filters);
}