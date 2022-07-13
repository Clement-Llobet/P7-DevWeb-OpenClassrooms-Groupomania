import { Employee } from "../../interfaces/employees.interfaces"
import { EmployeesOutput } from "../../../database/models/Employees.model";

export const toEmployee = (employee: EmployeesOutput): Employee => {
    return {
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        password: employee.password,
        moderation: employee.moderation,
        profilePicture: employee.profilePicture
    }
}