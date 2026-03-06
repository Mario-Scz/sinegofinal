<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['usuario'], $input['contraseña'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {

    $stmt = $pdo->prepare("INSERT INTO usuarios (usuario, contraseña) VALUES (?, ?)");

    $stmt->execute([
        $input['usuario'],
        $input['contraseña']
    ]);

    echo json_encode([
        'success' => true,
        'id' => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {

    echo json_encode(['error' => $e->getMessage()]);

}