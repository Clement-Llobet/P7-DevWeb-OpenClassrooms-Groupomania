import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface CommentsAttributes {
    id: number;
    text: string;
}

export interface CommentsInput extends Optional<CommentsAttributes, "id">{}
export interface CommentsOutput extends Required<CommentsAttributes> {}

class Comments extends Model<CommentsAttributes, CommentsInput> implements CommentsAttributes {
    public id!: number;
    public text!: string;
}

Comments.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        text: { type: DataTypes.STRING }
    }, {
        sequelize: sequelizeConnection,
        paranoid: true
    }
)

export default Comments