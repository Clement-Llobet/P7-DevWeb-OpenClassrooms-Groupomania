import { Post } from "../../interfaces/posts.interface";
import { PostsOutput } from "../../../database/models/Posts.model";

export const toPost = (post: PostsOutput): Post => {
    return {
        id: post.id,
        text: post.text,
        urlImage: post.urlImage,
        createdAt: post.createdAt,
        likers: post.likers,
        author: post.author,
    }
}