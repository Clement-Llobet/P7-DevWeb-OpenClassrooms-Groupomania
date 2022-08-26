import * as service from "../../services/EmployeesServices";
import { CreateEmployeeDTO, FilterEmployeeDTO, updateEmployeeDTO } from '../../../database/dto/employee.dto';
import { Employee } from '../../interfaces/employees.interfaces';
import * as mapper from "./employeesMappers";
import { Request, Response, NextFunction } from "express";
import Employees from "../../../database/models/Employees.model";
import { GetAllEmployeesFilters } from "../../../database/dal/types";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const imageAbsoluteUrl = `http://${process.env.PORT}/images/`;


const sendUserToDatabase = async (payload: CreateEmployeeDTO): Promise<Employee> => {
    return await mapper.toEmployee(await service.createEmployee(payload));
}

exports.postSignUp = async(req: Request, res: Response, next: NextFunction) => {

    const data = { ...req.body }

    console.log(req.file);
    
    
    // try {
    //     const hash = await bcrypt.hash(req.body.password, 10);
    //     console.log(hash);
        
    //     data.password = hash;
    //     await sendUserToDatabase(data);
    //     return res.status(201).json({
    //                     userId: data.id,
    //                     token: jwt.sign(
    //                         { userId: data.id },
    //                         process.env.TOKEN_SECRET,
    //                         { expiresIn: '24h' }
    //                     )
    //                 });
    // }
    // catch(error) {
    //     console.log(error);
    //     return res.status(500).json({message: `L'erreur suivante est survenue : ${error}`});
    // }
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
                        return res.status(400).json({ error: "Mot de passe incorrect !"});
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
    const data = { ...req.body };

    data.file && (data.urlImage = imageAbsoluteUrl + `${data.file.filename}`);
    const employeeId = parseInt(req.params.id);

    try {
        await sendUpdatedEmployee(employeeId, data);
        return res.status(200).json({ message: `L'employé ayant l'identifiant ${req.params.id} a bien été modifié.`});
    } catch (error) {
        return res.status(500).json(error);
    }
    
    // if Employee moderation = 1, alors modération peut être modifiée
    // Sinon, renvoyer une erreur 500
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