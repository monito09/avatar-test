export const getProducts = async (query: string = '', limit: number = 10, skip: number = 0) => {
    //Uso de endpoints dinámicos de DummyJSON para paginacion y busqueda
    const url = query
        ? `https://dummyjson.com/products/search?q=${query}&limit=${limit}&skip=${skip}`
        : `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al conectar con la API de productos');
    }

    const data = await response.json();

    // Mapeo de datos para devolver estrictamente lo que pide el PDF y aplicar la fórmula
    const products = data.products.map((p: any) => {
        // FÓRMULA MATEMÁTICA: Precio Original = Precio Oferta / (1 - (Descuento / 100))
        // Ejemplo: Si vale 559 y tiene 23% de descuento -> 559 / (1 - 0.23) = 725.97
        const factorDescuento = 1 - (p.discountPercentage / 100);
        const precioOriginal = p.price / factorDescuento;

        return {
            idProducto: p.id,
            title: p.title,
            brand: p.brand || 'Genérico',
            thumbnail: p.thumbnail,
            price: p.price,
            discountPercentage: p.discountPercentage,
            originalPrice: parseFloat(precioOriginal.toFixed(2)),
            sku: p.sku
        };
    });

    return {
        products,
        total: data.total,
        skip: data.skip,
        limit: data.limit
    };
};