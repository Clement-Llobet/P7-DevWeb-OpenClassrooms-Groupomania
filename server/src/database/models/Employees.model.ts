import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
// import Likes from "./Likes.model";

interface EmployeesAttributes {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string | HashAlgorithmIdentifier;
    moderation: number;
    profilePicture: string;
}

export interface EmployeesInput extends Optional<EmployeesAttributes, 'id'>{}
export interface EmployeesOutput extends Required<EmployeesAttributes>{}

class Employees extends Model<EmployeesAttributes, EmployeesInput> implements EmployeesAttributes {
    public id!: number;
    public name!: string;
    public surname!: string;
    public email!: string;
    public password!: string | HashAlgorithmIdentifier;
    public moderation!: number;
    public profilePicture!: string;
}

Employees
    .init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: { type: DataTypes.STRING },
        surname: { type: DataTypes.STRING },
        email: { type: DataTypes.STRING },
        password: { type: DataTypes.STRING },
        moderation: { type: DataTypes.TINYINT },
        profilePicture : { type: DataTypes.STRING }
    }, {
        sequelize: sequelizeConnection,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['email']
        }]
    })

export default Employees