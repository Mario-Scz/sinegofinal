<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id_libro'], $input['autor'], $input['tipo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("INSERT INTO imprenta2 (id_libro, autor, tipo) VALUES (?, ?, ?)");
    $stmt->execute([$input['id_libro'], $input['autor'], $input['tipo']]);

    echo json_encode([
        'success' => true,
        'id' => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}