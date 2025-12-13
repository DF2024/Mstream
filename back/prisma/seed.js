import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Iniciando el proceso de seed...');

    // 1. Definir contraseña del Admin
    const passwordRaw = 'admin123'; 
    const passwordHash = await bcrypt.hash(passwordRaw, 10);

    // 2. Crear o actualizar el Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@spotify.com' }, // Busca por email
        update: {}, // Si existe, no hace nada (o podrías actualizar datos aquí)
        create: {
            email: 'admin@spotify.com',
            username: 'SuperAdmin',
            passwordHash: passwordHash, // Recuerda: en el modelo JS es camelCase
            role: 'admin', // <--- AQUÍ LE DAMOS EL PODER
            avatarUrl: 'https://ui-avatars.com/api/?name=Super+Admin&background=0D8ABC&color=fff'
        },
    });

    console.log(`✅ Usuario Admin creado/verificado: ${admin.email}`);
    console.log(`🔑 Contraseña: ${passwordRaw}`);
}

main()
    .catch((e) => {
        console.error('❌ Error durante el seed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });