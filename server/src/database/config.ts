require("dotenv").config();
import { Dialect, Sequelize } from 'sequelize';
// import "../config/config.json"

// const dbName = config.development.name as string

// const dbUser = config.development.username as string;
// const dbPassword = config.development.password
// const dbHost = config.development.host;
// const dbDriver = config.development.dialect;
console.log(process.env);

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbDriver = "mysql"

// const sequelizeConnection = new Sequelize("mysql://localhost:3306/database", {
const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver as Dialect
})
  // .authenticate()
  //   .then(() => console.log("Connexion à la BDD Groupomania réussie."))
  //   .catch(() => console.log("Echec de la connexxion à la BDD Groupomania"));

export default sequelizeConnection

