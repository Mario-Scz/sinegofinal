// administrar.js

document.addEventListener("DOMContentLoaded", () => {

  const tabla = document.getElementById("tablaUsuarios");
  const buscarInput = document.getElementById("buscarUsuario");

  async function cargarUsuarios(query = "") {

    try {

      const res = await fetch(`/api/usuarios/consultar.php?buscar=${encodeURIComponent(query)}`);
      const data = await res.json();

      tabla.innerHTML = "";

      data.forEach(usuario => {

        const tr = document.createElement("tr");
        tr.dataset.id = usuario.id;

        tr.innerHTML = `
          <td data-label="ID">${usuario.id}</td>

          <td data-label="Usuario">
            <input type="text" class="usuario" value="${usuario.usuario}">
          </td>

          <td data-label="Contraseña">
            <div style="display:flex;gap:6px;">
              <input type="password" class="contrasena" value="${usuario.contraseña}">
              <button class="ver">👁</button>
            </div>
          </td>

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

      console.error("Error al cargar usuarios:", err);

    }

  }

  cargarUsuarios();

  buscarInput?.addEventListener("input", e => {
    cargarUsuarios(e.target.value);
  });

  tabla.addEventListener("click", async e => {

    const tr = e.target.closest("tr");
    if (!tr) return;

    const id = tr.dataset.id;

    // revelar contraseña

    if (e.target.classList.contains("ver")) {

      const input = tr.querySelector(".contrasena");

      if (input.type === "password") {
        input.type = "text";
      } else {
        input.type = "password";
      }

    }

    // editar

    if (e.target.classList.contains("editar")) {

      tr.querySelector(".guardar").style.display = "inline-block";
      e.target.style.display = "none";

    }

    // guardar

    if (e.target.classList.contains("guardar")) {

      const usuario = tr.querySelector(".usuario").value.trim();
      const contrasena = tr.querySelector(".contrasena").value.trim();

      try {

        const res = await fetch("/api/usuarios/editar.php", {

          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({
            id,
            usuario,
            contraseña: contrasena
          })

        });

        const data = await res.json();

        if (data.success) {

          alert("Usuario actualizado");

          tr.querySelector(".editar").style.display = "inline-block";
          e.target.style.display = "none";

        } else {

          alert("Error: " + (data.error || "desconocido"));

        }

      } catch (err) {

        alert("Error de conexión: " + err.message);

      }

    }

    // eliminar

    if (e.target.classList.contains("eliminar")) {

      if (!confirm("¿Eliminar usuario?")) return;

      try {

        const res = await fetch("/api/usuarios/eliminar.php", {

          method: "POST",
          headers: { "Content-Type": "application/json" },

          body: JSON.stringify({ id })

        });

        const data = await res.json();

        if (data.success) {

          tr.remove();

        } else {

          alert("Error: " + (data.error || "desconocido"));

        }

      } catch (err) {

        alert("Error de conexión");

      }

    }

  });

});