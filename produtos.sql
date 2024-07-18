-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 18/07/2024 às 21:43
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `MeusProdutos`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `produtos`
--

CREATE TABLE `produtos` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `descricao` text NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `categoria` varchar(100) NOT NULL,
  `quantidade` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `produtos`
--

INSERT INTO `produtos` (`id`, `nome`, `descricao`, `preco`, `categoria`, `quantidade`) VALUES
(1, 'Jogo de chaves de Hefesto', 'O jogo de chave combinada ideal para apertar e afrouxar parafusos ou porcas com perfil quadrado ou sextavado, as chaves são fabricadas com matéria prima que garante alta resistência e durabilidade. Para perfeito funcionamento é importante usar a chave de tamanho compatível à cabeça da porca ou parafuso.', 49.00, 'tecnologia', 30),
(2, 'Carregador de Zeus', 'É um equipamento utilizado para fornecer energia elétrica a dispositivos eletrônicos, como celulares, tablets, notebooks, entre outros. Ele é responsável por converter a corrente elétrica da tomada em uma voltagem adequada para o funcionamento desses aparelhos.', 79.00, 'tecnologia', 6),
(3, 'Vinho de Dionisio', 'Bebida obtida pela fermentação alcoólica de mosto de uva sã, fresca e madura, sendo proibida a aplicação do termo a produtos obtidos a partir de outras matérias-primas.', 99.99, 'cozinha', 6),
(4, 'Moleton de hades', 'É um tecido macio, de algodão ou lã, que é usado nos dias mais frios do ano. Um moletom geralmente tem uma Composição de: 70% algodão 30% poliéster, essa composição garante o aquecimento ', 19.00, 'roupa', 7),
(5, 'Capuz de Atena', ' Peça de vestuário que cobre a cabeça e geralmente parte dos ombros. Ele pode ser uma extensão de uma peça de roupa, como um casaco ou uma jaqueta, ou uma peça independente, como um capuz de moletom.', 19.00, 'roupa', 30),
(6, 'Luvas de Deméter', 'Peças de vestuário projetadas para cobrir as mãos e, em alguns casos, parte dos antebraços', 12.00, 'roupa', 8),
(7, 'Churrasqueira de Apolo', 'Equipamento usado para preparar carnes e outros alimentos através de grelha, assado ou churrasco.', 11.00, 'cozinha', 23),
(10, 'Smartwatch de Hermes', 'Relógio inteligente que se conecta ao seu smartphone para fornecer notificações, monitoramento de saúde e atividades físicas, além de outras funcionalidades avançadas.', 199.00, 'tecnologia', 15),
(11, 'Jaqueta de Ares', 'Peça de roupa resistente e estilosa, feita de materiais duráveis e ideal para aventuras ao ar livre. Composta de 100% poliéster, proporciona aquecimento e proteção contra vento.', 89.00, 'roupa', 12),
(12, 'Mixer de Hera', 'Aparelho elétrico utilizado para misturar, bater e triturar alimentos, facilitando a preparação de receitas diversas.', 59.00, 'cozinha', 20),
(13, 'Camiseta de Afrodite', 'Camiseta confortável e leve, feita de algodão 100%. Ideal para uso casual e para expressar estilo e personalidade.', 25.00, 'roupa', 25),
(14, 'Fritadeira de Hefesto', 'Aparelho de cozinha que permite fritar alimentos com pouco ou nenhum óleo, utilizando ar quente em alta velocidade.', 139.00, 'cozinha', 10);


;

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `produtos`
--
ALTER TABLE `produtos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `produtos`
--
ALTER TABLE `produtos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
