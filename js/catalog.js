document.addEventListener("DOMContentLoaded", cargarLibros);

function cargarLibros(){

fetch("/api/catalogo/consultar.php")

.then(res => res.json())

.then(data => {

const tabla = document.getElementById("tablaCatalogo");

tabla.innerHTML = "";

data.forEach(libro => {

tabla.innerHTML += `
<tr>

<td data-label="Autor">
<input type="text" value="${libro.autor}" id="autor${libro.id}">
</td>

<td data-label="Tipo">
<input type="text" value="${libro.tipo}" id="tipo${libro.id}">
</td>

<td data-label="ID Libro">
<input type="text" value="${libro.codigo}" id="codigo${libro.id}">
</td>

<td data-label="Acciones">
<div class="ba">

<button class="ba e" onclick="editarLibro(${libro.id})">
✏️
</button>

<button class="ba d" onclick="eliminarLibro(${libro.id})">
🗑️
</button>

</div>
</td>

</tr>
`;
});

});
}

function eliminarLibro(id){

if(!confirm("Eliminar libro?")) return;

fetch("/api/catalogo/eliminar.php",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:"id="+id
})
.then(res=>res.json())
.then(data=>{

if(data.success){
cargarLibros();
}else{
alert("Error al eliminar");
}

});

}

function editarLibro(id){

let fila = document.getElementById("fila-"+id);

let codigo = fila.querySelector(".codigo").value;
let autor = fila.querySelector(".autor").value;
let titulo = fila.querySelector(".titulo").value;
let tipo = fila.querySelector(".tipo").value;

fetch("/api/catalogo/editar.php",{
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:`id=${id}&codigo=${codigo}&autor=${autor}&titulo=${titulo}&tipo=${tipo}`
})
.then(res=>res.json())
.then(data=>{

if(data.success){
alert("Libro actualizado");
}else{
alert("Error al editar");
}

});

}