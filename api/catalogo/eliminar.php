<?php
header("Content-Type: application/json");

$conexion = new mysqli("localhost","root","","sinego");

if ($conexion->connect_error) {
    echo json_encode(["success"=>false]);
    exit;
}

$id = $_POST["id"];

$sql = "DELETE FROM libros WHERE id = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("i",$id);

if($stmt->execute()){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}
?>