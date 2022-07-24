import * as employeesDal from "../../database/dal/employees.dal";
import { GetAllEmployeesFilters } from "../../database/dal/types";
import { EmployeesInput, EmployeesOutput } from "../../database/models/Employees.model";

export const createEmployee = (payload: EmployeesInput): Promise<EmployeesOutput> => {
    return employeesDal.createEmployee(payload);
}

export const updateEmployee = (id: number, payload: Partial<EmployeesInput>): Promise<EmployeesOutput> => {
    return employeesDal.updateEmployee(id, payload);
}

export const deleteEmployee = (id: number) => {
    return employeesDal.deleteEmployeeById(id);
}

export const getEmployeesById = (id: number): Promise<EmployeesOutput> => {
    return employeesDal.getEmployeeById(id);
}

export const getAllEmployees = (filters: GetAllEmployeesFilters): Promise<EmployeesOutput[]> => {
    return employeesDal.getAll(filters);
}