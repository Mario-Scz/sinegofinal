<?php
require __DIR__ . '/../config/session_check.php'; // Protege la página
$pageTitle = "Menú Principal - Sinego";
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><?= $pageTitle ?></title>
    <link rel="stylesheet" href="/css/menu.css" />
</head>
<body>

<!-- Navbar dinámico -->
<nav class="n">
  <div class="nc">
    <div class="nl">
      <a href="/vistas/bienvenido.php">
        <img src="/img/sinego.png" alt="Sinego Logo" class="lg" />
      </a>
    </div>

    <input type="checkbox" id="mchk" class="cm" />
    <label for="mchk" class="tm">
      <span></span>
      <span></span>
      <span></span>
    </label>

    <nav class="mn">
      <ul>
        <li><a href="/vistas/bienvenido.php">INICIO</a></li>
        <li><a href="/vistas/imprenta.php">IMPRENTA</a></li>
        <li><a href="/vistas/catalogo.php">CATALOGO</a></li>
        <li><a href="/vistas/menu.php">MENÚ</a></li>
      </ul>
    </nav>

    <div class="ni">
      <!-- Carrito -->
      <a href="/vistas/cart.php" class="ic" title="Carrito">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span class="cc" id="cc">0</span>
      </a>

      <!-- Favoritos -->
      <a href="/vistas/favorites.php" class="ic" title="Favoritos">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span class="cf" id="cf">0</span>
      </a>

      <!-- Botón dinámico de sesión -->
      <?php if (!empty($_SESSION['usuario'])): ?>
        <a href="/vistas/logout.php" class="ic" title="Cerrar sesión" style="display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <span>Salir</span>
        </a>
      <?php else: ?>
        <a href="/vistas/register.php" class="ic" title="Iniciar sesión" style="display:flex; align-items:center; gap:4px;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
            <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="8.5" cy="7" r="4"></circle>
            <polyline points="17 11 19 13 23 9"></polyline>
          </svg>
          <span>Iniciar sesión</span>
        </a>
      <?php endif; ?>
    </div>
  </div>
</nav>

<!-- Hero Section -->
<section class="h">
  <div class="hc">
    <h1 class="ht">Panel de Control</h1>
    <p class="hs">Accede a todas las funciones de Sinego</p>
  </div>
</section>

<!-- Main Content -->
<main class="c">
  <section class="ms">
    <h2>Selecciona una opción</h2>
    <div class="ag">
      <a href="cliente.php" class="ac">
        <div class="ia">
          <img src="/img/CLIENTE.png" alt="Cliente" />
        </div>
        <h3>Clientes</h3>
        <p>Gestiona tu base de clientes</p>
      </a>

      <a href="facturar.php" class="ac">
        <div class="ia">
          <img src="/img/facturacion.png" alt="Facturación" />
        </div>
        <h3>Facturación</h3>
        <p>Crea y gestiona facturas</p>
      </a>

      <a href="administrar.php" class="ac">
        <div class="ia">
          <img src="/img/administracion.png" alt="Administración" />
        </div>
        <h3>Administración</h3>
        <p>Panel administrativo</p>
      </a>

      <a href="imprenta2.php" class="ac">
        <div class="ia">
          <img src="/img/imprenta.png" alt="Imprenta" />
        </div>
        <h3>Imprenta</h3>
        <p>Servicios de impresión</p>
      </a>

      <a href="logistica.php" class="ac">
        <div class="ia">
          <img src="/img/logistica.png" alt="Logística" />
        </div>
        <h3>Logística</h3>
        <p>Gestión de envíos</p>
      </a>

      <a href="catalog.php" class="ac">
        <div class="ia">
          <img src="/img/catalogo.png" alt="Catálogo" />
        </div>
        <h3>Catálogo</h3>
        <p>Explora nuestros productos</p>
      </a>
    </div>
  </section>
</main>

<!-- Footer -->
<footer class="ft">
  <div class="ftc">
    <p>&copy; 2026 Sinego. Todos los derechos reservados.</p>
    <p>Tu plataforma integral de servicios.</p>
  </div>
</footer>

<script src="/js/common.js"></script>
<script src="/js/menu.js"></script>
<script src="/js/cart.js"></script>
<script src="/js/favorites.js"></script>
</body>
</html>