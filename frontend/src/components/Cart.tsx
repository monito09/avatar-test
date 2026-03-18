import { useState, useEffect, useCallback } from 'react';
import { getCart, removeFromCart } from '../services/api';

// Interfaz para tipar el carrito y sus items
interface CartItem {
    idDetalle: number;
    idProducto: number;
    precio: number;
    sku: string;
}

interface CartData {
    idCarrito: number;
    totalCompra: number;
    items: CartItem[];
}

// Trigger para saber cuándo recargar el carrito
export const Cart = ({ refreshTrigger }: { refreshTrigger: number }) => {
    const [cart, setCart] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(false);

    // Cargar el carrito desde la api
    const loadCart = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.error('Error al cargar el carrito:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Se ejecuta al montar y cada vez que refreshTrigger cambia (cuando agregamos un producto)
    useEffect(() => {
        loadCart();
    }, [loadCart, refreshTrigger]);

    const handleRemove = async (idDetalle: number) => {
        try {
            await removeFromCart(idDetalle);
            loadCart(); // Recargamos para obtener el nuevo total
        } catch (error) {
            alert('Error al eliminar el producto');
        }
    };

    return (
        <div className="w-full md:w-1/4 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-fit sticky top-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                🛒 Mi Carrito
                <span className="bg-blue-100 text-blue-800 text-xs py-1 px-2 rounded-full">
                    {cart?.items?.length || 0}
                </span>
            </h2>

            {loading && !cart ? (
                <p className="text-gray-500 text-sm">Cargando...</p>
            ) : cart?.items?.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-gray-400 mb-2">Tu carrito está vacío</p>
                    <p className="text-xs text-gray-400">Agrega productos del catálogo</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {/* Lista de Items */}
                    <div className="max-h-[50vh] overflow-y-auto pr-2 flex flex-col gap-3">
                        {cart?.items.map((item) => (
                            <div key={item.idDetalle} className="flex justify-between items-center border-b pb-2">
                                <div>
                                    <p className="text-sm font-medium text-gray-800">Producto #{item.idProducto}</p>
                                    {item.sku && <p className="text-xs text-gray-400">SKU: {item.sku}</p>}
                                    <p className="text-sm font-bold text-blue-600">S/ {item.precio.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item.idDetalle)}
                                    className="text-red-500 hover:text-red-700 text-sm font-medium p-2"
                                    title="Eliminar"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Total y Checkout */}
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-600 font-medium">Total:</span>
                            <span className="text-2xl font-bold text-gray-900">
                                S/ {cart?.totalCompra.toFixed(2) || '0.00'}
                            </span>
                        </div>
                        <button
                            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition shadow-sm"
                            onClick={() => alert('¡Simulación de compra exitosa!')}
                        >
                            Proceder al Pago
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};