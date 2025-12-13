import playlistService from '../services/playlistService.js';

const playlistController = {
    create: async (req, res) => {
        try {
            const userId = req.user.id; // Viene del token (verifyToken)
            const { title, isPublic } = req.body;

            if (!title) return res.status(400).json({ error: "El título es obligatorio" });

            let coverImageUrl = null;
            if (req.file) coverImageUrl = req.file.path;

            const newPlaylist = await playlistService.createPlaylist(userId, {
                title,
                isPublic,
                coverImageUrl
            });

            res.status(201).json({ success: true, data: newPlaylist });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getMyPlaylists: async (req, res) => {
        try {
            const userId = req.user.id;
            const playlists = await playlistService.getUserPlaylists(userId);
            res.json({ success: true, data: playlists });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const { id } = req.params;
            const playlist = await playlistService.getPlaylistById(id);
            res.json({ success: true, data: playlist });
        } catch (error) {
            res.status(404).json({ success: false, error: error.message });
        }
    },

    addSong: async (req, res) => {
        try {
            const { id: playlistId } = req.params; // ID de la playlist en la URL
            const { songId } = req.body;           // ID de la canción en el JSON
            const userId = req.user.id;

            // 1. Seguridad: ¿Eres el dueño de la playlist?
            const isOwner = await playlistService.checkOwnership(playlistId, userId);
            if (!isOwner) return res.status(403).json({ error: "No tienes permiso para editar esta playlist" });

            // 2. Agregar
            await playlistService.addSongToPlaylist(playlistId, songId);
            res.json({ success: true, message: "Canción agregada correctamente" });

        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    },

    removeSong: async (req, res) => {
        try {
            const { id: playlistId, songId } = req.params;
            const userId = req.user.id;

            const isOwner = await playlistService.checkOwnership(playlistId, userId);
            if (!isOwner) return res.status(403).json({ error: "No tienes permiso" });

            await playlistService.removeSongFromPlaylist(playlistId, songId);
            res.json({ success: true, message: "Canción eliminada de la playlist" });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
    }
};

export default playlistController;