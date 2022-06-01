import * as employeesDal from "../../database/dal/employees";
import { GetAllEmployeesFilters } from "../../database/dal/types";
import { EmployeesInput, EmployeesOutput } from "../../database/models/Employees";

export const create = (data: EmployeesInput): Promise<EmployeesOutput> => {
    return employeesDal.createEmployee(data);
}

export const update = (id: number, data: Partial<EmployeesInput>): Promise<EmployeesOutput> => {
    return employeesDal.updateEmployee(id, data);
}

export const getEmployeesById = (id: number): Promise<EmployeesOutput> => {
    return employeesDal.getEmployeeById(id);
}

export const getAllEmployees = (filters: GetAllEmployeesFilters): Promise<EmployeesOutput[]> => {
    return employeesDal.getAll(filters);
}