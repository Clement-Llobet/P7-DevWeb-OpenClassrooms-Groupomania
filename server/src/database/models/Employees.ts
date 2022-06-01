import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";

interface EmployeesAttributes {
    id: number;
    name: string;
    surname: string;
    email: string;
    password: string;
    moderation: number;
}

export interface EmployeesInput extends Optional<EmployeesAttributes, 'id'>{}
export interface EmployeesOutput extends Required<EmployeesAttributes>{}

class Employees extends Model<EmployeesAttributes, EmployeesInput> implements EmployeesAttributes {
    public id!: number;
    public name!: string;
    public surname!: string;
    public email!: string;
    public password!: string;
    public moderation!: number;
    // Ajouter avatarProfilePitcture
}

Employees.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: { type: DataTypes.STRING },
    surname: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    moderation: { type: DataTypes.TINYINT }
}, {
    sequelize: sequelizeConnection,
    paranoid: true
})

export default Employees