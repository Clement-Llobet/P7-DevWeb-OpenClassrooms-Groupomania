import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface LikesAttributes {
    likesId: number;
    EmployeeId: number;
    PostId: number;
}

export interface LikesInput extends Optional<LikesAttributes, 'likesId'>{}
export interface LikesOutput extends Required<LikesAttributes>{}

class Likes extends Model<LikesAttributes> {
    public likesId!: number;
    public EmployeeId!: number;
    public PostId!: number;
}

Likes
    .init({ 
        likesId: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        EmployeeId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Employees',
                key: 'id'
            }
        },
        PostId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Posts',
                key: 'id'
            }
        }
    }, 
    {
        sequelize: sequelizeConnection,
        paranoid: true,
        timestamps: false
    })

export default Likes