import * as service from '../../services/LikesService';
import { NextFunction, Request, Response } from "express";
import { createLikeDTO, updateLikeDTO } from "../../../database/dto/likes.dto";
import * as mapper from './likesMapper';
import Posts from '../../../database/models/Posts.model';
import Employees from '../../../database/models/Employees.model';
import { Employee } from '../../interfaces/employees.interfaces';
import { Like } from "../../interfaces/likes.interface";
import Likes from '../../../database/models/Likes.model';
import { deleteLike } from '../../../database/dal/likes.dal';


const createNewLike = async (payload: createLikeDTO): Promise<Like> => {
    return mapper.toLike(await service.create(payload))
}

const likeManager = (req: Request, res: Response, next: NextFunction, payload: any) => {
    let postIdFound: number = 0;
    let employeeIdFound: number = 0;
    let ifAlreadyCliked: boolean = false;    
    let likeFound: any;
    
    const checkIfPostExist = async (data: any) => {
        try {
            await Posts.findOne({
                where: { id: data.PostId }
            })
        } catch (error) {
            return res.status(500).json({'error': `unable to verify post: error`})
        } finally {
            postIdFound = data.PostId
            return postIdFound
        }
    }

    // Vérifie si le message a été trouvé, si oui on récupère l'objet utilisateur
    const checkEmployeeId = async (postIdFound: number, data: any) => {     
        console.log("postId : " + postIdFound + " ; Payload.EmployeeId : " + data.EmployeeId);
           
        try {
            if (postIdFound) {
                await Employees.findOne({
                    where: { id: data.EmployeeId }
                })
            }
        } catch (error) {
            return res.status(500).json({'error': `unable to find post`})
        } finally {
            employeeIdFound = data.EmployeeId;
            console.log("employeeIdFound : " + employeeIdFound);
            
            return employeeIdFound
        }   
    }

    // Vérifie si l'utilisateur a été trouvé, si oui, vérifie dans les likes si une entrée correspond à l'EmployeeId et au PostId
    const checkIfAlreadyCliked = async (postIdFound: number, employeeIdFound: number) => {
        if(employeeIdFound) {
            try {
                let response = await Likes.findOne({
                    where: {
                        EmployeeId: employeeIdFound,
                        PostId: postIdFound
                    }
                })

                if (response) {
                    ifAlreadyCliked = true;
                    likeFound = response?.getDataValue('likesId')                
                } else {
                    ifAlreadyCliked = false;
                }
            } 
            catch (error) {
                return res.status(500).json({ 'error' : 'unable to verify if employee already clicked'})
            }  
        } else {
            return res.status(404).json({ 'error': "employee doesn't exist"})
        }
    }

    // // Vérifie que l'utilisateur n'a pas déjà liké le message, si non on créee la relation Like qui unit le message et l'utilisateur
    const sendOrder = async (ifAlreadyCliked: boolean, employeeIdFound: number, postIdFound: number, likeIdFound?: number) => {
        if(ifAlreadyCliked === false) {
            try {
                let newLikeObject: Like = {
                    EmployeeId: employeeIdFound,
                    PostId: postIdFound
                }
                await createNewLike(newLikeObject);
                return res.status(200).json({ message: `Le post dont le PostId est ${newLikeObject.PostId} a bien été liké par l'EmployeeId ${newLikeObject.EmployeeId} `})
            } catch (error) {
                return res.status(500).json({ 'error' : 'unable to set user like'})
            }
        } else if (ifAlreadyCliked === true) {            
            try {
                await deleteLike(likeIdFound!)
                return res.status(200).json({ message: `Le post dont le LikeId est ${likeIdFound} a bien été unliké par l'EmployeeId ${employeeIdFound} `})
            } catch (error) {
                res.status(500).json({ 'error' : 'unable to set user unlike'})
            }
        }
    }

    checkIfPostExist(payload)
        .then(() => checkEmployeeId(postIdFound, payload)
            .then(() => checkIfAlreadyCliked(postIdFound, employeeIdFound))
                .then(() => sendOrder(ifAlreadyCliked, employeeIdFound, postIdFound, likeFound)
            )
        ) 
}

exports.manageLike = async (req: Request, res: Response, next: NextFunction) => {
    const data: any = { ...req.body }
    likeManager(req, res, next, data);
}