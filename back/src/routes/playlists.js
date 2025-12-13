import { Router } from 'express';
import playlistController from '../controller/playlistController.js';
import uploadCloudinary from '../middlewares/uploadCloudinary.js';
import { verifyToken } from '../middlewares/auth.js';

const router = Router();

// Todas las rutas requieren estar logueado
router.use(verifyToken);

// 1. Obtener mis playlists
router.get('/', playlistController.getMyPlaylists);

// 2. Crear nueva playlist (con portada opcional)
router.post('/', uploadCloudinary.single('image'), playlistController.create);

// 3. Ver detalle de una playlist (con canciones)
router.get('/:id', playlistController.getOne);

// 4. Agregar canción a playlist
// URL ejemplo: POST /api/playlists/5/songs (Body: { "songId": 10 })
router.post('/:id/songs', playlistController.addSong);

// 5. Eliminar canción de playlist
// URL ejemplo: DELETE /api/playlists/5/songs/10
router.delete('/:id/songs/:songId', playlistController.removeSong);

export default router;