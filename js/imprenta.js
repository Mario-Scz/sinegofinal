document.addEventListener("DOMContentLoaded", () => {

  const tabla = document.getElementById("tablaImprenta");
  const buscarInput = document.getElementById("buscarImprenta");

  // Cargar producciones
  window.cargarProducciones = async (query = "") => {

    try {

      const res = await fetch(`/api/imprenta/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";

      data.forEach(produccion => {

        const tr = document.createElement("tr");
        tr.dataset.id = produccion.id;

        tr.innerHTML = `
          <td>${produccion.id}</td>

          <td>
            <input type="text" class="id_libro" value="${produccion.id_libro || ""}" disabled>
          </td>

          <td>
            <input type="text" class="autor" value="${produccion.autor || ""}" disabled>
          </td>

          <td>
            <input type="text" class="tipo" value="${produccion.tipo || ""}" disabled>
          </td>

          <td>
            <button class="editar">✏️</button>
            <button class="guardar" style="display:none;">💾</button>
            <button class="eliminar">🗑️</button>
          </td>
        `;

        tabla.appendChild(tr);

      });

    } catch (error) {
      console.error("Error al cargar producciones:", error);
    }

  };

  cargarProducciones();

  // BUSCAR
  if (buscarInput) {
    buscarInput.addEventListener("input", e => {
      cargarProducciones(e.target.value);
    });
  }

  // EVENTOS TABLA
  tabla.addEventListener("click", async e => {

    const tr = e.target.closest("tr");
    if (!tr) return;

    const id = tr.dataset.id;

    const id_libroInput = tr.querySelector(".id_libro");
    const autorInput = tr.querySelector(".autor");
    const tipoInput = tr.querySelector(".tipo");

    // EDITAR
    if (e.target.classList.contains("editar")) {

      id_libroInput.disabled = false;
      autorInput.disabled = false;
      tipoInput.disabled = false;

      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";

    }

    // GUARDAR
    if (e.target.classList.contains("guardar")) {

      const id_libro = id_libroInput.value.trim();
      const autor = autorInput.value.trim();
      const tipo = tipoInput.value.trim();

      try {

        const res = await fetch("/api/imprenta/editar.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id,
            id_libro,
            autor,
            tipo
          })
        });

        const data = await res.json();

        if (data.success) {

          alert("Producción actualizada");

          id_libroInput.disabled = true;
          autorInput.disabled = true;
          tipoInput.disabled = true;

          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";

        } else {

          alert("Error: " + (data.error || "desconocido"));

        }

      } catch (err) {
        alert("Error de conexión: " + err.message);
      }

    }

    // ELIMINAR
    if (e.target.classList.contains("eliminar")) {

      if (!confirm("¿Eliminar producción?")) return;

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
      }

    }

  });

});