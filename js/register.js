document.addEventListener("DOMContentLoaded", () => {

    const form = document.querySelector(".login-frm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const usuario = document.querySelector("#usr").value.trim();
        const password = document.querySelector("#pwd").value.trim();

        try {
            const res = await fetch("/api/usuarios/login.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ usuario, password })
            });

            const data = await res.json();

            if (data.success) {
                // Redirigir al panel de admin
                window.location.href = "/vistas/menu.php";
            } else {
                mostrarError(data.mensaje);
            }

        } catch (error) {
            mostrarError("Error de conexión con el servidor");
        }
    });

    function mostrarError(msg) {
        let errorBox = document.querySelector(".login-error");
        if (!errorBox) {
            errorBox = document.createElement("p");
            errorBox.className = "login-error";
            errorBox.style.color = "red";
            errorBox.style.marginTop = "10px";
            document.querySelector(".login-frm").appendChild(errorBox);
        }
        errorBox.textContent = msg;
    }

});