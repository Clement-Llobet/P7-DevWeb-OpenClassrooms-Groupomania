import dotenv from 'dotenv';
import path from 'path';
import express, { Application, NextFunction, Request, Response } from 'express';
import employeesRoutes from './api/routes/employees';
import postsRoutes from './api/routes/posts'
import dataBaseInit from "./database/init";
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app: Application = express();
const port = process.env.PORT || 3000;
dotenv.config();

dataBaseInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(helmet({crossOriginResourcePolicy: false}));

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 100,
	standardHeaders: true,
	legacyHeaders: false,
})

app.get("/", async(req: Request, res: Response): Promise<Response> => {
    return res.send("Welcome to Groupomania!")
})

try {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
} catch(error) {
    console.log(`An error occured:${error}`);
}

app.use('/api/auth', apiLimiter, employeesRoutes);
app.use('/api/posts', postsRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));