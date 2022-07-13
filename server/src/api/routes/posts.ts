import express from "express";
const router = express.Router();

const postsController = require('../controllers/Posts/posts');

router.put('/:id', postsController.updatePost);
router.post('/', postsController.createPost)
router.delete('/:id', postsController.deletePostById)
router.get('/:id', postsController.getPostById);
router.get('/', postsController.getAllPosts);

export default router;