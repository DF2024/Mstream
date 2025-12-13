import prisma from '../config/db.js';

const playlistService = {
    // 1. Crear Playlist
    createPlaylist: async (userId, data) => {
        return await prisma.playlist.create({
            data: {
                title: data.title,
                userId: userId, // Vinculamos al usuario que está logueado
                isPublic: data.isPublic === 'true' || data.isPublic === true,
                coverImageUrl: data.coverImageUrl || null
            }
        });
    },

    // 2. Obtener TODAS las playlists de un usuario específico
    getUserPlaylists: async (userId) => {
        return await prisma.playlist.findMany({
            where: { userId: parseInt(userId) },
            orderBy: { createdAt: 'desc' }
        });
    },

    // 3. Obtener UNA playlist con sus canciones
    getPlaylistById: async (id) => {
        const playlist = await prisma.playlist.findUnique({
            where: { id: parseInt(id) },
            include: {
                user: { // Info del creador
                    select: { id: true, username: true } 
                },
                songs: { // Tabla intermedia (PlaylistSong)
                    include: {
                        song: { // La canción real
                            include: {
                                album: { include: { artist: true } } // Datos extra para el player
                            }
                        }
                    },
                    orderBy: { addedAt: 'asc' }
                }
            }
        });

        if (!playlist) throw new Error('Playlist no encontrada');
        return playlist;
    },

    // 4. Agregar canción a la playlist
    addSongToPlaylist: async (playlistId, songId) => {
        // Verificamos si ya existe para evitar errores
        const exists = await prisma.playlistSong.findUnique({
            where: {
                playlistId_songId: { // Clave compuesta definida en schema.prisma
                    playlistId: parseInt(playlistId),
                    songId: parseInt(songId)
                }
            }
        });

        if (exists) throw new Error('La canción ya está en la playlist');

        return await prisma.playlistSong.create({
            data: {
                playlistId: parseInt(playlistId),
                songId: parseInt(songId)
            }
        });
    },

    // 5. Eliminar canción de la playlist
    removeSongFromPlaylist: async (playlistId, songId) => {
        return await prisma.playlistSong.delete({
            where: {
                playlistId_songId: {
                    playlistId: parseInt(playlistId),
                    songId: parseInt(songId)
                }
            }
        });
    },

};

export default playlistService;