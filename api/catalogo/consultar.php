<?php

header("Content-Type: application/json");
require_once "../conexion.php";

$result = $conn->query("SELECT * FROM catalogo");

$datos = [];

while($row = $result->fetch_assoc()){
    $datos[] = $row;
}

echo json_encode($datos);