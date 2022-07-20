import { Model } from "sequelize";
import sequelizeConnection from "../config";

class Likes extends Model {}

Likes
    .init(
    { }, 
    {
        sequelize: sequelizeConnection,
        paranoid: true,
        timestamps: false
    })

export default Likes