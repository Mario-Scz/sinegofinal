<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

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
        // Configuración SMTP Gmail
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mroberto.drako@gmail.com';        // tu Gmail
        $mail->Password   = 'uxhh eptj pgmc vxif';           // contraseña de aplicación
        $mail->SMTPSecure = 'tls';
        $mail->Port       = 587;
        $mail->SMTPDebug  = 2;       // <-- DEBUG
        $mail->Debugoutput = 'html';

        // Destinatario
        $mail->setFrom('mroberto.drako@gmail.com', 'Sinego Imprenta');
        $mail->addAddress('mroberto.drako@gmail.com'); // donde recibes los mails

        // Contenido del correo
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

        // Redirigir al formulario con mensaje de éxito
        header("Location: /vistas/imprenta.php?success=1");
        exit; // <- MUY IMPORTANTE

    } catch (Exception $e) {
         // Mostrar error real de PHPMailer en la página
        echo "<h2>Error al enviar el formulario:</h2>";
        echo "<p>{$mail->ErrorInfo}</p>";
        exit; // <- MUY IMPORTANTE
    }
}
?>