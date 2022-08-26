import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Employees from "./Employees.model";

interface PostsAttributes {
    id: number;
    text: string;
    urlImage: string;
    createdAt: Date;
    author?: string | Employees[];
    likers?: Employees[];
}

export interface PostsInput extends Optional<PostsAttributes, "id">{}
export interface PostsOutput extends Required<PostsAttributes> {
}

class Posts extends Model<PostsAttributes, PostsInput> implements PostsAttributes {
    public id!: number;
    public text!: string;
    public urlImage!: string;
    public createdAt!: Date;
    public author!: string | Employees[];
    public likers!: Employees[];
    
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
        createdAt: { type: DataTypes.DATE}
    },
     {
        sequelize: sequelizeConnection,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['text', 'urlImage']
        }]
    })

export default Posts