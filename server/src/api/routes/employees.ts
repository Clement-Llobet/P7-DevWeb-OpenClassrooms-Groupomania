import express from "express";
const router = express.Router();
const auth = require("../middlewares/auth");
const multerEmployees = require('../middlewares/multer-employees-config');

const employeesController = require('../controllers/Employees/employees');

router.post('/signup', multerEmployees, employeesController.postSignUp);
router.post('/login', employeesController.postLogin);
router.put('/:id', auth, multerEmployees, employeesController.updateEmployee);
router.delete('/:id', auth, employeesController.deleteEmployee);
router.get('/', auth, employeesController.getAllEmployees);
router.get('/:id', auth, employeesController.getEmployeeById);

export default router;