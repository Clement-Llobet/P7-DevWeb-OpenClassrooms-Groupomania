import * as postsDal from "../../database/dal/posts";
import { GetAllPostsFilters } from "../../database/dal/types";
import { PostsInput, PostsOutput } from "../../database/models/Posts";

export const create = (payload: PostsInput): Promise<PostsOutput> => {
    return postsDal.createPosts(payload);
}

export const update = (id: number, payload: Partial<PostsInput>): Promise<PostsOutput> => {
    return postsDal.updatePosts(id, payload);
}

export const getEmployeesById = (id: number): Promise<PostsInput> => {
    return postsDal.getPostsById(id);
}

export const getAllEmployees = (filters: GetAllPostsFilters): Promise<PostsOutput[]> => {
    return postsDal.getAllPosts(filters);
}