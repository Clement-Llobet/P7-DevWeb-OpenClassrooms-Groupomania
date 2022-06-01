import express from "express";

const router = express.Router();
const employeesController = require('../controllers/employees');

router.post('/signup', employeesController.postSignUp);
router.post('/auth', employeesController.postLogin);

export default router;