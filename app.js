// Configuración de la API de Supabase
const SUPABASE_URL = 'https://dqcpuzmnvwyeckukjpao.supabase.co/rest/v1/productos';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3B1em1udnd5ZWNrdWtqcGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTc0MDQsImV4cCI6MjA3ODU3MzQwNH0.GEnML3mmUF0nvkcRhsO3WUarWzCR2GKE9c98mKWpPks';

// Elementos del DOM
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');
const productosGrid = document.getElementById('productos-grid');

// Función para obtener productos de la API
async function obtenerProductos() {
    try {
        const response = await fetch(`${SUPABASE_URL}?select=*`, {
            method: 'GET',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const productos = await response.json();
        mostrarProductos(productos);
    } catch (error) {
        mostrarError(`Error al cargar los productos: ${error.message}`);
    } finally {
        loadingElement.style.display = 'none';
    }
}

// Función para mostrar los productos en el DOM
function mostrarProductos(productos) {
    if (!productos || productos.length === 0) {
        productosGrid.innerHTML = '<p style="color: white; text-align: center;">No hay productos disponibles</p>';
        return;
    }

    productosGrid.innerHTML = productos.map(producto => {
        const cantidad = producto.cantidad || 0;
        let cantidadClass = '';
        
        if (cantidad === 0) {
            cantidadClass = 'sin-stock';
        } else if (cantidad < 10) {
            cantidadClass = 'stock-bajo';
        }

        return `
            <div class="producto-card">
                <span class="producto-codigo">Código: ${producto.codigo || 'N/A'}</span>
                <h2 class="producto-nombre">${producto.nombre || 'Sin nombre'}</h2>
                <div class="producto-info">
                    <div class="producto-precio">$${formatearPrecio(producto.precio)}</div>
                    <div class="producto-cantidad ${cantidadClass}">
                        <strong>${cantidad}</strong> unidades
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Función para formatear el precio
function formatearPrecio(precio) {
    if (precio === null || precio === undefined) return '0.00';
    return parseFloat(precio).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Función para mostrar errores
function mostrarError(mensaje) {
    errorElement.textContent = mensaje;
    errorElement.style.display = 'block';
}

// Cargar productos al cargar la página
document.addEventListener('DOMContentLoaded', obtenerProductos);
