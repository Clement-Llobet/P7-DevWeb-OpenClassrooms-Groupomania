import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import routes from './api/routes';
import dataBaseInit from "./database/init";

const app: Application = express();
const port = process.env.PORT || 3000;
dotenv.config();
dataBaseInit();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/api', routes);