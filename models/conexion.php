<?php

//Clase de conexion a la base de datos
class Conexion extends PDO
{

    public function __construct()
    {

        $host = 'mysql:dbname=restauranteuoc;host=localhost';
        $usuario = 'root';
        $pass = '';

        try {
            parent::__construct($host, $usuario, $pass);
            parent::exec("set names utf8");
            parent::setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        } catch (PDOException $e) {
            echo "Error al conectar con la base de datos" . $e->getMessage();
            exit;
        }
    }
}
