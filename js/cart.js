document.addEventListener('DOMContentLoaded', function() {
    inicializarCarrito();
    actualizarContadores();
});

function inicializarCarrito() {
    const emptyCart = document.getElementById('emptyCart');
    const itemsList = document.getElementById('cartItems');

    // Obtener lista de carrito desde el servidor
    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            const carrito = data.success ? data.items : [];
            if (carrito.length === 0) {
                emptyCart.style.display = 'block';
                itemsList.style.display = 'none';
            } else {
                emptyCart.style.display = 'none';
                itemsList.style.display = 'block';
                mostrarItemsCarrito(carrito);
                actualizarResumen(carrito);
            }
            debug('Carrito inicializado:', carrito);
        });
}

function mostrarItemsCarrito(carrito) {
    const itemsList = document.getElementById('cartItems');
    itemsList.innerHTML = '';
    
    carrito.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-image">📚</div>
            <div class="item-details">
                <h3>${item.titulo}</h3>
                <p>Autor: ${item.autor}</p>
                <p>Precio unitario: $${parseFloat(item.precio).toFixed(2)}</p>
            </div>
            <div class="item-price">
                $${(parseFloat(item.precio) * item.cantidad).toFixed(2)}
            </div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="cambiarCantidad(${index}, -1)">−</button>
                <input type="number" class="quantity-input" value="${item.cantidad}" min="1" onchange="cambiarCantidadDirecta(${index}, this.value)">
                <button class="quantity-btn" onclick="cambiarCantidad(${index}, 1)">+</button>
                <button class="item-remove" onclick="eliminarDelCarrito(${index})">✕</button>
            </div>
        `;
        itemsList.appendChild(itemElement);
    });
}

function cambiarCantidad(index, cantidad) {
    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (!data.success) return;
            const carrito = data.items;
            const item = carrito[index];
            if (!item) return;
            const nuevaCantidad = item.cantidad + cantidad;
            if (nuevaCantidad < 1) return;
            fetch('/api/cart.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ action: 'update', product_id: item.id, cantidad: nuevaCantidad })
            }).then(() => inicializarCarrito());
        });
}

function cambiarCantidadDirecta(index, cantidad) {
    const cant = parseInt(cantidad);
    if (cant < 1) return;
    fetch('/api/cart.php?action=list')
        .then(r => r.json())
        .then(data => {
            if (!data.success) return;
            const carrito = data.items;
            const item = carrito[index];
            if (!item) return;
            fetch('/api/cart.php', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ action: 'update', product_id: item.id, cantidad: cant })
            }).then(() => inicializarCarrito());
        });
}

function eliminarDelCarrito(index) {
    if (confirm('¿Estás seguro de que deseas eliminar este item?')) {
        fetch('/api/cart.php?action=list')
            .then(r => r.json())
            .then(data => {
                if (!data.success) return;
                const item = data.items[index];
                if (!item) return;
                fetch('/api/cart.php', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ action: 'remove', product_id: item.id })
                }).then(() => {
                    mostrarNotificacion(`${item.titulo} removido del carrito`, 'success');
                    inicializarCarrito();
                });
            });
    }
}

function actualizarResumen(carrito) {
    let subtot = 0;
    carrito.forEach(item => {
        subtot += parseFloat(item.precio) * item.cantidad;
    });
    
    const tax = subtot * 0.10;
    const tot = subtot + tax;
    
    document.getElementById('subtotal').textContent = `$${subtot.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${tot.toFixed(2)}`;
}

function procederAlPago() {
    const carrito = document.getElementById('cartItems');
    if (carrito.style.display === 'none') {
        mostrarNotificacion('Tu carrito está vacío', 'error');
        return;
    }
    
    debug('Procesando pago...');
    mostrarNotificacion('Procesando pago. Gracias por tu compra', 'success');
    
    setTimeout(() => {
        fetch('/api/cart.php?action=clear')
            .then(() => {
                window.location.href = '/vistas/bienvenido.php';
            });
    }, 2000);
}

document.getElementById('chkBtn')?.addEventListener('click', procederAlPago);

function actualizarContadores() {
    Promise.all([
        fetch('/api/cart.php?action=count').then(r=>r.json()),
        fetch('/api/favorites.php?action=list').then(r=>r.json())
    ]).then(([cartRes, favRes]) => {
        const ccount = cartRes.total || 0;
        const fcount = favRes.success ? favRes.items.length : 0;
        document.querySelectorAll('#cc').forEach(el => { el.textContent = ccount; });
        document.querySelectorAll('#cf').forEach(el => { el.textContent = fcount; });
    }).catch(err=>debug('error contadores', err));
}

// Actualizar contadores cada vez que se agregue algo
setInterval(actualizarContadores, 500);

// Funciones auxiliares
function debug(msg, data) {
    console.log(msg, data);
}

function mostrarNotificacion(msg, type) {
    // Puedes implementar tu propio sistema de notificaciones
    alert(msg);
}