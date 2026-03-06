<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$buscar = $_GET['buscar'] ?? '';

try {

    if ($buscar != "") {

        $stmt = $pdo->prepare("
            SELECT * FROM libros 
            WHERE autor LIKE ? 
            OR titulo LIKE ? 
            OR codigo LIKE ?
        ");

        $like = "%$buscar%";
        $stmt->execute([$like,$like,$like]);

    } else {

        $stmt = $pdo->query("SELECT * FROM libros");

    }

    $libros = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($libros);

} catch(PDOException $e){

    echo json_encode(["error"=>$e->getMessage()]);

}