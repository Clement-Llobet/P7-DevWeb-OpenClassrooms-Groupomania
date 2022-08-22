import express from "express";
const router = express.Router();
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');

const employeesController = require('../controllers/Employees/employees');

router.post('/signup', multer, employeesController.postSignUp);
router.post('/login', employeesController.postLogin);
router.put('/:id', auth, multer, employeesController.updateEmployee);
router.delete('/:id', auth, employeesController.deleteEmployee);
router.get('/', auth, employeesController.getAllEmployees);
router.get('/:id', auth, employeesController.getEmployeeById);

export default router;