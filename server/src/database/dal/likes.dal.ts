import Likes, { LikesInput, LikesOutput } from "../models/Likes.model";

export const createLike = async (data: any): Promise<LikesOutput> => {
    const like = await Likes.create(data);
    return like
}

export const updateLike = async (id: number, data: Partial<LikesInput>): Promise<LikesOutput> => {
    const like = await Likes.findByPk(id);

    if(!like) {
        throw new Error('An error occured : like was not found')
    }

    return like.update(data)
}