import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface SharesAttributes {
    id: number;
    shareDate: string;
}

export interface SharesInput extends Optional<SharesAttributes, "id">{}
export interface SharesOutput extends Required<SharesAttributes> {}

class Shares extends Model<SharesAttributes, SharesOutput> implements SharesAttributes {
    public id!: number;
    public shareDate!: string;
}

Shares.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        shareDate: { type: DataTypes.STRING }
    }, {
        sequelize: sequelizeConnection,
        paranoid: true
    }
)

export default Shares