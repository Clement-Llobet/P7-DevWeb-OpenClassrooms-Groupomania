import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface PostsAttributes {
    id: number;
    text: string;
    urlImage: string;
    publishDate: string;
    likes: number;
    dislikes: number;
    usersLiked: string[];
    usersDisliked: string[];
}

export interface PostsInput extends Optional<PostsAttributes, "id">{}
export interface PostsOutput extends Required<PostsAttributes> {}

class Posts extends Model<PostsAttributes, PostsInput> implements PostsAttributes {
    public id!: number;
    public text!: string;
    public urlImage!: string;
    public publishDate!: string;
    public likes!: number;
    public dislikes!: number;
    public usersLiked!: string[];
    public usersDisliked!: string[];
}

Posts.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        text: { type: DataTypes.STRING },
        urlImage: { type: DataTypes.STRING },
        publishDate: { type: DataTypes.STRING },
        likes: { type: DataTypes.INTEGER },
        dislikes: { type: DataTypes.INTEGER },
        usersLiked: { type: DataTypes.STRING }, // Tableau de string ici
        usersDisliked: { type: DataTypes.STRING } // Tableau de string ici
    }, {
        sequelize: sequelizeConnection,
        paranoid: true
    }
)

export default Posts