<?php 
$pageTitle = 'Iniciar Sesión';
session_start();
require __DIR__ . '/../config/db.php';

// Redirigir si ya hay sesión activa
if (!empty($_SESSION['usuario'])) {
    header('Location: /vistas/menu.php');
    exit;
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Iniciar Sesión - Sinego</title>
<link rel="stylesheet" href="/css/register.css">
</head>
<body>

<!-- Navbar idéntica a menú -->
<nav class="n">
  <div class="nc">
    <div class="nl">
      <a href="/vistas/bienvenido.php">
        <img src="/img/sinego.png" alt="Sinego Logo" class="lg">
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
        <li><a href="/vistas/catalogo.php">CATÁLOGO</a></li>
        <li><a href="/vistas/menu.php">MENÚ</a></li>
      </ul>
    </nav>

    <div class="ni">
      <?php if (!empty($_SESSION['usuario'])): ?>
        <a href="/vistas/logout.php" class="ic" title="Cerrar sesión">
          <span>Salir</span>
        </a>
      <?php else: ?>
        <a href="/vistas/register.php" class="ic" title="Iniciar sesión">
          <span>Iniciar sesión</span>
        </a>
      <?php endif; ?>
    </div>
  </div>
</nav>

<!-- Hero Section para login -->
<section class="h">
  <div class="hc">
    <h1 class="ht">Iniciar Sesión</h1>
    <p class="hs">Accede a tu cuenta de Sinego</p>
  </div>
</section>

<!-- Login Card centrado -->
<main class="login-wrapper">
  <div class="login-cont">
    <div class="login-card">
      <div class="login-logo">
        <img src="/img/sinego.png" alt="Sinego" />
      </div>
      <h2>Bienvenido</h2>
      <p class="login-subtitle">Ingresa tus credenciales</p>
      
      <form class="login-frm" id="loginForm">
        <div class="fm-grp">
          <label for="usuario">Usuario</label>
          <input type="text" id="usuario" name="usuario" placeholder="Usuario" required>
        </div>

        <div class="fm-grp">
          <label for="password">Contraseña</label>
          <input type="password" id="password" name="password" placeholder="Contraseña" required>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesión</button>

        <p id="errorMsg" style="color:red; margin-top:10px;"></p>
      </form>

      <p class="login-note">
        <strong>Nota:</strong> Las cuentas son creadas por administrador.
      </p>
    </div>
  </div>
</main>

<script src="/js/register.js"></script>
</body>
</html>