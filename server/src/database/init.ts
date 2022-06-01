require('dotenv').config()

import Employees from "./models/Employees";

const isDev = process.env.NODE_ENV === 'development'

const dataBaseInit = () => Promise.all([
    Employees.sync({ alter: isDev } )
])

export default dataBaseInit