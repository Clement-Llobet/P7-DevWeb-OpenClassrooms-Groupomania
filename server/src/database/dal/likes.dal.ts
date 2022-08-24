import Likes, { LikesInput, LikesOutput } from "../models/Likes.model";

export const createLike = async (data: any): Promise<LikesOutput> => {
    const like = await Likes.create(data);
    return like
}

export const deleteLike = async (id: number): Promise<boolean> => {
    const deleteLike = Likes.destroy({
        where: {likesId: id}
    })
    return !!deleteLike
}

export const countLikesById = async (id: number): Promise<number> => {
    const likesCount = Likes.count({
        where:  {likesId: id}
    })
    return likesCount
}