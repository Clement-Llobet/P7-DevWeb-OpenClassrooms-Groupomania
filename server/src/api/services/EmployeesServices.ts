import * as employeesDal from "../../database/dal/employees";
import { GetAllEmployeesFilters } from "../../database/dal/types";
import { EmployeesInput, EmployeesOutput } from "../../database/models/Employees";

export const create = (payload: EmployeesInput): Promise<EmployeesOutput> => {
    return employeesDal.createEmployee(payload);
}

export const update = (id: number, payload: Partial<EmployeesInput>): Promise<EmployeesOutput> => {
    return employeesDal.updateEmployee(id, payload);
}

export const getEmployeesById = (id: number): Promise<EmployeesOutput> => {
    return employeesDal.getEmployeeById(id);
}

export const getAllEmployees = (filters: GetAllEmployeesFilters): Promise<EmployeesOutput[]> => {
    return employeesDal.getAll(filters);
}