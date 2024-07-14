
CREATE TABLE Novoprodutos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao TINYTEXT NOT NULL,
    preco DECIMAL(10, 2) NOT NULL
);

INSERT INTO Novoprodutos (nome, descricao, preco) VALUES
('Produto A', 'Descrição produto A', 10.00),
('Produto B', 'Descrição produto B', 15.50),
('Produto C', 'Descrição produto C', 8.99),
('Produto D', 'Descrição produto D', 12.00);