import Employees from "../../database/models/Employees.model";

export interface Post {
    id: number;
    text: string;
    urlImage: string;
    createdAt: Date;
    likers: number[];
    author: string[];
}