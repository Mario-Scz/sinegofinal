<?php

header("Content-Type: application/json");
require_once "../conexion.php";

$data = json_decode(file_get_contents("php://input"), true);

$codigo = $data["codigo"] ?? "";
$autor = $data["autor"] ?? "";
$titulo = $data["titulo"] ?? "";
$tipo = $data["tipo"] ?? "";

if(!$codigo || !$autor || !$titulo || !$tipo){
    echo json_encode([
        "success"=>false,
        "error"=>"Faltan datos"
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO catalogo (codigo, autor, titulo, tipo) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $codigo, $autor, $titulo, $tipo);

if($stmt->execute()){
    echo json_encode([
        "success"=>true
    ]);
}else{
    echo json_encode([
        "success"=>false,
        "error"=>$stmt->error
    ]);
}