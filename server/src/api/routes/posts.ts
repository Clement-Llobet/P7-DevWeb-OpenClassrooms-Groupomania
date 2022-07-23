import express from "express";
import auth from "../middlewares/auth";
import multer from "multer";
const router = express.Router();

const postsController = require('../controllers/Posts/posts');

router.get('/', auth, postsController.getAllPosts);
router.get('/:id', auth, postsController.getPostById);
router.post('/', multer, postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', auth, postsController.deletePostById);

export default router;