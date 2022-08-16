import * as service from '../../services/LikesService';
import { NextFunction, Response } from "express";
import { createLikeDTO, updateLikeDTO } from "../../../database/dto/likes.dto";
import { Like } from "../../interfaces/likes.interface";
import * as mapper from './likesMapper';
import Posts from '../../../database/models/Posts.model';
import Employees from '../../../database/models/Employees.model';
import { Employee } from '../../interfaces/employees.interfaces';
import Likes from '../../../database/models/Likes.model';


const createNewLike = async (payload: createLikeDTO): Promise<Like> => {
    return mapper.toLike(await service.create(payload))
}



const likeManager = (req: Request, res: Response, next: NextFunction, payload: any) => {

    let postIdFound: number = 0;
    let employeeIdFound: number = 0;
    let ifAlreadyCliked: boolean = false;
    let postToLike;
    
    const checkIfPostExist = async () => {
        try {
            postToLike = await Posts.findOne({
                where: { id: payload.PostId }
            })
            return res.status(200).json({ message: `Post to like is this one : ${postToLike}` })
        } catch (error) {
            return res.status(500).json({'error': `unable to verify post: error`})
        } finally {
            postIdFound = payload.PostId;
        }
    }

    // Vérifie si le message a été trouvé, si oui on récupère l'objet utilisateur
    const checkEmployeeId = async (postIdFound: number) => {
        console.log("========== " + postIdFound + " ==========");

        try {
            if (postIdFound) {
                await Employees.findOne({
                    where: { id: payload.EmployeeId }
                })
            }
        } catch (error) {
            return res.status(500).json({'error': `unable to find post`})
        } finally {
            employeeIdFound = payload.EmployeeId;
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
    const sendOrderToCreateLike = async (ifAlreadyCliked: boolean) => {
        if(ifAlreadyCliked === false) {
            try {
                await createNewLike(payload);
                return res.status(200).json({ message: `The post number ${payload.PostId} is now liked by user ${payload.EmployeeId}` })
            } catch (error) {
                return res.status(500).json({ 'error' : 'unable to set user like'})
            }
        } else {
            res.status(409).json({ 'error' : 'message already liked'})
        }
    }

    // Met à jour le message en implémentant de 1 le nombre de likes
    const addLikeToPostFound = (postIdFound: number) => {
        try {
            Posts.update({
                likes: + 1
            }, {
                where: { id: postIdFound }
            })  
        } catch (error) {
            res.status(500).json({'error' : 'cannot update message like counter'})
        } 
    }

    checkIfPostExist();
    // checkEmployeeId(postIdFound);
    // checkIfAlreadyCliked(postIdFound, employeeIdFound);
    // sendOrderToCreateLike(ifAlreadyCliked);
    // addLikeToPostFound(postIdFound);
}

exports.createLike = async (req: Request, res: Response, next: NextFunction) => {

    const data: any = { ...req.body }

    likeManager(req, res, next, data);

    // const headerAuth = req.headers.get('authorization'); // Récupère l'en-tête d'autorisation
    // Il faut ensuite récupérer le userId --> req.params.id

    // const postId = parseInt(req.params.PostId)
    //On récupère dans l'URL l'identifiant du message et on s'assure qu'il correspond à un post dans la BDD

    // if (postId <= 0) {
    //     return res.status(400).json({ 'error': "invalid parameters"})
    // }
    // Détermine si l'identifiant du message est valide ou non


    
}

exports.updateLike = async (req: Request, res: Response, next: NextFunction) => {
    // try {
        
    // } catch (error) {
    //     return res.status(500).json(error);
    // }    
}