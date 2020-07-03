<?php

require '../models/reservaModel.php';

//Se recogen el tipo de acción

$tarea = '';
if (isset($_GET['tarea'])) {
    $tarea = $_GET['tarea'];
}

//Se crea una instancia del modelo
$reserva = new Reserva();

//Se lee la acción a realizar
switch ($tarea) {

    case "consultarReservas":
        echo json_encode($reserva->consultarReservas());
        break;

    case "consultarReserva":
        $id = $_POST["id"];
        echo json_encode($reserva->consultarReserva($id));
        break;

    case "consultarReservas24horas";
        echo json_encode($reserva->consultarReservas24horas());
        break;

    case "consultarNumeroReservas24horas";
        echo json_encode($reserva->consultarNumeroReservas24horas());
        break;

    case "guardarReserva":
        //Leer parametros POST
        $nombre = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        $telefono = $_POST["telefono"];
        $fecha = $_POST["fecha"];
        $hora = $_POST["hora"];
        $comensales = $_POST["comensales"];
        $comentarios = $_POST["comentarios"];

        //Se guarda la nueva reserva
        $respuesta = $reserva->guardarReserva($nombre, $apellidos, $telefono, $fecha, $hora, $comensales, $comentarios);
        echo json_encode($respuesta);
        break;

    case "modificarReserva":
        //Leer parametros POST
        $id = $_POST["id"];
        $nombre = $_POST["nombre"];
        $apellidos = $_POST["apellidos"];
        $telefono = $_POST["telefono"];
        $fecha = $_POST["fecha"];
        $hora = $_POST["hora"];
        $comensales = $_POST["comensales"];
        $comentarios = $_POST["comentarios"];

        //Se guarda la nueva reserva
        $respuesta = $reserva->modificarReserva($id, $nombre, $apellidos, $telefono, $fecha, $hora, $comensales, $comentarios);
        echo json_encode($respuesta);
        break;

    case "eliminarReserva":
        $id = $_POST["id"];
        echo json_encode($reserva->eliminarReserva($id));
        break;
}
