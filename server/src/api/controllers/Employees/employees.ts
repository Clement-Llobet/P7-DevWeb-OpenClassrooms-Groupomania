import * as service from "../../services/EmployeesServices"
import { CreateEmployeeDTO, updateEmployeeDTO, FilterEmployeeDTO } from '../../../database/dto/employee.dto';
import { Employee } from '../../interfaces/employees.interfaces';
import * as mapper from './mapper';
import { Request, Response, NextFunction } from "express";
import Employees from "../../../database/models/Employees";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postSignUp = (req: Request, res: Response, next: NextFunction) => {
    bcrypt.hash(req.body.password, 10)
        .then((hash: string | HashAlgorithmIdentifier) => {
            const user = new Employees({
                name: req.body.name,
                surname: req.body.surname,
                email: req.body.email,
                password: hash,
                moderation: req.body.moderation,
                profilePicture: req.body.profilePicture
            });
            user.save()
                .then(() => res.status(201).json({ message: "Utilisateur créé !"}))
                .catch((error: Error) => res.status(400).json({ error }));
        })
        .catch((error: Error) => res.status(500).json({ error }));
};

exports.postLogin = (req: Request, res: Response, next: NextFunction) => {
    // Users.findOne({ email: req.body.email })
    //     .then(user => {
    //         if (!user) {
    //             return res.status(401).json({ error: "Utilisateur non trouvé !"});
    //         }
    //         bcrypt.compare(req.body.password, user.password)
    //             .then(valid => {
    //                 if(!valid) {
    //                     return res.status(401).json({ error: "Mot de passe incorrect !"});
    //                 }
    //                 res.status(200).json({
    //                     userId: user._id,
    //                     token: jwt.sign(
    //                         { userId: user._id },
    //                         process.env.TOKEN_SECRET,
    //                         { expiresIn: '24h' }
    //                     )
    //                 });
    //             })
    //             .catch(error => res.status(500).json( error ))
    //     })
    //     .catch(error => res.status(500).json( error ))
};