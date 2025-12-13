import { PrismaClient } from '@prisma/client';

// Evita crear múltiples instancias de Prisma al recargar en desarrollo (Nodemon)
const globalForPrisma = global;

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

export default prisma;