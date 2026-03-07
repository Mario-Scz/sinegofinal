<?php
header('Content-Type: application/json');

require_once "../../config/db.php";

$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['codigo'], $input['autor'], $input['titulo'], $input['tipo'])) {
    echo json_encode(['error' => 'Datos incompletos']);
    exit;
}

try {
    $imagen = 'img/ejemplos.png'; // Imagen por defecto

    // Si hay imagen subida
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = "../../img/libros/";
        
        // Crear directorio si no existe
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }

        $fileName = uniqid() . '_' . basename($_FILES['imagen']['name']);
        $uploadPath = $uploadDir . $fileName;

        // Validar tipo de archivo
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $fileType = $_FILES['imagen']['type'];

        if (in_array($fileType, $allowedTypes)) {
            if (move_uploaded_file($_FILES['imagen']['tmp_name'], $uploadPath)) {
                $imagen = "img/libros/" . $fileName;
            }
        }
    }

    $stmt = $pdo->prepare("
        INSERT INTO libros (codigo, autor, titulo, tipo, precio, imagen)
        VALUES (?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $input['codigo'],
        $input['autor'],
        $input['titulo'],
        $input['tipo'],
        $input['precio'] ?? 0.00,
        $imagen
    ]);

    echo json_encode([
        'success' => true,
        'id' => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}
?>