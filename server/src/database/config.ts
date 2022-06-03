require("dotenv").config();
import { Dialect, Sequelize } from 'sequelize'
import config from "../config/config"

const dbName = config.development.name as string

const dbUser = config.development.username as string;
const dbPassword = config.development.password as string;
const dbHost = config.development.host;
const dbDriver = config.development.dialect;

// const dbUser = process.env.DB_USER as string
// const dbPassword = process.env.DB_PASSWORD
// const dbHost = process.env.DB_HOST
// // const dbDriver = process.env.DB_DRIVER as Dialect

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver as Dialect
})

export default sequelizeConnection