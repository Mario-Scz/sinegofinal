<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['id'], $input['usuario'], $input['password'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {

    $stmt = $pdo->prepare("UPDATE usuarios SET usuario = ?, password = ? WHERE id = ?");
    $stmt->execute([
        $input['usuario'],
        $input['password'],
        $input['id']
    ]);

    echo json_encode(['success' => true]);

} catch (PDOException $e) {

    echo json_encode(['error' => $e->getMessage()]);

}