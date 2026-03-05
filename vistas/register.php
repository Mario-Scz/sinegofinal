<?php
$pageTitle = 'Iniciar Sesión';
session_start();

require __DIR__ . '/../config/db.php';

// Si ya hay sesión activa
if (!empty($_SESSION['usuario'])) {

    // Redirigir según rol
    if ($_SESSION['rol'] === 'admin') {
        header('Location: /vistas/menu.php');
    } else {
        header('Location: /vistas/panel_cliente.php');
    }
    exit;
}

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $usuario = trim($_POST['usuario'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($usuario) || empty($password)) {
        $error = "Todos los campos son obligatorios.";
    } else {

        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1");
        $stmt->execute(['usuario' => $usuario]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {

            session_regenerate_id(true);

            $_SESSION['usuario'] = $user['usuario'];
            $_SESSION['rol'] = $user['rol']; // 🔥 IMPORTANTE

            // 🔥 Redirección por rol
            if ($user['rol'] === 'admin') {
                header("Location: /vistas/menu.php");
            } else {
                header("Location: /vistas/bienvenido.php");
            }
            exit;

        } else {
            $error = "Usuario o contraseña incorrectos.";
        }
    }
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
      
      <form class="login-frm" method="post">
        <div class="fm-grp">
          <label for="usuario">Usuario</label>
          <input type="text" id="usr" name="usuario" placeholder="Ingresa tu usuario" required>
        </div>

        <div class="fm-grp">
          <label for="password">Contraseña</label>
          <input type="password" id="pwd" name="password" placeholder="Ingresa tu contraseña" required>
        </div>

        <button type="submit" class="btn-login">Iniciar Sesión</button>

          <?php if (!empty($error)): ?>
            <p style="color:red; margin-top:10px;"><?= htmlspecialchars($error) ?></p>
          <?php endif; ?>
      </form>

      <p class="login-note">
        <strong>Nota:</strong> Las cuentas son creadas por administrador. Si aún no tienes acceso, contacta al equipo de soporte.
      </p>
    </div>
  </div>
</main>
<?php include __DIR__ . '/../includes/footer.php'; ?>