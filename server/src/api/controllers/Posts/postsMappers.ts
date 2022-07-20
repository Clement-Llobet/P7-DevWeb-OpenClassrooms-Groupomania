import { Post } from "../../interfaces/posts.interface";
import { PostsOutput } from "../../../database/models/Posts.model";

export const toPost = (post: PostsOutput): Post => {
    return {
        text: post.text,
        urlImage: post.urlImage,
    }
}