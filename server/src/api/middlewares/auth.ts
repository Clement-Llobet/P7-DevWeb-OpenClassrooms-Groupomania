import { NextFunction, Request, Response } from "express";

const jwt = require('jsonwebtoken');

 const auth = (req: Request, res: Response, next: NextFunction) => {    
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        const userId = decodedToken.userId;
        req.auth = { userId: userId };

        next();
    } catch (error) {
        res.status(401).json({ error: error});
        return error
    }
}

module.exports = auth;