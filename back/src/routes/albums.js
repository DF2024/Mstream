import { Router } from 'express';
import albumController from '../controller/albumController.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js';
import { verifyToken, verifyAdmin } from '../middlewares/auth.js';

const router = Router();

// --- RUTAS PÚBLICAS (Authenticated) ---
router.get('/', verifyToken, albumController.getAll);
router.get('/:id', verifyToken, albumController.getOne);

// --- RUTAS ADMIN ---
// 'image' es el nombre del campo en el formulario para la portada
router.post('/', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('image'), 
    albumController.createAlbum
);
// UPDATE: Admin + Multer (por si cambia la foto)
router.put('/:id', 
    verifyToken, 
    verifyAdmin, 
    uploadCloudinary.single('image'), 
    albumController.update
);

// DELETE: Solo Admin
router.delete('/:id', 
    verifyToken, 
    verifyAdmin, 
    albumController.delete
);



export default router;