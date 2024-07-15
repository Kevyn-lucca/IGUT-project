<?php

class Database {
    //Dados necessarios
    private $driver;
    private $host;
    private $dbname;
    private $username;
    private $con;

    function __construct() {
        $this->driver = "mysql";
        $this->host = "localhost";
        $this->dbname = "Produtos";
        $this->username = "root";
    }

    function getConnection() {
        // faz uma conexão com os dados requisitados
        try {
            $this->con = new PDO(
                "$this->driver:host=$this->host;dbname=$this->dbname",
                $this->username,
            );

            $this->con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

            return $this->con;

        } catch (Exception $e) {
            echo $e->getMessage();
            return null;
        }
    }
}
?>
