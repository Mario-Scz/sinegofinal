// imp-add.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".fm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const autor = document.getElementById("autor").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const idLibro = document.getElementById("idLibro").value.trim();

    if (!autor || !tipo || !idLibro) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const res = await fetch("/api/imprenta/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ autor, tipo, idLibro })
      });

      const data = await res.json();

      if (data.success) {
        alert("Registro agregado con ID " + data.id);
        form.reset();
      } else {
        alert("Error: " + (data.error || "Desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
      console.error(err);
    }
  });
});