<?php

require_once("class/database.class.php");

$con = new Database();
$link = $con->getConnection();

header('Content-Type: application/json');

// Captura o corpo da requisição
$data = json_decode(file_get_contents('php://input'), true);

// Valida o ID do produto
$productID = isset($data['id']) ? filter_var($data['id'], FILTER_VALIDATE_INT) : null;

if ($productID) {
    try {
        $stmt = $link->prepare("DELETE FROM produtos WHERE id = :id");
        $stmt->bindParam(':id', $productID, PDO::PARAM_INT);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Produto deletado com sucesso!']);
        } else {
            echo json_encode(['message' => 'Produto não encontrado.']);
        }
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'ID inválido']);
}
?>
