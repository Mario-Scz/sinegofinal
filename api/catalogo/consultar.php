<?php

header("Content-Type: application/json");
require_once "../conexion.php";

$result = $conn->query("SELECT * FROM catalogo");

$libros = [];

while ($row = $result->fetch_assoc()) {
    $libros[] = $row;
}

echo json_encode($libros);