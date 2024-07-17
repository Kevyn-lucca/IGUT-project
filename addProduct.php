<?php
//realiza a conexão com a base de dados
require_once("class/database.class.php");

$con = new Database();
$link = $con->getConnection();

header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);


// Recebe os dados do produto via POST
$productNome = $_POST['nome'];
$productPreco = $_POST['preco'];
$productDescricao = $_POST['descricao']; 
$productCategoria = $_POST['categoria'];

// Checa se os dados necessários foram passados e não estão vazios
if (!empty($productNome) && !empty($productPreco) && !empty($productDescricao) && !empty($productCategoria)) {
    try {
        $stmt = $link->prepare("INSERT INTO produtos (nome, preco, descricao, categoria) VALUES (:nome, :preco, :descricao, :categoria)");
        $stmt->bindParam(':nome', $productNome, PDO::PARAM_STR);
        $stmt->bindParam(':preco', $productPreco, PDO::PARAM_STR);
        $stmt->bindParam(':descricao', $productDescricao, PDO::PARAM_STR);
        $stmt->bindParam(':categoria', $productCategoria, PDO::PARAM_STR);
        $stmt->execute();
        
        echo json_encode(['message' => 'Produto adicionado com sucesso!']);
    } catch (PDOException $e) {
        echo json_encode(['message' => 'Erro: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['message' => 'Dados inválidos']);
}
?>
