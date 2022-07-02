export interface Post {
    text: string;
    urlImage: string;
    publishDate: string;
    likes: number;
    dislikes: number;
    usersLiked: string[];
    usersDisliked: string[];
}