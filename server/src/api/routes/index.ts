import express from "express";
import employeesRouter from "./employees";
import postsRouter from './posts';

const router = express.Router();

router.use('/', employeesRouter);
router.use('/post', postsRouter);

export default router