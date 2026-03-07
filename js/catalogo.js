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

        card.innerHTML = `
          <div class="pi">
            <img src="/img/ejemplos.png" alt="${libro.titulo}">
          </div>
          <div class="pf">
            <h3>${libro.titulo}</h3>
            <p><strong>Autor:</strong> ${libro.autor}</p>
            <p><strong>Tipo:</strong> ${libro.tipo}</p>
            <p><strong>Código:</strong> ${libro.codigo}</p>
            <span class="pr">$${libro.precio || "0.00"}</span>
            <button class="btn-agr" data-id="${libro.id}">Agregar al carrito</button>
          </div>
        `;

        grid.appendChild(card);
      });

      // Agregar eventos a los botones de agregar
      document.querySelectorAll(".btn-agr").forEach(btn => {
        btn.addEventListener("click", agregarAlCarrito);
      });

    } catch (err) {
      console.error("Error al cargar libros:", err);
      grid.innerHTML = "<p style='text-align:center; padding:20px; color:red;'>Error al cargar los libros</p>";
    }
  }

  // Función para agregar al carrito
  async function agregarAlCarrito(e) {
    const id = e.target.dataset.id;
    
    try {
      const res = await fetch("/api/carrito/agregar.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, tipo: "libro" })
      });

      const data = await res.json();

      if (data.success) {
        alert("Libro agregado al carrito");
        actualizarContadorCarrito();
      } else {
        alert("Error al agregar al carrito: " + (data.error || "desconocido"));
      }
    } catch (err) {
      alert("Error de conexión: " + err.message);
    }
  }

  // Actualizar contador del carrito
  async function actualizarContadorCarrito() {
    try {
      const res = await fetch("/api/carrito/contar.php");
      const data = await res.json();
      document.getElementById("cc").textContent = data.total || 0;
    } catch (err) {
      console.error("Error al actualizar carrito:", err);
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
  actualizarContadorCarrito();
});