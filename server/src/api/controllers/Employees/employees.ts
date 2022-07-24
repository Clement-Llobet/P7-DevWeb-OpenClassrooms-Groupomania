import * as service from "../../services/EmployeesServices";
import { CreateEmployeeDTO } from '../../../database/dto/employee.dto';
import { Employee } from '../../interfaces/employees.interfaces';
import * as mapper from "./employeesMappers";
import { Request, Response, NextFunction } from "express";
import Employees from "../../../database/models/Employees.model";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const sendUserToDatabase = async (payload: CreateEmployeeDTO): Promise<Employee> => {
    const mapEmployee = await mapper.toEmployee(await service.create(payload));
    return mapEmployee
}

exports.postSignUp = async(req: Request, res: Response, next: NextFunction) => {
    const data = { ...req.body }
    try {
        const hash = await bcrypt.hash(req.body.password, 10);
        data.password = hash
        await sendUserToDatabase(data);
        return res.status(201).json({ message: "Utilisateur créé !"});
    }
    catch(error) {
        return res.status(500).json( error );
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

exports.updateEmployee = () => {

}

exports.deleteEmployee = () => {

}

exports.getAllEmployees = () => {

}

exports.getEmployeeById = () => {
    
}