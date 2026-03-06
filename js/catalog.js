document.addEventListener("DOMContentLoaded", cargarCatalogo);

async function cargarCatalogo() {

  try {

    const res = await fetch("/api/catalogo/consultar.php");
    const data = await res.json();

    const tbody = document.querySelector("tbody");

    tbody.innerHTML = "";

    data.forEach(libro => {

      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td data-label="Autor"><input type="text" value="${libro.autor}" /></td>
        <td data-label="Tipo"><input type="text" value="${libro.tipo}" /></td>
        <td data-label="ID Libro"><input type="text" value="${libro.codigo}" /></td>
        <td data-label="Acciones">
          <div class="ba">
            <button class="ba d" onclick="eliminarLibro(${libro.id})">🗑️</button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);

    });

  } catch (err) {

    console.error("Error cargando catálogo:", err);

  }

}

async function eliminarLibro(id) {

  if (!confirm("¿Eliminar libro?")) return;

  await fetch("/api/catalogo/eliminar.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id })
  });

  cargarCatalogo();

}