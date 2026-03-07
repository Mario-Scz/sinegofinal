document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    actualizarContadores();
});

function inicializarCarrito() {
    const emptyCart = document.getElementById('emptyCart');
    const itemsList = document.getElementById('cartItems');

    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (data.success && data.items.length > 0) {
                emptyCart.style.display = 'none';
                itemsList.style.display = 'block';
                mostrarItemsCarrito(data.items);
                actualizarResumen(data.items);
            } else {
                emptyCart.style.display = 'block';
                itemsList.style.display = 'none';
                actualizarResumen([]);
            }
        });
}

function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';

    carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.dataset.id = item.id; 
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
                <input type="number" class="quantity-input" value="${item.cantidad}" readonly />
                <button class="quantity-btn btn-plus">+</button>
                <button class="item-remove btn-remove">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

// MANEJO DE EVENTOS
document.getElementById('cartItems').addEventListener('click', function(e) {
    const btn = e.target;
    const itemRow = btn.closest('.cart-item');
    if (!itemRow) return;

    const id_fila = itemRow.dataset.id;
    const cantidad = parseInt(itemRow.dataset.cantidad);

    if (btn.classList.contains('btn-remove')) {
        if (confirm('¿Eliminar este producto?')) {
            enviarAccion('remove', { product_id: id_fila });
        }
    } else if (btn.classList.contains('btn-minus') && cantidad > 1) {
        enviarAccion('update', { product_id: id_fila, cantidad: cantidad - 1 });
    } else if (btn.classList.contains('btn-plus')) {
        enviarAccion('update', { product_id: id_fila, cantidad: cantidad + 1 });
    }
});

function enviarAccion(accion, datos) {
    fetch(`/api/cart.php?action=${accion}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(datos)
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            inicializarCarrito();
            actualizarContadores();
        }
    });
}

function actualizarResumen(carrito) {
    let sub = 0;
    carrito.forEach(i => sub += (parseFloat(i.precio) * i.cantidad));
    const tax = sub * 0.10;
    const tot = sub + tax;

    document.getElementById('subtotal').textContent = `$${sub.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${tot.toFixed(2)}`;
}

function actualizarContadores() {
    fetch('/api/cart.php?action=count')
        .then(r => r.json())
        .then(data => {
            document.querySelectorAll('#cc').forEach(el => el.textContent = data.total || 0);
        });
}

// Botón de pago
const chkBtn = document.getElementById('chkBtn');
if (chkBtn) {
    chkBtn.addEventListener('click', () => {
        alert('Gracias por su compra. Procesando pedido...');
        fetch('/api/cart.php?action=clear').then(() => {
            window.location.href = '/vistas/bienvenido.php';
        });
    });
}