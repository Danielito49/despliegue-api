// Configuración de la API de Supabase
const SUPABASE_URL = 'https://dqcpuzmnvwyeckukjpao.supabase.co/rest/v1/productos';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxY3B1em1udnd5ZWNrdWtqcGFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5OTc0MDQsImV4cCI6MjA3ODU3MzQwNH0.GEnML3mmUF0nvkcRhsO3WUarWzCR2GKE9c98mKWpPks';

// Elementos del DOM
const formProducto = document.getElementById('form-producto');
const formMensaje = document.getElementById('form-mensaje');

// Función para agregar un producto
async function agregarProducto(producto) {
    try {
        const response = await fetch(SUPABASE_URL, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(producto)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
}

// Función para mostrar mensaje
function mostrarMensaje(mensaje, tipo) {
    formMensaje.textContent = mensaje;
    formMensaje.className = `form-mensaje ${tipo}`;
    formMensaje.style.display = 'block';
    
    // Scroll al mensaje
    formMensaje.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Manejar envío del formulario
formProducto.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const btnGuardar = formProducto.querySelector('.btn-guardar');
    btnGuardar.disabled = true;
    btnGuardar.textContent = 'Guardando...';
    
    const producto = {
        codigo: document.getElementById('codigo').value.trim(),
        nombre: document.getElementById('nombre').value.trim(),
        precio: parseFloat(document.getElementById('precio').value),
        cantidad: parseInt(document.getElementById('cantidad').value)
    };
    
    try {
        await agregarProducto(producto);
        mostrarMensaje('¡Producto agregado exitosamente!', 'success');
        formProducto.reset();
        
        // Redirigir a la página principal después de 2 segundos
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    } catch (error) {
        mostrarMensaje(`Error al agregar producto: ${error.message}`, 'error');
        btnGuardar.disabled = false;
        btnGuardar.textContent = 'Guardar Producto';
    }
});
