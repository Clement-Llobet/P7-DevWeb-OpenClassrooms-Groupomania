import express from "express";
const auth = require("../middlewares/auth");
const multerPosts = require('../middlewares/multer-posts-config');
const router = express.Router();

const postsController = require('../controllers/Posts/posts');
const likesController = require('../controllers/Likes/likes');

router.get('/', auth, postsController.getAllPosts);
router.get('/:id', auth, postsController.getPostById);
router.post('/', auth, multerPosts, postsController.createPost);
router.put('/:id', auth, multerPosts, postsController.updatePost);
router.delete('/:id', auth, postsController.deletePostById);

router.post('/:id/like', likesController.manageLike);

export default router;