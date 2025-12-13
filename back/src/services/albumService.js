import prisma from '../config/db.js';

const albumService = {
    // Crear Álbum
    createAlbum: async (data) => {
        return await prisma.album.create({
            data: {
                title: data.title,
                releaseYear: data.releaseYear ? parseInt(data.releaseYear) : null,
                coverImageUrl: data.coverImageUrl || null,
                artistId: parseInt(data.artistId) // Vinculamos con el artista
            }
        });
    },

    // Obtener todos los álbumes
    getAllAlbums: async () => {
        return await prisma.album.findMany({
            include: {
                artist: true // Traemos el nombre del artista para mostrarlo en la card
            },
            orderBy: { createdAt: 'desc' }
        });
    },

    // Obtener un álbum por ID (Vista de detalle)
    getAlbumById: async (id) => {
        const album = await prisma.album.findUnique({
            where: { id: parseInt(id) },
            include: {
                artist: true, // Datos del artista
                songs: {      // Lista de canciones del álbum
                    orderBy: { trackNumber: 'asc' } // Ordenadas por número de pista
                }
            }
        });

        if (!album) throw new Error('Álbum no encontrado');
        return album;
    },
    updateAlbum: async (id, data) => {
        return await prisma.album.update({
            where: { id: parseInt(id) },
            data: data
        });
    },
    deleteAlbum: async (id) => {
        return await prisma.album.delete({
            where: { id: parseInt(id) }
        });
    }
};

export default albumService;