import express from "express";
const router = express.Router();

const employeesController = require('../controllers/Employees/employees');

router.post('/signup', employeesController.postSignUp);
router.post('/login', employeesController.postLogin);
router.put('/', employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);
router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);

export default router;