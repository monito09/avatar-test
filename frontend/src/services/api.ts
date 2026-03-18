const API_URL = 'http://localhost:3001/api';

// 1. Obtener productos (con buscador y paginación)
export const getProducts = async (query = '', limit = 10, skip = 0) => {
    const response = await fetch(`${API_URL}/products?q=${query}&limit=${limit}&skip=${skip}`);
    if (!response.ok) throw new Error('Error al cargar productos');
    return response.json();
};

// 2. Obtener el carrito actual
export const getCart = async () => {
    const response = await fetch(`${API_URL}/cart`);
    if (!response.ok) throw new Error('Error al cargar el carrito');
    return response.json();
};

// 3. Agregar al carrito
export const addToCart = async (idProducto: number, precio: number, sku?: string) => {
    const response = await fetch(`${API_URL}/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idProducto, precio, sku })
    });
    if (!response.ok) throw new Error('Error al agregar al carrito');
    return response.json();
};

// 4. Eliminar del carrito
export const removeFromCart = async (idDetalle: number) => {
    const response = await fetch(`${API_URL}/cart/remove/${idDetalle}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Error al eliminar del carrito');
    return response.json();
};