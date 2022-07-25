import * as service from "../../services/PostService";
import { createPostsDto, FilterPostsDto, updatePostsDto } from "../../../database/dto/posts.dto";
import { Post } from "../../interfaces/posts.interface";
import * as mapper from "./postsMappers";
import { Request, Response, NextFunction } from "express";
import { GetAllPostsFilters } from "../../../database/dal/types";

const imageAbsoluteUrl = `http://${process.env.PORT}/images/`;

const sendNewPostToDatabase = async (payload: createPostsDto): Promise<Post> => {
    return mapper.toPost(await service.create(payload))
}

exports.createPost = async (req: Request, res: Response, next: NextFunction) => {

    const data = { ...req.body }
    console.log(data.file);
    
    
    // try {
    //     const newPost = await sendNewPostToDatabase(data);
    //     newPost.urlImage = imageAbsoluteUrl + `${req.file?.filename}`
    //     return res.status(201).json({ message: "Nouveau post créé !"});
    // }
    // catch (error) {
    //     return res.status(500).json(error);
    // }
}

const sendUpdatedPost = async (id: number, payload: updatePostsDto): Promise<Post> => {
    return mapper.toPost(await service.update(id, payload));
}

exports.updatePost = async (req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body };

    data.file && (data.urlImage = imageAbsoluteUrl + `${data.file.filename}`);
    const postId = parseInt(req.params.id);

    try {
        await sendUpdatedPost(postId, data);
        return res.status(200).json({ message: `Le post ayant l'identifiant ${req.params.id} a bien été modifié.`}); 
    }
    catch (error) {
        return res.status(500).json(error);
    }
}

const SelectSpecificPost = async (id: number): Promise<Post> =>  {
    return mapper.toPost(await service.getPostsById(id));
}

exports.getPostById = async (req: Request, res: Response, next: NextFunction) => {
    const postId = parseInt(req.params.id);
    
    try {
        const specificPost = await SelectSpecificPost(postId)
        return res.status(200).send(specificPost);
    } catch (error) {
        return res.status(500).json(error);
    }
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
    return await service.getAllPosts(filters).then((posts) => posts.map(mapper.toPost))       
}

exports.getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    const filters: GetAllPostsFilters = req.query;

    try {
        const allPosts = await selectAllPosts(filters);
        return res.status(200).send(allPosts);
    } catch (error) {
        return res.status(500).json( error );
    }
}