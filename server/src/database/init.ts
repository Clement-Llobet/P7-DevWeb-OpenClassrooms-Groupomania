import Employees from "./models/Employees";

const isDev = process.env.NODE_ENV === "development";

const dataBaseInit = () => {
    Employees.sync({ alter: isDev })
}

export default dataBaseInit