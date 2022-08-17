import express from "express";
const auth = require("../middlewares/auth");
const multer = require('../middlewares/multer-config');
const router = express.Router();

const postsController = require('../controllers/Posts/posts');
const likesController = require('../controllers/Likes/likes');

router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPostById);
router.post('/', multer, auth, postsController.createPost);
router.put('/:id', postsController.updatePost);
router.delete('/:id', postsController.deletePostById);

router.post('/:id/like', likesController.createLike);
router.delete('/:id/like', likesController.deleteLike);

export default router;