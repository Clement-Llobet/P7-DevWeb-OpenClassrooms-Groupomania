import * as likesDal from "../../database/dal/likes.dal"
import Likes, { LikesInput, LikesOutput } from "../../database/models/Likes.model"

export const create = (payload: LikesInput): Promise<LikesOutput> => {
    return likesDal.createLike(payload)
}

export const remove = (id: number): Promise<boolean> => {
    return likesDal.deleteLike(id)
}

