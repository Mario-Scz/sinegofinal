<?php
header("Content-Type: application/json");

$conexion = new mysqli("localhost","root","","sinego");

if ($conexion->connect_error) {
    echo json_encode(["success"=>false]);
    exit;
}

$id = $_POST["id"];
$codigo = $_POST["codigo"];
$autor = $_POST["autor"];
$titulo = $_POST["titulo"];
$tipo = $_POST["tipo"];

$sql = "UPDATE libros 
        SET codigo=?, autor=?, titulo=?, tipo=? 
        WHERE id=?";

$stmt = $conexion->prepare($sql);
$stmt->bind_param("ssssi",$codigo,$autor,$titulo,$tipo,$id);

if($stmt->execute()){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}
?>