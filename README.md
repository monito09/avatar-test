# Avatar Tech Test - Frontend & Backend (Monorepo)

Prueba técnica desarrollada para la posición de Desarrollador Junior.
El proyecto incluye un Backend (Node.js + Express + Prisma + SQLite) y un Frontend (React + Vite + TailwindCSS).

## 🚀 Puntos Extra Implementados (Plus)
- **Paginación y Buscador** integrados en la API y el Frontend.
- Lógica de cálculo matemático del precio original centralizada en el Backend.
- **Commits atómicos** en Git para trazabilidad del desarrollo.
- Diseño responsivo (Mobile-First) acelerado con TailwindCSS.

## ⏱️ Estimación vs Tiempo Real

| Tarea / Módulo | Estimación (Hrs) | Tiempo Real (Hrs) | Justificación / Comentarios |
| :--- | :--- | :--- | :--- |
| Análisis y Diseño de BD (SQLite) | 1.0 h | 1.0 h | Modelado en Prisma de `Usuario`, `Order` y `OrderItem`. Configuración inicial de dependencias y solución de conflictos en el adaptador SQLite. |
| Backend: Consumo DummyJSON | 1.5 h | 1.0 h | Implementación de `fetch`, mapeo de datos y cálculo del precio original con la fórmula matemática requerida. |
| Backend: APIs de Carrito (CRUD) | 2.0 h | 2.0 h | Lógica de estado ('ACTIVO'), recálculo dinámico del total y validaciones de existencia de items. |
| Frontend: Setup + UI Catálogo | 2 h | 1.5 h | *Mejoré mi tiempo estimado apoyándome en IA (como sugirió el Tech Lead) para la maquetación rápida con TailwindCSS.* |
| Frontend: UI Carrito + Integración | 1.5 h | 1.5 h | Conexión de estados entre componentes (`ProductList` y `Cart`) mediante triggers. |
| Testing Postman + Documentación | 1.0 h | 1.0 h | Pruebas de endpoints y redacción de este README. |
| **TOTAL** | **9 h** | **8 h** | **Proyecto completado exitosamente dentro del margen esperado.** |

## 🛠️ Instrucciones de Ejecución

### 1. Iniciar el Backend
Desde la raíz del proyecto, abre una terminal:
\`\`\`bash
cd backend
npm install
npx prisma migrate dev --name init
npx tsx prisma/seed.ts  # Crea el usuario por defecto
npm run dev
\`\`\`
El backend correrá en `http://localhost:3001`

### 2. Iniciar el Frontend
Abre otra terminal desde la raíz del proyecto:
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`
El frontend correrá en `http://localhost:5173`

### 3. Testing con Postman
Las APIs disponibles en el Backend son:
- `GET /api/products?q=query&limit=10&skip=0`
- `GET /api/cart`
- `POST /api/cart/add` (Body JSON: `{ "idProducto": 1, "precio": 559, "sku": "BICI" }`)
- `DELETE /api/cart/remove/:idDetalle`