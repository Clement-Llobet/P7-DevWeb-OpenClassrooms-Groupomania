import express from "express";
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');
const router = express.Router();

const postsController = require('../controllers/Posts/posts');
const likesController = require('../controllers/Likes/likes');

router.get('/', auth, postsController.getAllPosts);
router.get('/:id', auth, postsController.getPostById);
router.post('/', auth, multer, postsController.createPost);
router.put('/:id', auth, multer, postsController.updatePost);
router.delete('/:id', auth, postsController.deletePostById);

router.post('/:id/like', likesController.createLike);
router.delete('/:id/like', likesController.deleteLike);
router.get('/:id/like', likesController.countLikesById);

export default router;