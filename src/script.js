let allProducts = [];

// Função pra buscar os dados do endpoint do php
async function fetchData() {
	try {
		const response = await fetch("getProducts.php");
		const data = await response.json();
		console.log(data);

		if (data.error) {
			document.getElementById("products").innerText = "Error: " + data.error;
		} else {
			allProducts = data;
			displayProducts(allProducts); // Usa displayProducts pra mostrar todos os produtos de inicio
		}
	} catch (error) {
		console.error(error);
		document.getElementById("products").innerText =
			"ocorreu um erro adquirindo os produtos";
	}
}

fetchData();

function displayProducts(products) {
	let productHTML = products
		.map((product) => {
			return `<div class="product">
                <h1>${product.nome}</h1>
                <p>${product.preco}</p>
                <p>${product.descricao}</p>
            </div>`;
		})
		.join("");

	document.getElementById("products").innerHTML = productHTML;
}

function applyFilters() {
	const searchValue = document.getElementById("search").value.toLowerCase();
	const categoryValue = document.getElementById("category").value;

	const filteredProducts = allProducts.filter((product) => {
		const productName = product.nome.toLowerCase();
		const matchesSearch = searchValue
			? productName.includes(searchValue)
			: true;
		const matchesCategory = categoryValue
			? product.categoria === categoryValue
			: true;
		return matchesSearch && matchesCategory;
	});

	displayProducts(filteredProducts);
}

// limita as vezes que a pesquisa pode ser chamada
function debounce(func, delay) {
	let debounceTimer;
	return function () {
		const context = this;
		const args = arguments;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => func.apply(context, args), delay);
	};
}

document
	.getElementById("search")
	.addEventListener("input", debounce(applyFilters, 300));
document.getElementById("category").addEventListener("change", applyFilters);
