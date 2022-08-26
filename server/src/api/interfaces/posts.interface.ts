import Employees from "../../database/models/Employees.model";

export interface Post {
    id: number;
    text: string;
    urlImage: string;
    createdAt: Date;
    likers: Employees[];
    author: string | Employees[];
    totalLikes: number;
}