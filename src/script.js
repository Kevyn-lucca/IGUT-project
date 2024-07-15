/*
Todos: 
Refatore o codigo
Adicione um carrosel de imagens para cada item
adicione uma pagina pra cada item com routing
melhorar sistema de busca
*/

let allProducts = [];
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

searchInput.addEventListener("input", delay(searchAndFilters, 600));
categorySelect.addEventListener("change", searchAndFilters);

// Função para exibir produtos
function displayProducts(products) {
	const productHTML = products
		.map(
			(product) => `
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title text-center">${product.nome}</h5>
        <h6 class="card-subtitle mb-2 text-muted">$${product.preco}</h6>
        <p class="card-text">${product.descricao}</p>
      </div>
    </div>
  `
		)
		.join("");
	// Define o html interno do elemento com  'products' para ser o html gerado a partir dos produtos
	document.getElementById("products").innerHTML = productHTML;
}

// Função para buscar os dados do endpoint do PHP
async function fetchData() {
	try {
		const response = await fetch("getProducts.php");
		allProducts = await response.json();
		displayProducts(allProducts);
	} catch (error) {
		console.error("Failed to fetch products:", error);
		document.getElementById("products").innerText =
			"Ocorreu um erro, por favor, retorne mais tarde.";
	}
}
fetchData();

// Função para aplicar filtros
function searchAndFilters() {
	const searchValue = document.getElementById("search").value.toLowerCase();
	const categoryValue = document.getElementById("category").value;

	const filteredProducts = allProducts.filter((product) => {
		const productName = product.nome.toLowerCase();
		const matchesSearch = !searchValue || productName.includes(searchValue);
		const matchesCategory =
			!categoryValue || product.categoria === categoryValue;
		return matchesSearch && matchesCategory;
	});

	displayProducts(filteredProducts);
}

// Função para limitar a frequência de chamadas da função de procura
function delay(func, delay) {
	let delayTimer;
	return function (...args) {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => func.apply(this, args), delay);
	};
}
