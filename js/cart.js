document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    actualizarContadores();
});

// Carga inicial y actualización de la vista
function inicializarCarrito() {
    const emptyCart = document.getElementById('emptyCart');
    const itemsList = document.getElementById('cartItems');

    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (!data.success) throw new Error('Error al obtener carrito');
            
            const carrito = data.items;
            if (carrito.length === 0) {
                emptyCart.style.display = 'block';
                itemsList.style.display = 'none';
                actualizarResumen([]); // Poner ceros
            } else {
                emptyCart.style.display = 'none';
                itemsList.style.display = 'block';
                mostrarItemsCarrito(carrito);
                actualizarResumen(carrito);
            }
        })
        .catch(err => console.error('Error:', err));
}

// Genera el HTML de cada fila
function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        
        // IMPORTANTE: Guardamos el ID de la fila del carrito (item.id)
        itemElement.dataset.id_carrito = item.id; 
        itemElement.dataset.cantidad = item.cantidad;
        itemElement.dataset.precio = item.precio;

        itemElement.innerHTML = `
            <div class="item-image">📚</div>
            <div class="item-details">
                <h3>${item.titulo || 'Sin título'}</h3>
                <p>Autor: ${item.autor || 'Sin autor'}</p>
                <p>Precio unitario: $${parseFloat(item.precio || 0).toFixed(2)}</p>
            </div>
            <div class="item-price">
                $${(parseFloat(item.precio || 0) * item.cantidad).toFixed(2)}
            </div>
            <div class="item-quantity">
                <button class="quantity-btn btn-minus">−</button>
                <input type="number" class="quantity-input" value="${item.cantidad}" min="1" readonly />
                <button class="quantity-btn btn-plus">+</button>
                <button class="item-remove btn-remove" title="Eliminar">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

// Función para sumar o restar unidades
function actualizarCantidad(id_carrito, nuevaCantidad) {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            action: 'update', 
            product_id: id_carrito, // El PHP espera 'product_id' pero le mandamos el ID del carrito
            cantidad: nuevaCantidad 
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            inicializarCarrito(); // Refrescamos todo para ver cambios
        }
    })
    .catch(err => console.error('Error:', err));
}

// Función para eliminar producto
function eliminarItem(id_carrito, titulo) {
    fetch('/api/cart.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ 
            action: 'remove', 
            product_id: id_carrito 
        })
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            inicializarCarrito();
            actualizarContadores();
        }
    })
    .catch(err => console.error('Error:', err));
}

// Calcula Subtotal, IVA y Total
function actualizarResumen(carrito) {
    let subtot = 0;
    carrito.forEach(item => {
        subtot += parseFloat(item.precio || 0) * item.cantidad;
    });
    const tax = subtot * 0.10;
    const tot = subtot + tax;

    document.getElementById('subtotal').textContent = `$${subtot.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${tot.toFixed(2)}`;
}

// Eventos de los botones (Delegación)
document.getElementById('cartItems').addEventListener('click', function(e) {
    const btn = e.target;
    const itemRow = btn.closest('.cart-item');
    if (!itemRow) return;

    const id_carrito = itemRow.dataset.id_carrito;
    const cantidadActual = parseInt(itemRow.dataset.cantidad);
    const titulo = itemRow.querySelector('h3').textContent;

    if (btn.classList.contains('btn-remove')) {
        if (confirm(`¿Eliminar "${titulo}" del carrito?`)) {
            eliminarItem(id_carrito, titulo);
        }
    } 
    else if (btn.classList.contains('btn-minus')) {
        if (cantidadActual > 1) {
            actualizarCantidad(id_carrito, cantidadActual - 1);
        } else {
            // Si es 1 y pica menos, preguntamos si quiere borrarlo
            if (confirm(`¿Eliminar "${titulo}"?`)) eliminarItem(id_carrito, titulo);
        }
    } 
    else if (btn.classList.contains('btn-plus')) {
        actualizarCantidad(id_carrito, cantidadActual + 1);
    }
});

// Botón de pago
const chkBtn = document.getElementById('chkBtn');
if (chkBtn) {
    chkBtn.addEventListener('click', () => {
        alert('Procesando pago... ¡Gracias!');
        fetch('/api/cart.php?action=clear').then(() => {
            window.location.href = '/vistas/bienvenido.php';
        });
    });
}

// Contador del icono del nav
function actualizarContadores() {
    fetch('/api/cart.php?action=count')
        .then(r => r.json())
        .then(data => {
            const el = document.getElementById('cc');
            if (el) el.textContent = data.total || 0;
        });
}