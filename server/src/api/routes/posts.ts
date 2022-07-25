import express from "express";
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');
const router = express.Router();

const postsController = require('../controllers/Posts/posts');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', multer, postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePostById);

export default router;