import Employees from "./models/Employees";

const dataBaseInit = () => {
    Employees.sync({ alter: true } )
}

export default dataBaseInit