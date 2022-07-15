import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface PostsAttributes {
    id: number;
    text: string;
    urlImage: string;
    publishDate: string;
}

export interface PostsInput extends Optional<PostsAttributes, "id">{}
export interface PostsOutput extends Required<PostsAttributes> {}

class Posts extends Model<PostsAttributes, PostsInput> implements PostsAttributes {
    public id!: number;
    public text!: string;
    public urlImage!: string;
    public publishDate!: string;
}

Posts
    .init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
            },
        text: { type: DataTypes.STRING },
        urlImage: { type: DataTypes.STRING },
        publishDate: { type: DataTypes.STRING }
    }, {
        sequelize: sequelizeConnection,
        paranoid: true
    })

export default Posts