document.addEventListener("DOMContentLoaded", cargarCatalogo);

async function cargarCatalogo(){

const res = await fetch("/api/catalogo/consultar.php");
const data = await res.json();

const tabla = document.querySelector("tbody");

tabla.innerHTML="";

data.forEach(libro =>{

tabla.innerHTML += `
<tr>
<td>${libro.codigo}</td>
<td>${libro.autor}</td>
<td>${libro.titulo}</td>
<td>${libro.tipo}</td>

<td>
<button onclick="eliminar(${libro.id})">Eliminar</button>
</td>

</tr>
`;

});

}

async function eliminar(id){

if(!confirm("Eliminar libro?")) return;

await fetch("/api/catalogo/eliminar.php",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({id:id})
});

cargarCatalogo();

}