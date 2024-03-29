require('dotenv').config()
import Employees from "./models/Employees.model";
import Posts from "./models/Posts.model";
import Likes from "./models/Likes.model";

const isDev = process.env.NODE_ENV === 'development';
Employees.hasMany(Posts, { as: "posts"});
Posts.belongsTo(Employees, { foreignKey: 'EmployeeId', as: 'author' });

Employees.belongsToMany(Posts, { 
    through: Likes,
    as: 'postsLiked',
    foreignKey: 'EmployeeId'
});
Posts.belongsToMany(Employees, { 
    through: Likes,
    as: 'likers',
    foreignKey: 'PostId'
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