import 'dotenv/config';
import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const connectionString = process.env.DATABASE_URL?.replace('file:', '') || './prisma/dev.db';
const adapter = new PrismaBetterSqlite3({ url: connectionString });

const prisma = new PrismaClient({ adapter });
const DEFAULT_USER_ID = 1;

// Requisito 2: Obtener productos del carrito
export const getActiveCart = async () => {
    // Buscamos si el usuario tiene un carrito ACTIVO
    let cart = await prisma.order.findFirst({
        where: { idUsuario: DEFAULT_USER_ID, estado: 'ACTIVO' },
        include: { items: true },
    });

    // Requisito 1: Si el usuario no tiene carrito -> crearlo
    if (!cart) {
        cart = await prisma.order.create({
            data: {
                idUsuario: DEFAULT_USER_ID,
                estado: 'ACTIVO',
                totalCompra: 0
            },
            include: { items: true },
        });
    }

    return cart;
};

// Requisito 1: Agregar producto al carrito
export const addProductToCart = async (idProducto: number, precio: number, sku?: string) => {
    const cart = await getActiveCart();

    // Agregamos el producto al detalle
    await prisma.orderItem.create({
        data: {
            idCarrito: cart.idCarrito,
            idProducto,
            precio,
            sku: sku || null
        }
    });

    // Recalculamos el total de la compra sumando el nuevo precio
    const updatedCart = await prisma.order.update({
        where: { idCarrito: cart.idCarrito },
        data: { totalCompra: cart.totalCompra + precio },
        include: { items: true }
    });

    return updatedCart;
};

// Requisito 3: Eliminar producto del carrito
export const removeProductFromCart = async (idDetalle: number) => {
    // Buscamos el item para saber cuánto costaba y a qué carrito pertenece
    const item = await prisma.orderItem.findUnique({
        where: { idDetalle }
    });

    if (!item) throw new Error('El producto no existe en el carrito');

    // Lo eliminamos
    await prisma.orderItem.delete({
        where: { idDetalle }
    });

    // Obtenemos el carrito actual para restarle el precio
    const cart = await prisma.order.findUnique({
        where: { idCarrito: item.idCarrito }
    });

    // Actualizamos el total (asegurando que no quede en negativo por errores de redondeo)
    const nuevoTotal = Math.max(0, (cart?.totalCompra || 0) - item.precio);

    const updatedCart = await prisma.order.update({
        where: { idCarrito: item.idCarrito },
        data: { totalCompra: parseFloat(nuevoTotal.toFixed(2)) },
        include: { items: true }
    });

    return updatedCart;
};