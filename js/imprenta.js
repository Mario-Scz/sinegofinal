// imprenta.js
document.addEventListener("DOMContentLoaded", () => {
  const tabla = document.getElementById("tablaImprenta");
  const buscarInput = document.getElementById("buscarImprenta");

  // Función para actualizar la tabla desde el servidor
  async function cargarImprenta(query = "") {
    try {
      const res = await fetch(`/api/imprenta/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";
      data.forEach(item => {
        const tr = document.createElement("tr");
        tr.dataset.id = item.id;

        tr.innerHTML = `
          <td data-label="ID">${item.id}</td>
          <td data-label="Autor"><input type="text" class="autor" value="${item.autor}"></td>
          <td data-label="Tipo"><input type="text" class="tipo" value="${item.tipo}"></td>
          <td data-label="ID Libro"><input type="text" class="idLibro" value="${item.idLibro}"></td>
          <td data-label="Acciones">
            <div class="ba">
              <button class="ba editar">✏️</button>
              <button class="ba guardar" style="display:none;">💾</button>
              <button class="ba eliminar">🗑️</button>
            </div>
          </td>
        `;
        tabla.appendChild(tr);
      });
    } catch (err) {
      console.error("Error al cargar imprenta:", err);
    }
  }

  // Cargar imprenta al inicio
  cargarImprenta();

  // Buscar mientras escribes
  buscarInput?.addEventListener("input", e => {
    cargarImprenta(e.target.value);
  });

  // Delegación de eventos para editar, guardar y eliminar
  tabla.addEventListener("click", async e => {
    const tr = e.target.closest("tr");
    if (!tr) return;
    const id = tr.dataset.id;

    // EDITAR: mostrar botón guardar
    if (e.target.classList.contains("editar")) {
      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";
    }

    // GUARDAR: enviar cambios al servidor
    if (e.target.classList.contains("guardar")) {
      const autor = tr.querySelector(".autor").value.trim();
      const tipo = tr.querySelector(".tipo").value.trim();
      const idLibro = tr.querySelector(".idLibro").value.trim();

      try {
        const res = await fetch("/api/imprenta/editar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id, autor, tipo, idLibro })
        });

        const data = await res.json();
        if (data.success) {
          alert("Registro actualizado");
          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";
        } else {
          alert("Error al actualizar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
        console.error(err);
      }
    }

    // ELIMINAR
    if (e.target.classList.contains("eliminar")) {
      if (!confirm("¿Eliminar registro de imprenta?")) return;
      try {
        const res = await fetch("/api/imprenta/eliminar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id })
        });

        const data = await res.json();
        if (data.success) {
          tr.remove();
        } else {
          alert("Error al eliminar: " + (data.error || "desconocido"));
        }
      } catch (err) {
        alert("Error de conexión: " + err.message);
        console.error(err);
      }
    }
  });
});