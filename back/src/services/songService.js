import prisma from '../config/db.js';

const songService = {
    createSong: async (data) => {
        try {
            // Data debe incluir: title, albumId, duration, fileUrl, trackNumber
            const newSong = await prisma.song.create({
                data: {
                    title: data.title,
                    duration: parseInt(data.duration), // Aseguramos que sea número
                    fileUrl: data.fileUrl,
                    trackNumber: data.trackNumber ? parseInt(data.trackNumber) : null,
                    albumId: parseInt(data.albumId)
                }
            });
            return newSong;
        } catch (error) {
            throw error;
        }
    },

    getAllSongs: async () => {
        return await prisma.song.findMany({
            include: {
                album: {
                    include: { artist: true } // Traemos también al artista
                }
            }
        });
    },
    
    // Método para buscar canciones por álbum (útil para el frontend)
    getSongsByAlbum: async (albumId) => {
        return await prisma.song.findMany({
            where: { albumId: parseInt(albumId) },
            orderBy: { trackNumber: 'asc' }
        });
    },
    // ... funciones anteriores
    updateSong: async (id, data) => {
        return await prisma.song.update({
            where: { id: parseInt(id) },
            data: data
        });
    },

    deleteSong: async (id) => {
        return await prisma.song.delete({
            where: { id: parseInt(id) }
        });
    }
};

export default songService;