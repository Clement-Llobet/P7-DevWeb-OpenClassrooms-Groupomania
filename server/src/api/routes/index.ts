import express from "express";
import employeesRouter from "./employees";

const router = express.Router();

router.use('/routes', employeesRouter);

export default router