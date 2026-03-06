<?php
header('Content-Type: application/json');
session_start();
require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['usuario'], $input['contraseña'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = :usuario LIMIT 1");
    $stmt->execute(['usuario' => $input['usuario']]);
    $user = $stmt->fetch();

    if ($user && password_verify($input['contraseña'], $user['contraseña'])) {
        // Login correcto
        session_regenerate_id(true);
        $_SESSION['usuario'] = $user['usuario'];

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Usuario o contraseña incorrectos.']);
    }

} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}