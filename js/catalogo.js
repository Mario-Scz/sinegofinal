document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".pg");
  const buscarInput = document.querySelector(".ib");
  const checkboxes = document.querySelectorAll(".flt input[type='checkbox']");

  // Cargar libros desde la API
  async function cargarLibros() {
    try {
      const res = await fetch("/api/catalogo/consultar.php");
      const data = await res.json();

      grid.innerHTML = "";

      if (data.length === 0) {
        grid.innerHTML = "<p style='text-align:center; padding:20px;'>No hay libros disponibles</p>";
        return;
      }

      data.forEach(libro => {
        const card = document.createElement("div");
        card.className = "pc";
        card.dataset.id = libro.id;
        card.dataset.titulo = libro.titulo.toLowerCase();
        card.dataset.autor = libro.autor.toLowerCase();
        card.dataset.tipo = libro.tipo.toLowerCase();

        // Formatear precio
        const precio = libro.precio ? parseFloat(libro.precio).toFixed(2) : "0.00";
        const imagen = libro.imagen ? libro.imagen : "/img/ejemplos.png";

        card.innerHTML = `
          <div class="pi">
            <img src="${imagen}" alt="${libro.titulo}" onerror="this.src='/img/ejemplos.png'">
          </div>
          <div class="pf">
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Tipo:</strong> ${libro.tipo}</p>
            <p><strong>Código:</strong> ${libro.codigo}</p>
            <span class="pr">$${precio}</span>
            <button class="btn-agr" data-id="${libro.id}">Agregar al carrito</button>
          </div>
        `;

        grid.appendChild(card);
      });

    } catch (err) {
      console.error("Error al cargar libros:", err);
      grid.innerHTML = "<p style='text-align:center; padding:20px; color:red;'>Error al cargar los libros</p>";
    }
  }

  // Filtrar por búsqueda
  buscarInput?.addEventListener("input", e => {
    const termino = e.target.value.toLowerCase();
    const cards = document.querySelectorAll(".pc");

    cards.forEach(card => {
      const titulo = card.dataset.titulo;
      const autor = card.dataset.autor;
      const tipo = card.dataset.tipo;

      if (titulo.includes(termino) || autor.includes(termino) || tipo.includes(termino)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // Filtrar por géneros (checkboxes)
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const termino = checkbox.parentElement.querySelector("span").textContent.toLowerCase();
      const cards = document.querySelectorAll(".pc");

      cards.forEach(card => {
        const tipo = card.dataset.tipo;

        if (tipo.includes(termino)) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Cargar al inicio
  cargarLibros();
});