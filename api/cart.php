<?php
header('Content-Type: application/json');
// ... (Tus cabeceras y conexión a DB se mantienen igual) ...

$action = $_GET['action'] ?? $_POST['action'] ?? '';

// Si la petición viene por FETCH POST con JSON
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if ($input) {
        $action = $input['action'] ?? $action;
    }
}

switch ($action) {
    case 'list':
        $stmt = $pdo->query("SELECT c.id, c.cantidad, l.titulo, l.autor, l.precio FROM carrito c LEFT JOIN libros l ON c.id_libro = l.id ORDER BY c.id DESC");
        echo json_encode(['success' => true, 'items' => $stmt->fetchAll()]);
        break;

    case 'update':
        $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ? WHERE id = ?");
        $stmt->execute([$input['cantidad'], $input['product_id']]);
        echo json_encode(['success' => true]);
        break;

    case 'remove':
        $stmt = $pdo->prepare("DELETE FROM carrito WHERE id = ?");
        $stmt->execute([$input['product_id']]);
        echo json_encode(['success' => true]);
        break;

    case 'count':
        $stmt = $pdo->query("SELECT SUM(cantidad) as total FROM carrito");
        $res = $stmt->fetch();
        echo json_encode(['total' => $res['total'] ?? 0]);
        break;

    case 'clear':
        $pdo->query("DELETE FROM carrito");
        echo json_encode(['success' => true]);
        break;
}
?>