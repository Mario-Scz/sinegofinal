<?php
$pageTitle = 'Iniciar Sesión';
session_start();

require __DIR__ . '/../config/db.php';

// Si ya hay sesión activa
if (!empty($_SESSION['usuario'])) {
    header('Location: /vistas/menu.php');
    exit;
}
?>

<?php include __DIR__ . '/../includes/header.php'; ?>

<section class="d">
  <div class="hc">
    <h1 class="ht">Iniciar Sesión</h1>
    <p class="hs">Accede a tu cuenta de Sinego</p>
  </div>
</section>

<main class="login-wrapper">
  <div class="login-cont">
    <div class="login-card">
      <div class="login-logo">
        <img src="/img/sinego.png" alt="Sinego" />
      </div>
      <h2>Bienvenido</h2>
      <p class="login-subtitle">Ingresa tus credenciales para acceder</p>
      
      <form class="login-frm">
        <div class="fm-grp">
          <label for="usr">Usuario</label>
          <input type="text" id="usr" name="usuario" placeholder="Ingresa tu usuario" required>
        </div>

        <div class="fm-grp">
          <label for="pwd">Contraseña</label>
          <input type="password" id="pwd" name="password" placeholder="Ingresa tu contraseña" required>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesión</button>
        <!-- Aquí se mostrarán los errores vía JS -->
      </form>

      <p class="login-note">
        <strong>Nota:</strong> Las cuentas son creadas por administrador. Si aún no tienes acceso, contacta al equipo de soporte.
      </p>
    </div>
  </div>
</main>

<!-- JS del login -->
<script src="/js/register.js"></script>

<?php include __DIR__ . '/../includes/footer.php'; ?>