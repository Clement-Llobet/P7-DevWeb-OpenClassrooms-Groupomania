import * as service from '../../services/LikesService';
import { NextFunction, Response } from "express";
import { createLikeDTO } from "../../../database/dto/likes.dto";
import { Like } from "../../interfaces/likes.interface";
import * as mapper from './likesMapper';
import Posts from '../../../database/models/Posts.model';
import Employees from '../../../database/models/Employees.model';
import { Employee } from '../../interfaces/employees.interfaces';
import Likes from '../../../database/models/Likes.model';


// const createNewLike = async (payload: createLikeDTO): Promise<Like> => {
//     return await mapper.toLike(await service.create(payload))
// }

const waterfall = (req: Request, res: Response, next: NextFunction) => {[
    // Vérifies dans BDD si le post existe
    async (done: any) => {
        try {
            await Posts.findOne({
                where: { id: 'postId' } // Passer ici le postId sans guillemets
            })  
        } catch (error) {
            return res.status(500).json({'error': `unable to verify post: error`})
        } finally {
            (postFound: Posts) => {
                done(null, postFound);
            }
        }
    },
    // Vérifie si le message a été trouvé, si oui on récupère l'objet utilisateur
    async (postFound: Posts, done: any) => {
        try {
            if (postFound) {
            Employees.findOne({
                where: { id: 'EmployeeId' } // Passer ici le employeeId sans guillemets
            })
        }
        } catch (error) {
            
        } finally {
            (employeeIdFound: number) => {
                done(null, postFound, employeeIdFound);
            }
        }   
    },
    // Vérifie si l'utilisateur a été trouvé, si oui, vérifie dans les likes si une entrée correspond à l'EmployeeId et au PostId
    async (postFound: Posts, employeeIdFound: number, done: any) => {
        if(employeeIdFound) {
            try {
                Likes.findOne({
                    where: {
                        EmployeeId: "EmployeeId", // Passer ici le employeeId sans guillemets
                        PostId: "PostId" // Passer ici le postId sans guillemets
                    }
                })
            } catch (error) {
                return res.status(500).json({ 'error' : 'unable to verify is employee already liked'})
            } finally {
                (isEmployeeAlreadyClicked: Boolean) => {
                    done(null, postFound, employeeIdFound, isEmployeeAlreadyClicked)
                }
            }   
        } else {
            res.status(404).json({ 'error': "user doesn't exist"})
        }
    },
    // Vérifie que l'utilisateur n'a pas déjà liké le message, si non on ajoute la relation qui unit le message et l'utilisateur
    (postFound: Posts, employeeIdFound: number, isEmployeeAlreadyClicked: Boolean, done: any) => {
        if(!isEmployeeAlreadyClicked) {
            try {
                // On créé une entrée dans la table like
                // postFound.addUser(employeeIdFound)
            } catch (error) {
                return res.status(500).json({ 'error' : 'unable to set user like'})
            }
            finally {
                (isEmployeeAlreadyClicked: Boolean) => {
                    done(null, postFound, employeeIdFound, isEmployeeAlreadyClicked)
                }
            }
        } else {
            res.status(409).json({ 'error' : 'message already liked'})
        }
    },
    // Met à jour le message en implémentant de 1 le nombre de likes
    (postFound: Posts, employeeIdFound: number, done: any) => {
        try {
            postFound.update({
                likes: postFound.likes + 1
            })  
        } catch (error) {
            res.status(500).json({'error' : 'cannot update message like counter'})
        } finally {
            () => {
                done(postFound);
            }
        }   
    }
]
    
}

exports.createLike = async (req: Request, res: Response, next: NextFunction) => {
    // const headerAuth = req.headers.get('authorization'); // Récupère l'en-tête d'autorisation
    // Il faut ensuite récupérer le userId --> req.params.id

    // const postId = parseInt(req.query.PostId)
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