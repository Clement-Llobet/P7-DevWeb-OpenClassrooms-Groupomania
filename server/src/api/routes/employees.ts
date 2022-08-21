import express from "express";
const router = express.Router();
const multer = require('../middlewares/multer-config');

const employeesController = require('../controllers/Employees/employees');

router.post('/signup', multer, employeesController.postSignUp);
router.post('/login', employeesController.postLogin);
router.put('/:id', multer, employeesController.updateEmployee);
router.delete('/:id', employeesController.deleteEmployee);
router.get('/', employeesController.getAllEmployees);
router.get('/:id', employeesController.getEmployeeById);

export default router;