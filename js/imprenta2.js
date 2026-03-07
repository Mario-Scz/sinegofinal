document.getElementById("formImprenta").addEventListener("submit", function(e){

e.preventDefault();

let formData = new FormData(this);

fetch("enviar-form.php",{
method:"POST",
body:formData
})
.then(res => res.text())
.then(data =>{

document.getElementById("mensajeFormulario").innerHTML = data;

})
.catch(err =>{
document.getElementById("mensajeFormulario").innerHTML = "Error al enviar.";
});

});