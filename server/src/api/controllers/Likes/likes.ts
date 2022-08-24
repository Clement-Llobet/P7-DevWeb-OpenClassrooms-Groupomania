import * as service from '../../services/LikesService';
import { NextFunction, Request, Response } from "express";
import { createLikeDTO, updateLikeDTO } from "../../../database/dto/likes.dto";
import * as mapper from './likesMapper';
import Posts from '../../../database/models/Posts.model';
import Employees from '../../../database/models/Employees.model';
import { Employee } from '../../interfaces/employees.interfaces';
import { Like } from "../../interfaces/likes.interface";
import Likes from '../../../database/models/Likes.model';


const createNewLike = async (payload: createLikeDTO): Promise<Like> => {
    return mapper.toLike(await service.create(payload))
}

const likeManager = (req: Request, res: Response, next: NextFunction, payload: any) => {
    let postIdFound: number = 0;
    let employeeIdFound: number = 0;
    let ifAlreadyCliked: boolean = false;    
    
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
                await Likes.findOne({
                    where: {
                        EmployeeId: employeeIdFound,
                        PostId: postIdFound
                    }
                })
                ifAlreadyCliked = false;
            } 
            catch (error) {
                ifAlreadyCliked = true;                
                return res.status(500).json({ 'error' : 'unable to verify if employee already clicked'})
            }  
        } else {
            return res.status(404).json({ 'error': "employee doesn't exist"})
        }
    }

    // // Vérifie que l'utilisateur n'a pas déjà liké le message, si non on créee la relation Like qui unit le message et l'utilisateur
    const sendOrderToCreateLike = async (ifAlreadyCliked: boolean, likeToCreate: Like) => {
        if(ifAlreadyCliked === false) {
            try {
                await createNewLike(likeToCreate);
                return res.status(200).json({ message: `Le post dont le PostId est ${likeToCreate.PostId} a bien été liké par l'EmployeeId ${likeToCreate.EmployeeId} `})
            } catch (error) {
                return res.status(500).json({ 'error' : 'unable to set user like'})
            }
        } else {
            res.status(409).json({ 'error' : 'message already liked'})
        }
    }

    checkIfPostExist(payload)
        .then(() => checkEmployeeId(postIdFound, payload)
            .then(() => checkIfAlreadyCliked(postIdFound, employeeIdFound))
                .then(() => {
                    let newLikeObject: Like = {
                            EmployeeId: employeeIdFound,
                            PostId: postIdFound
                        }
                    sendOrderToCreateLike(ifAlreadyCliked, newLikeObject)
                })
        ) 
}

exports.createLike = async (req: Request, res: Response, next: NextFunction) => {
    const data: any = { ...req.body }
    likeManager(req, res, next, data);
}

exports.deleteLike = async (req: Request, res: Response, next: NextFunction) => {
    // try {
        
    // } catch (error) {
    //     return res.status(500).json(error);
    // }    
}