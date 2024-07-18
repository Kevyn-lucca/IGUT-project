# Projeto para Estágio na IGUT Clínicas

Este projeto tem como objetivo criar uma página web dinâmica que combina PHP, JavaScript e CSS, com as seguintes funcionalidades:

1. [Crie um arquivo PHP que conecte a um banco de dados MySQL e recupere uma lista de produtos (id, nome, preço)](#php)
2. [Crie uma página HTML que exiba a lista de produtos em uma tabela utilizando AJAX (fetch API)](#javascript)
3. [Estilize a tabela com CSS para que tenha uma aparência agradável (bordas, cores alternadas nas linhas, etc.)](#css)
4. [Adicione uma funcionalidade em JavaScript que permita filtrar os produtos por nome à medida que o usuário digita em um campo de texto](#filtro-js)

## Como fazer este site funcionar

Para configurar o ambiente, siga as instruções abaixo:

1. Escolha um host MySQL de sua preferência (utilizei XAMPP, devido à sua fácil integração com Linux e administrador MySQL integrado).
2. use a tabela `produtos` disponibilizada em um banco de dados MySQL nomeado "MeusProdutos". Use o usuário "root" sem senha.
3. Caso utilize sua própria tabela de dados, o site ainda espera um banco de dados nomeado "MeusProdutos" com as mesmas especificações. A tabela de dados deve ser nomeada "produtos" com as colunas: `id`, `nome`, `descrição`, `preço`, `categoria`, `quantidade`.

### Estrutura PHP do Projeto

O PHP do projeto é dividido em 4 arquivos de requisição e um de conexão, seguindo o modelo de construção de software de mediador/middleware. O arquivo `class/database.class.php` realiza a conexão com o banco de dados, permitindo que os outros arquivos enviem e busquem dados sem a necessidade de reconexão.

Exemplo do arquivo `updateProduct.php`:

```php
<?php

require_once("class/database.class.php");

$con = new Database();
$link = $con->getConnection();

header('Content-Type: application/json');

$productID = intval($_POST['id']);
$productNome = $_POST['nome'];
$productPreco = $_POST['preco'];
$productDescricao = $_POST['descricao'];

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
    echo json_encode(['message' => 'Dados inválidos']);
}
?>
```

O arquivo acima recebe os dados do formulário dentro de `singleProduct.html`, verifica se os dados não são nulos e então atualiza o objeto na tabela com o ID passado. Os arquivos `deleteProduct.php`, `getSingleProduct.php` e `getProducts.php` funcionam de maneira similar, realizando operações CRUD (Create, Read, Update, Delete) na tabela de produtos.

### JavaScript

O JavaScript principal é o `script.js`, que faz a requisição de todos os dados da API (usando `getProducts`). Esses dados são armazenados em um array, e o método `map` é utilizado para gerar os cards exibidos no site. Armazenar os dados em um array facilita a implementação da funcionalidade de busca e filtro.

#### Algoritmo de Busca

O algoritmo de busca é chamado com o método `onInput` no HTML, o que faz a função `searchAndFilter` ser acionada sempre que o usuário digita no campo de texto. A função `search` recebe o valor do input e compara com os nomes dos produtos usando o método `filter` do array. Ambos os valores são convertidos para minúsculas para evitar conflitos. A filtragem por categoria funciona de maneira similar, usando `filter` para eliminar produtos que não pertencem à categoria selecionada.

<p id = "css"> ### CSS </p>

Foi utilizado Bootstrap junto com um CSS personalizado para criar os cards que representam os itens no estoque, proporcionando um design mais lúdico e garantindo responsividade.
