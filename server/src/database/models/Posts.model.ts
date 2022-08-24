import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Employees from "./Employees.model";

interface PostsAttributes {
    id: number;
    text: string;
    urlImage: string;
    likers: Employees[],
    author: string | Employees[];
}

export interface PostsInput extends Optional<PostsAttributes, "id">{}
export interface PostsOutput extends Required<PostsAttributes> {}

class Posts extends Model<PostsAttributes, PostsInput> implements PostsAttributes {
    public id!: number;
    public text!: string;
    public urlImage!: string;
    public likers!: Employees[];
    public author!: string | Employees[];
    
}

Posts
    .init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        text: { type: DataTypes.STRING },
        urlImage: { type: DataTypes.STRING },
        likers: { type: DataTypes.JSON },
        author: { type: DataTypes.STRING }
    },
     {
        sequelize: sequelizeConnection,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['text', 'urlImage', 'likers']
        }]
    })

export default Posts