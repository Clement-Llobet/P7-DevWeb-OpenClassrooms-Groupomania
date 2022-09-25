import { Op } from "sequelize";
import Employees from "../models/Employees.model";
import Posts, { PostsInput, PostsOutput } from "../models/Posts.model";
import { GetAllPostsFilters } from "./types";

export const createPosts = async (data: PostsInput): Promise<PostsOutput> => {
    const post = await Posts.create(data)
    return post
}

export const updatePosts = async (id: number, data: Partial<PostsInput>): Promise<PostsOutput> => {
    const post = await Posts.findByPk(id);
    if (!post) {
        throw new Error("An error occured : post was not found")
    }
    return post.update(data)
}

export const getPostsById = async (id: number): Promise<PostsOutput> => {
    const post = await Posts.findByPk(id, {
        include: [{
            model: Employees,
            as: 'author',
            attributes: ['id', 'name', 'surname', 'createdAt', 'profilePicture'],
        }]
    })
    if (!post) {
        throw new Error("An error occured : post was not found")
    }
    return post
}

export const deletePostsById = async (id: number): Promise<boolean> => {
    const deletedPost = await Posts.destroy({
        where: {id}
    })
    return !!deletedPost
}

export const getAllPosts = async (filters?: GetAllPostsFilters): Promise<PostsOutput[]> => {
    return Posts.findAll({
        include: [{
            model: Employees,
            as: 'author',
            attributes: ['id', 'name', 'surname', 'createdAt', 'profilePicture'],
        },
        {
            model: Employees,
            as: 'likers',
        }
    ],
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}