require('dotenv').config()
import Employees from "./models/Employees.model";
import Posts from "./models/Posts.model";
import Likes from "./models/Likes.model";
import { Sequelize } from "sequelize/types";

const isDev = process.env.NODE_ENV === 'development';
Employees.hasMany(Posts, { as: "posts"} );
Posts.belongsTo(Employees, { foreignKey: 'EmployeeId', as: 'author' });

Employees.belongsToMany(Posts, { 
    through: Likes
    // foreignKey: 'EmployeeId',
    // otherKey: 'PostId' 
});
Posts.belongsToMany(Employees, { 
    through: Likes
    // foreignKey: 'PostId',
    // otherKey: 'EmployeeId' 
});

const dataBaseInit = () => (
    [
        Employees.sync( { alter: isDev } ),
        Posts.sync( { alter: isDev } ),
        Likes.sync( { alter: isDev } )
    ]
    .reduce((p: any, fn: any) => p.then(fn), Promise.resolve())
)

export default dataBaseInit