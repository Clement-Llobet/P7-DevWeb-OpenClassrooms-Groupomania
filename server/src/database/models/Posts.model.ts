import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface PostsAttributes {
    id: number;
    text: string;
    urlImage: string;
}

export interface PostsInput extends Optional<PostsAttributes, "id">{}
export interface PostsOutput extends Required<PostsAttributes> {}

class Posts extends Model<PostsAttributes, PostsInput> implements PostsAttributes {
    public id!: number;
    public text!: string;
    public urlImage!: string;
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
        urlImage: { type: DataTypes.STRING }
    }, {
        sequelize: sequelizeConnection,
        paranoid: true
    })

export default Posts