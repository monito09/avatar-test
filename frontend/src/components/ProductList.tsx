import { useState, useEffect, useCallback } from 'react';
import { getProducts, addToCart } from '../services/api';

// Interfaz basada en lo que devuelve el back
interface Product {
    idProducto: number;
    title: string;
    brand: string;
    thumbnail: string;
    price: number;
    discountPercentage: number;
    originalPrice: number;
    sku: string;
}

// Actualizar el carrito en el componente padre
export const ProductList = ({ onCartUpdated }: { onCartUpdated: () => void }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);

    // Estados Buscador y Paginación
    const [search, setSearch] = useState('');
    const [skip, setSkip] = useState(0);
    const [total, setTotal] = useState(0);
    const LIMIT = 12; // 12 productos por página

    // Cargar productos
    const loadProducts = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getProducts(search, LIMIT, skip);
            setProducts(data.products);
            setTotal(data.total);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [search, skip]);

    // Se ejecuta al montar o cuando cambian los filtros
    useEffect(() => {
        loadProducts();
    }, [loadProducts]);

    // Buscador (resetea la paginación a 0)
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSkip(0);
        loadProducts();
    };

    // Agregar al Carrito
    const handleAddToCart = async (product: Product) => {
        try {
            // Pasamos el "price" que es el precio de oferta (el que se cobra)
            await addToCart(product.idProducto, product.price, product.sku);
            alert(`${product.title} agregado al carrito!`);
            onCartUpdated(); // Avisamos al componente principal que recargue el carrito
        } catch (error) {
            alert('Error al agregar el producto');
        }
    };

    return (
        <div className="w-full md:w-3/4 pr-0 md:pr-4">
            {/* Buscador */}
            <form onSubmit={handleSearch} className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Buscar productos (ej. laptop, phone...)"
                    className="flex-1 p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                    Buscar
                </button>
            </form>

            {/* Grilla de Productos */}
            {loading ? (
                <p className="text-center text-gray-500 my-10">Cargando productos...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.idProducto} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-4 flex flex-col h-full border border-gray-100">

                            {/* Etiqueta de Descuento */}
                            <div className="relative">
                                <span className="absolute top-0 left-0 bg-yellow-400 text-xs font-bold px-2 py-1 rounded-br rounded-tl">
                                    -{Math.round(product.discountPercentage)}%
                                </span>
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-full h-48 object-contain mb-4"
                                    loading="lazy"
                                />
                            </div>

                            <div className="flex-1 flex flex-col">
                                <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.brand}</p>
                                <h3 className="font-semibold text-sm text-gray-800 mb-2 flex-1 line-clamp-2" title={product.title}>
                                    {product.title}
                                </h3>

                                {/* Precios calculados desde el Backend */}
                                <div className="mb-4">
                                    <p className="text-xl font-bold text-blue-600">
                                        S/ {product.price.toFixed(2)} <span className="text-xs font-normal text-gray-500">Oferta</span>
                                    </p>
                                    <p className="text-sm text-gray-400 line-through">
                                        S/ {product.originalPrice.toFixed(2)}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(product)}
                                    className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 transition-colors mt-auto"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Controles de Paginación */}
            <div className="mt-8 flex justify-between items-center bg-white p-4 rounded shadow-sm border border-gray-200">
                <button
                    onClick={() => setSkip(skip - LIMIT)}
                    disabled={skip === 0}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                    Anterior
                </button>
                <span className="text-gray-600 text-sm font-medium">
                    Mostrando {products.length > 0 ? skip + 1 : 0} - {Math.min(skip + LIMIT, total)} de {total}
                </span>
                <button
                    onClick={() => setSkip(skip + LIMIT)}
                    disabled={skip + LIMIT >= total}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded disabled:opacity-50 hover:bg-gray-300 transition"
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};