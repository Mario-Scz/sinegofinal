<?php
session_start();
require_once __DIR__ . "/../../config/db.php";

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$usuario = trim($data["usuario"] ?? "");
$password = trim($data["password"] ?? "");

if (!$usuario || !$password) {
    echo json_encode([
        "success" => false,
        "mensaje" => "Todos los campos son obligatorios"
    ]);
    exit;
}

try {

    $stmt = $pdo->prepare("SELECT id, usuario, contraseña FROM usuarios WHERE usuario = :usuario LIMIT 1");
    $stmt->execute(["usuario" => $usuario]);

    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user["contraseña"])) {

        session_regenerate_id(true);

        $_SESSION["id"] = $user["id"];
        $_SESSION["usuario"] = $user["usuario"];

        echo json_encode([
            "success" => true
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "mensaje" => "Usuario o contraseña incorrectos"
        ]);

    }

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "mensaje" => "Error del servidor"
    ]);

}