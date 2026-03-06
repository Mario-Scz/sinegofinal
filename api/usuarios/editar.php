<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? '';

try {

    if ($buscar) {

        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario LIKE ?");
        $stmt->execute(["%$buscar%"]);

    } else {

        $stmt = $pdo->query("SELECT * FROM usuarios ORDER BY id DESC");

    }

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);

} catch (PDOException $e) {

    echo json_encode(['error' => $e->getMessage()]);

}