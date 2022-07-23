import express from "express";
import auth from "../middlewares/auth";
import multer from "multer";
const router = express.Router();

const postsController = require('../controllers/Posts/posts');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePostById);

export default router;