<?php

require_once("class/database.class.php");

$con = new Database();
$link = $con->getConnection();

header('Content-Type: application/json');

$productID = intval($_POST['id']);
$productNome = $_POST['nome'];
$productPreco = $_POST['preco'];
$productDescricao = $_POST['descricao'];

//checa se não foram passados dados vazios e o id existe dentro do banco de dados
if ($productID > 0 && !empty($productNome) && !empty($productPreco) && !empty($productDescricao)) {
    try {
        $stmt = $link->prepare("UPDATE produtos SET nome = :nome, preco = :preco, descricao = :descricao WHERE id = :id");
        $stmt->bindParam(':id', $productID, PDO::PARAM_INT);
        $stmt->bindParam(':nome', $productNome, PDO::PARAM_STR);
        $stmt->bindParam(':preco', $productPreco, PDO::PARAM_STR);
        $stmt->bindParam(':descricao', $productDescricao, PDO::PARAM_STR);
        $stmt->execute();
        
        echo json_encode(['message' => 'Produto atualizado com sucesso!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Dados inválidos'  ]);
}
?>