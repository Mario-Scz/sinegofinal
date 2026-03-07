<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Incluir PHPMailer manualmente
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $unidades = $_POST['unidades'];
    $paginas = $_POST['paginas'];
    $tipo_impresion = $_POST['tipo_impresion'];
    $material = $_POST['material'];

    $mail = new PHPMailer(true);

    try {
        // Configuración SMTP
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com'; // Cambia si usas otro servicio
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mroberto.drako@gmail.com'; // tu correo
        $mail->Password   = 'uxhh eptj pgmc vxif';    // contraseña de app
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;

        // Destinatarios
        $mail->setFrom('mroberto.drako@gmail.com', 'Sinego Imprenta');
        $mail->addAddress('gustav.arsene@gmail.com'); // correo destino

        // Contenido
        $mail->isHTML(true);
        $mail->Subject = 'Nueva Cotización de Imprenta';
        $mail->Body    = "
            <h3>Nueva solicitud de cotización:</h3>
            <p><strong>Unidades:</strong> $unidades</p>
            <p><strong>Páginas:</strong> $paginas</p>
            <p><strong>Tipo de impresión:</strong> $tipo_impresion</p>
            <p><strong>Material:</strong> $material</p>
        ";

        $mail->send();
        echo "<p>Formulario enviado correctamente.</p>";
        echo "<p><a href='/vistas/imprenta.php'>Volver</a></p>";

    } catch (Exception $e) {
        echo "Error al enviar formulario: {$mail->ErrorInfo}";
    }
}
?>