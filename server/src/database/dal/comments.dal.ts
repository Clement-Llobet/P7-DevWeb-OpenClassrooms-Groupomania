import { Op } from "sequelize";
import Comments, { CommentsInput, CommentsOutput } from "../models/Comments";
import { GetAllCommentsFilters } from "./types";

export const createComments = async (data: CommentsInput): Promise<CommentsOutput> => {
    const comments = await Comments.create(data)
    return comments
}

export const updateComments = async (id: number, data: Partial<CommentsInput>): Promise<CommentsOutput> => {
    const comment = await Comments.findByPk(id);
    if(!comment) {
        throw new Error("An error occured : comment was not found")
    }
    const updatedComment = await(comment as Comments).update(data)
    return updatedComment
}

export const getCommentsById = async (id: number): Promise<CommentsOutput> => {
    const comment = await Comments.findByPk(id);
    if(!comment) {
        throw new Error("An error occured : comment was not found")
    }
    return comment
}

export const deleteComments = async (id: number): Promise<boolean> => {
    const deleteComments = await Comments.destroy({
        where: {id}
    })
    return !!deleteComments
}


export const getAllComments = async (filters?: GetAllCommentsFilters): Promise<CommentsOutput[]> => {
    return Comments.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}