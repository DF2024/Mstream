import prisma from '../config/db.js';

const artistService = {
    // Crear Artista
    createArtist: async (data) => {
        return await prisma.artist.create({
            data: {
                name: data.name,
                bio: data.bio || null,
                imageUrl: data.imageUrl || null
            }
        });
    },

    // Obtener todos
    getAllArtists: async () => {
        return await prisma.artist.findMany({
            orderBy: { name: 'asc' } // Orden alfabético
        });
    },

    // Obtener uno por ID (con sus álbumes)
    getArtistById: async (id) => {
        const artist = await prisma.artist.findUnique({
            where: { id: parseInt(id) },
            include: {
                albums: true // <--- ¡Importante! Trae los álbumes del artista
            }
        });

        if (!artist) throw new Error('Artista no encontrado');
        return artist;
    },

    updateArtist: async (id, data) => {
        return await prisma.artist.update({
            where: { id: parseInt(id) }, // Aseguramos que el ID sea número
            data: data // Prisma actualizará solo los campos que vengan aquí
        });
    },

    deleteArtist: async(id) => {
        const existingArtist = await prisma.artist.findUnique({
            where: {id: Number(id)}
        })

        if(!existingArtist){
            throw new Error('El artisita no se encuentra')
        }

        await prisma.artist.delete({
            where: { id: Number(id) }
        })

        return { message: 'Artista eliminado correctamente' }
    }
};

export default artistService;