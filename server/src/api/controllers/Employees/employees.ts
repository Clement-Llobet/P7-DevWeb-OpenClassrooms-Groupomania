import * as service from "../../services/EmployeesServices";
import { CreateEmployeeDTO, FilterEmployeeDTO, updateEmployeeDTO } from '../../../database/dto/employee.dto';
import { Employee } from '../../interfaces/employees.interfaces';
import * as mapper from "./employeesMappers";
import { Request, Response, NextFunction } from "express";
import Employees from "../../../database/models/Employees.model";
import { GetAllEmployeesFilters } from "../../../database/dal/types";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const sendUserToDatabase = async (payload: CreateEmployeeDTO): Promise<Employee> => {
    return await mapper.toEmployee(await service.createEmployee(payload));
}

exports.postSignUp = async(req: Request, res: Response, next: NextFunction) => {

    const data = req.body;
    if (req.file !== undefined) {
        data.profilePicture = `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`;
    }
        
    try {
        const hash = await bcrypt.hash(req.body.password, 10);        
        data.password = hash;
        const response = await sendUserToDatabase(data);
        
        return res.status(201).json({
                        id: response.id,
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        moderation: data.moderation,
                        profilePicture: data.profilePicture,
                        token: jwt.sign(
                            { userId: data.id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    }
                    );
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({message: `L'erreur suivante est survenue : ${error}`});
    }
};


exports.postLogin = (req: Request, res: Response, next: NextFunction) => {
    const requestDatas = req.body;

    Employees.findOne({
        where: { email: requestDatas.email }
    })
        .then(user => {
            if (!user) {                
                return res.status(401).json({ error: "Utilisateur non trouvé !"});
            }
              
            bcrypt.compare(requestDatas.password, user.password)
                .then((valid: boolean) => {
                    if(!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !"});
                    }
                    res.status(200).json({
                        userId: user.id,
                        token: jwt.sign(
                            { userId: user.id },
                            process.env.TOKEN_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch((error: Error) => res.status(500).json( error ))
        })
        .catch((error: Error) => res.status(500).json( error ))
};

const sendUpdatedEmployee = async (id: number, payload: updateEmployeeDTO): Promise<Employee> => {
    return mapper.toEmployee(await service.updateEmployee(id, payload));
}

exports.updateEmployee = async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    if (data.password) {
        const hash = await bcrypt.hash(req.body.password, 10);        
        data.password = hash;
    }
    if (req.file) {
        data.profilePicture = `${req.protocol}://${req.get('host')}/images/${req.file?.filename}`;
    }
    
    try {
        await sendUpdatedEmployee(data.id, data);
        return res.status(200).json({ 
            message: `L'employé ayant l'identifiant ${data.id} a bien été modifié.`,
            userId: data.id,
            token: jwt.sign(
                { userId: data.id },
                process.env.TOKEN_SECRET,
                { expiresIn: '24h' }
                )
            });
    } catch (error) {
        return res.status(500).json(error);
    }
}

const sendDeleteEmployeeOrder = async (id: number) => {
    return await service.deleteEmployee(id);
}

exports.deleteEmployee = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await sendDeleteEmployeeOrder(parseInt(req.params.id))
        return res.status(200).json({ message: `L'employé ayant l'identifiant ${req.params.id} a bien été supprimé.`}); 
    } catch (error) {        
        return res.status(500).json( error );
    }
}

const getSpecificEmployee = async (id: number): Promise<Employee> => {
    return mapper.toEmployee(await service.getEmployeesById(id))
}

exports.getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const employeeId = parseInt(req.params.id);
    console.log(req.body);
    
    try {
        const specificEmployee = await getSpecificEmployee(employeeId);
        return res.status(200).send(specificEmployee);
    } catch (error) {
        return res.status(500).json(error); 
    }
}

const sendGetAllOrder = async (filters: FilterEmployeeDTO): Promise<Employee[]> => {
    return await service.getAllEmployees(filters).then((employees) => employees.map(mapper.toEmployee))
}

exports.getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    const filters: GetAllEmployeesFilters = req.query;

    try {
        const allEmployees = await sendGetAllOrder(filters);
        return res.status(200).send(allEmployees);
    } catch (error) {
        return res.status(500).json( error );
    }
}