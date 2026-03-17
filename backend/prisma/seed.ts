import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const connectionString = process.env.DATABASE_URL?.replace('file:', '') || './prisma/dev.db';
const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prisma = new PrismaClient({ adapter });

async function main() {
    const usuario = await prisma.usuario.upsert({
        where: { idUsuario: 1 },
        update: {},
        create: {
            nombre: 'Eduardo Rios',
        },
    });
    console.log('Usuario por defecto creado:', usuario);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });