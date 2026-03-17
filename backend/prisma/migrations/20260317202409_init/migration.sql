-- CreateTable
CREATE TABLE "Usuario" (
    "idUsuario" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nombre" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order" (
    "idCarrito" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idUsuario" INTEGER NOT NULL,
    "fechaCreacion" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fechaActualizacion" DATETIME NOT NULL,
    "totalCompra" REAL NOT NULL DEFAULT 0,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
    CONSTRAINT "Order_idUsuario_fkey" FOREIGN KEY ("idUsuario") REFERENCES "Usuario" ("idUsuario") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "idDetalle" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idCarrito" INTEGER NOT NULL,
    "idProducto" INTEGER NOT NULL,
    "sku" TEXT,
    "precio" REAL NOT NULL,
    CONSTRAINT "OrderItem_idCarrito_fkey" FOREIGN KEY ("idCarrito") REFERENCES "Order" ("idCarrito") ON DELETE CASCADE ON UPDATE CASCADE
);
