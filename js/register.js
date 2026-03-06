document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("loginForm");
  const errorMsg = document.getElementById("errorMsg");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("usuario").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!usuario || !password) {
      errorMsg.textContent = "Todos los campos son obligatorios.";
      return;
    }

    try {
      const res = await fetch("/api/usuarios/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, contraseña: password })
      });

      const data = await res.json();

      if (data.success) {
        // Redirigir al menú
        window.location.href = "/vistas/menu.php";
      } else {
        errorMsg.textContent = data.error || "Usuario o contraseña incorrectos.";
      }

    } catch (err) {
      errorMsg.textContent = "Error de conexión: " + err.message;
    }
  });

});