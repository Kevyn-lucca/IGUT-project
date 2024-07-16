<?php

require_once("class/database.class.php");

$con = new Database();
$link = $con->getConnection();

header('Content-Type: application/json');



if ($link) {
    try {
        $stmt = $link->prepare("SELECT * FROM produtos");
        $stmt->execute();
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($data);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Falha a se conectar a base de dados"]);
}
?>
