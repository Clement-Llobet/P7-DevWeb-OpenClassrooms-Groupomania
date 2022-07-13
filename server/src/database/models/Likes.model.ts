import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface LikesAttributes {
    id: number;
    likes: number;
    dislikes: number;
    usersLiked: number[];
    usersDisliked: number[];
}

export interface LikesInput extends Optional<LikesAttributes, 'id'>{}
export interface LikesOutput extends Required<LikesAttributes>{}

class Likes extends Model<LikesAttributes, LikesInput> implements LikesAttributes {
    public id!: number;
    public likes!: number;
    public dislikes!: number;
    public usersLiked!: number[];
    public usersDisliked!: number[];
}

Likes.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    likes: { type: DataTypes.INTEGER },
    dislikes: { type: DataTypes.INTEGER },
    usersLiked: { type: DataTypes.NUMBER }, // TABLEAU DE NOMBRE
    usersDisliked: { type: DataTypes.INTEGER } // TABLEAU DE NOMBRE
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Likes