import * as service from "../../services/PostService";
import { createPostsDto, FilterPostsDto, updatePostsDto } from "../../../database/dto/posts.dto";
import { Post } from "../../interfaces/posts.interface";
import * as mapper from "./postsMappers";
import { Request, Response, NextFunction } from "express";

const imageAbsoluteUrl = `http://${process.env.PORT}/images/`;

const sendNewPostToDatabase = async (payload: createPostsDto): Promise<Post> => {
    const mapNewPost = mapper.toPost(await service.create(payload))
    return mapNewPost
}

exports.createPost = async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body }
    try {
        const newPost = await sendNewPostToDatabase(data);
        newPost.urlImage = imageAbsoluteUrl + `${req.file?.filename}`
        return res.status(201).json({ message: "Nouveau post créé !"});
    }
    catch (error) {
        return res.status(500).json( error );
    }
}

const sendUpdatedPost = async (id: number, payload: updatePostsDto): Promise<Post> => {
    const mapUpdatedPost = mapper.toPost(await service.update(id, payload));
    return mapUpdatedPost
}

exports.updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body };

    data.file && (data.urlImage = imageAbsoluteUrl + `${data.file.filename}`);
    const postId = parseInt(req.params.id);

    try {
        await sendUpdatedPost(postId, data);
        return res.status(201).json({ message: `Le post ayant l'identifiant ${req.params.id} a bien été modifié.`}); 
    }
    catch (error) {
        return res.status(500).json( error );
    }
}

const SelectSpecificPost = async (id: number): Promise<Post> =>  {
    const mapSelectSpecificPost = mapper.toPost(await service.getPostsById(id));
    return mapSelectSpecificPost
}

exports.getPostById = async (req: Request, res: Response, next: NextFunction) => {
//     const postId = parseInt(req.params.id);
    
//     try {
//         const specificPost = await SelectSpecificPost(postId)
//         return res.status(201).json(specificPost);
//     } catch (error) {
//         return res.status(500).json( error );
//     }
}

const sendDeletionOrder = async (id: number): Promise<Boolean> => {
    const isDeleted = await service.deletePostById(id);
    return isDeleted
}

exports.deletePostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sendDeletionOrder(parseInt(req.params.id))
        return res.status(200).json({ message: `Le post ayant l'identifiant ${req.params.id} a bien été supprimé.`}); 
    } catch (error) {
        return res.status(500).json( error );
    }
}

const selectAllPosts = async (filters: FilterPostsDto): Promise<Post[]> => {
    return (await service.getAllPosts((filters))).map(mapper.toPost);
}

exports.getAllPosts = async () => {

}