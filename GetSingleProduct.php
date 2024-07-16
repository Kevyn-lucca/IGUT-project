<?php

require_once("class/database.class.php");

$con = new Database();
$link = $con->getConnection();

header('Content-Type: application/json');

$productID =  intval($_GET['id']) ;

if ($productID > 0) {
    try {
        $stmt = $link->prepare("SELECT * FROM produtos WHERE id = :id");
        $stmt->bindParam(':id', $productID, PDO::PARAM_INT);
        $stmt->execute();
        $data = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode($data);

    } catch (PDOException $e) {
        echo "Erro: " . $e->getMessage();
    }
}
?>
