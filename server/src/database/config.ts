require("dotenv").config();
import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME as string
const dbUser = process.env.DB_USER as string
const dbPassword = process.env.DB_PASSWORD
const dbHost = process.env.DB_HOST
const dbDriver = process.env.DB_DRIVER

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver as Dialect
})

export default sequelizeConnection

