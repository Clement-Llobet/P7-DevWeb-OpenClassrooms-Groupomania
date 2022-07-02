import * as commentsDal from "../../database/dal/comments";
import { GetAllCommentsFilters } from "../../database/dal/types";
import { CommentsInput, CommentsOutput } from "../../database/models/Comments";

export const create = (payload: CommentsInput): Promise<CommentsOutput> => {
    return commentsDal.createComments(payload);
}

export const update = (id: number, payload: Partial<CommentsInput>): Promise<CommentsOutput> => {
    return commentsDal.updateComments(id, payload);
}

export const getEmployeesById = (id: number): Promise<CommentsInput> => {
    return commentsDal.getCommentsById(id);
}

export const getAllEmployees = (filters: GetAllCommentsFilters): Promise<CommentsOutput[]> => {
    return commentsDal.getAllComments(filters);
}