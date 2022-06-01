import * as service from "../../services/EmployeesServices"
import { CreateEmployeeDTO, updateEmployeeDTO, FilterEmployeeDTO } from '../../../database/dto/employee.dto';
import { Employee } from '../../interfaces/employees.interfaces';
import * as mapper from './mapper';
import { NextFunction } from "express";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.postSignUp = (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    
    // const { password } = req.body;
    // bcrypt.hash(req.body, 10)
    //     .then(hash => {
    //         const user = new Users({
    //             email: req.body.email,
    //             password: hash
    //         });
    //         user.save()
    //             .then(() => res.status(201).json({ message: "Utilisateur créé !"}))
    //             .catch(error => res.status(400).json({ error }));
    //     })
    //     .catch(error => res.status(500).json({ error }));
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