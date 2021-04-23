import express from 'express';

import {getPosts, getPost, createPost, updatePost, likePost, deletePost} from '../controllers/postsController.js'
//middleware para a verificação de permissões para criar, editar, curtir e deletar posts
import authMiddleware from '../middleware/AuthMiddleware.js'

const router = express.Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.get('/:id', getPost);
router.patch('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);
router.patch('/:id/likePost', authMiddleware, likePost);

export default router;