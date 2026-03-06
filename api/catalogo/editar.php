<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if(!isset($data["id"])){

    echo json_encode(["error"=>"ID faltante"]);
    exit;

}

try{

    $stmt = $pdo->prepare("
        UPDATE libros
        SET codigo=?, autor=?, titulo=?, tipo=?
        WHERE id=?
    ");

    $stmt->execute([
        $data["codigo"],
        $data["autor"],
        $data["titulo"],
        $data["tipo"],
        $data["id"]
    ]);

    echo json_encode(["success"=>true]);

}catch(PDOException $e){

    echo json_encode(["error"=>$e->getMessage()]);

}