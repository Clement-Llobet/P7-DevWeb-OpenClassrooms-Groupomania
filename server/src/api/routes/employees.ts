import express from "express";
const router = express.Router();

const employeesController = require('../controllers/Employees/employees');

router.post('/signup', employeesController.postSignUp);
router.post('/login', employeesController.postLogin);

export default router;