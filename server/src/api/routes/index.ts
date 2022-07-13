import express from "express";
import employeesRouter from "./employees";
import postsRouter from './posts';

const router = express.Router();

router.use('/employee', employeesRouter);
router.use('/posts', postsRouter);

export default router