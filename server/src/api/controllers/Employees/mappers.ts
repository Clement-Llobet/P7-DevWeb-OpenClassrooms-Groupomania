import { Employee } from "../../interfaces/employees.interfaces"
import { EmployeesOutput } from "../../../database/models/Employees";

export const toEmployee = (employee: EmployeesOutput): Employee => {
    return {
        // id: employee.id,
        name: employee.name,
        surname: employee.surname,
        email: employee.email,
        password: employee.password,
        moderation: employee.moderation,
        profilePicture: employee.profilePicture
    }
}