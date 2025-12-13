import { Router } from 'express';
import songController from '../controller/songController.js';

// CAMBIO AQUÍ: Importamos el nuevo middleware
import uploadCloudinary from '../middlewares/uploadCloudinary.js'; 

import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = Router();

router.get('/', verifyToken, songController.getAll);

// Usamos uploadCloudinary.single('audioFile')
router.post('/', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('audioFile'), 
    songController.uploadSong
);

// UPDATE: Admin + Multer (audioFile)
router.put(
    '/:id', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('audioFile'), 
    songController.update);

// DELETE: Admin
router.delete(
    '/:id', 
    verifyToken, 
    verifyAdmin, 
    songController.delete
);

export default router;