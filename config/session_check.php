<?php
session_start();

// Verificar si el usuario está logueado
if (empty($_SESSION['usuario'])) {
    // Si no hay sesión, redirigir al login
    header('Location: /vistas/register.php');
    exit;
}