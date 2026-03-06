document.addEventListener("DOMContentLoaded", () => {

const form = document.querySelector(".fm");

form.addEventListener("submit", async (e)=>{

e.preventDefault();

const codigo = document.getElementById("idL").value;
const autor = document.getElementById("aut").value;
const titulo = document.getElementById("libro").value;
const tipo = document.getElementById("tp").value;

const res = await fetch("/api/catalogo/agregar.php",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
codigo:codigo,
autor:autor,
titulo:titulo,
tipo:tipo
})
});

const data = await res.json();

if(data.success){

alert("Libro agregado");

window.location.href="/vistas/catalogo.php";

}else{

alert("Error al agregar");

}

});

});