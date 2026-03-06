<?php
header('Content-Type: application/json');
require_once "../../config/db.php";

$data = json_decode(file_get_contents("php://input"), true);

if(!isset($data["id"])){

    echo json_encode(["error"=>"ID faltante"]);
    exit;

}

try{

    $stmt = $pdo->prepare("DELETE FROM libros WHERE id=?");

    $stmt->execute([$data["id"]]);

    echo json_encode(["success"=>true]);

}catch(PDOException $e){

    echo json_encode(["error"=>$e->getMessage()]);

}