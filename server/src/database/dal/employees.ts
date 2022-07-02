// Data access layer

import { Op, DataType } from "sequelize/types";
import Employees, { EmployeesInput, EmployeesOutput } from "../models/Employees";
import { GetAllEmployeesFilters } from "./types";

export const createEmployee = async (data: EmployeesInput): Promise<EmployeesOutput> => {
    console.log("createEmployee", data);
    
    const employee = await Employees.create(data)
    return employee
}

export const updateEmployee = async (id: number, data: Partial<EmployeesInput>): Promise<EmployeesOutput> => {
    const employee = await Employees.findByPk(id)
    if (!employee) {
        throw new Error("An error occured : employee was not found")
    }
    const updatedIngredient = await (employee as Employees).update(data)
    return updatedIngredient
}

export const getEmployeeById = async (id: number): Promise<EmployeesOutput> => {
    const employee = await Employees.findByPk(id)
    if (!employee) {
        throw new Error("An error occured : employee was not found")
    }
    return employee
}

export const deleteEmployeeById = async (id: number): Promise<boolean> => {
    const deletedEmployee = await Employees.destroy({
        where: {id}
    })
    return !!deletedEmployee
}

export const getAll = async (filters?: GetAllEmployeesFilters): Promise<EmployeesOutput[]> => {
    return Employees.findAll({
        where: {
            ...(filters?.isDeleted && {deletedAt: {[Op.not]: null}})
        },
        ...((filters?.isDeleted || filters?.includeDeleted) && {paranoid: true})
    })
}