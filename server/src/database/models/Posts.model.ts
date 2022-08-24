import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import Employees from "./Employees.model";

interface PostsAttributes {
    id: number;
    text: string;
    urlImage: string;
    likers: Employees[],
    author: Employees[]
}

export interface PostsInput extends Optional<PostsAttributes, "id">{}
export interface PostsOutput extends Required<PostsAttributes> {}

class Posts extends Model<PostsAttributes, PostsInput> implements PostsAttributes {
    public id!: number;
    public text!: string;
    public urlImage!: string;
    public likers!: Employees[];
    public author!: Employees[];
    
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
        urlImage: { type: DataTypes.STRING },
        likers: { 
            type: DataTypes.STRING ,
            get() {
                return this.getDataValue('likers')
            },
            set(value: any) {
                this.setDataValue('likers', value.join(";"))
            }
        },
        author: { 
            type: DataTypes.STRING,
            get() {
                return this.getDataValue('author')
            },
            set(value: any) {
                this.setDataValue('author', value.join(";"))
            }
        }
    }, {
        sequelize: sequelizeConnection,
        paranoid: true,
        indexes: [{
            unique: true,
            fields: ['text', 'urlImage', 'likers']
        }]
    })

export default Posts