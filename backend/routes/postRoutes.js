import express from 'express';
import { createPost, getPosts, getPostById, updatePost, deletePost } from '../controllers/postController.js';
import { protect, optionalProtect } from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(optionalProtect, getPosts)
    .post(protect, upload.single('image'), createPost);

router.route('/:id')
    .get(optionalProtect, getPostById)
    .put(protect, upload.single('image'), updatePost)
    .delete(protect, deletePost);

export default router;
