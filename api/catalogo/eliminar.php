<?php

header("Content-Type: application/json");
require_once "../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data["id"] ?? 0;

$stmt = $conn->prepare("DELETE FROM catalogo WHERE id=?");
$stmt->bind_param("i",$id);

if($stmt->execute()){
    echo json_encode(["success"=>true]);
}else{
    echo json_encode(["success"=>false]);
}