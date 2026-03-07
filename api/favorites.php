<?php
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php'; // Asegúrate que esta ruta sea correcta

$action = $_GET['action'] ?? '';
$input = json_decode(file_get_contents('php://input'), true);

// IMPORTANTE: Tu JS manda "id", así que lo capturamos aquí
$id_libro = $input['id'] ?? null;

if ($action === 'add') {
    if (!$id_libro) {
        echo json_encode(['success' => false, 'error' => 'No se recibió ID de libro']);
        exit;
    }

    try {
        // 1. Verificamos si ya existe para no duplicar
        $check = $pdo->prepare("SELECT id FROM favoritos WHERE id_libro = ?");
        $check->execute([$id_libro]);
        
        if ($check->fetch()) {
            // Si ya existe, mandamos success false pero con un mensaje específico
            echo json_encode(['success' => false, 'message' => 'Ya está en favoritos']);
        } else {
            // 2. Si no existe, lo insertamos
            $stmt = $pdo->prepare("INSERT INTO favoritos (id_libro) VALUES (?)");
            $resultado = $stmt->execute([$id_libro]);
            echo json_encode(['success' => $resultado]);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

if ($action === 'list') {
    try {
        // Traemos los datos uniendo con la tabla libros
        $stmt = $pdo->query("SELECT f.id, f.id_libro, l.titulo, l.autor, l.precio 
                             FROM favoritos f 
                             JOIN libros l ON f.id_libro = l.id 
                             ORDER BY f.id DESC");
        echo json_encode(['success' => true, 'items' => $stmt->fetchAll()]);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'error' => $e->getMessage()]);
    }
    exit;
}

if ($action === 'remove') {
    $id_fila = $input['id'] ?? null;
    $stmt = $pdo->prepare("DELETE FROM favoritos WHERE id = ?");
    $stmt->execute([$id_fila]);
    echo json_encode(['success' => true]);
    exit;
}

if ($action === 'count') {
    $stmt = $pdo->query("SELECT COUNT(*) as total FROM favoritos");
    $res = $stmt->fetch();
    echo json_encode(['total' => $res['total'] ?? 0]);
    exit;
}