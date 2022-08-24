import { Post } from "../../interfaces/posts.interface";
import { PostsOutput } from "../../../database/models/Posts.model";

export const toPost = (post: PostsOutput): Post => {
    console.log(post?.likers.length);

    return {
        id: post.id,
        text: post.text,
        urlImage: post.urlImage,
        likers: post.likers,
        author: post.author
    }
}