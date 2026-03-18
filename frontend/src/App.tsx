import { useState } from 'react';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

function App() {
  // Contador simple para forzar al componente Cart a recargarse
  const [cartTrigger, setCartTrigger] = useState(0);

  const handleCartUpdated = () => {
    setCartTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-black text-blue-900 tracking-tight">
            AVATAR <span className="font-light text-blue-600">Tech Store</span>
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8 relative items-start">

          {/* Lista de Productos */}
          <ProductList onCartUpdated={handleCartUpdated} />

          {/* Panel Lateral del Carrito */}
          <Cart refreshTrigger={cartTrigger} />

        </div>
      </main>
    </div>
  );
}

export default App;