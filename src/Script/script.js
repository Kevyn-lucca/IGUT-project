/*
Todos: 
adicione a quantidade de itens
Refatore o codigo
//melhorar sistema de busca
//Adicione um carrosel de imagens para cada item
//adicione uma pagina pra cada item com routing
*/

let allProducts = [];
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");

searchInput.addEventListener("input", delay(searchAndFilters, 600));
categorySelect.addEventListener("change", searchAndFilters);

// Função para exibir produtos, usa o metodo map para gerar o html de cada um
function displayProducts(products) {
	const productHTML = products
		.map(
			(product) => `
			<div class="shadow-sm scale-hover" style="width: 18rem; height:19rem"">
			<a class="card   link-underline-opacity-0 link-underline" style="width: 18rem; height: 19rem " href="singleProduct.html?id=${product.id}">
      <div class="card-body ">
        <h5 class="card-title text-center">${product.nome}</h5>
        <h6 class="card-subtitle mb-2 text-muted">R$ ${product.preco}</h6>
        <p class="card-text truncate-wrap "  >${product.descricao}</p>
      </div>
	  </a>
	  </div>
  `
		)
		.join("");
	document.getElementById("products").innerHTML = productHTML;
}

// Função para buscar os dados do endpoint do php
async function fetchData() {
	try {
		const response = await fetch("getProducts.php");
		allProducts = await response.json();
		displayProducts(allProducts);
	} catch (error) {
		console.error(error);
		document.getElementById("products").innerText =
			"Ocorreu um erro, por favor, retorne mais tarde.";
	}
}
fetchData();

// Função para aplicar filtros e fazer as pesquisas
function searchAndFilters() {
	const searchValue = document.getElementById("search").value.toLowerCase();
	const categoryValue = document.getElementById("category").value;

	const filteredProducts = allProducts.filter((product) => {
		const productName = product.nome.toLowerCase();
		// Verifica se o produto corresponde ao valor de pesquisa.
		const matchesSearch = !searchValue || productName.includes(searchValue);
		// matches será verdadeiro se search estiver vazio ou se productName contiver searchValue'.
		// Verifica se o produto corresponde ao valor da categoria.
		const matchesCategory =
			!categoryValue || product.categoria === categoryValue;
		// Retorna verdadeiro se o produto corresponder tanto ao valor de pesquisa quanto à categoria.
		return matchesSearch && matchesCategory;
		// O produto será incluído no resultado se algun dos critérios forem atendidos.
	});

	displayProducts(filteredProducts);
}

// Função para limitar a frequência de chamadas da função de procura, evitando delays
function delay(func, delay) {
	let delayTimer;
	return function (args) {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => func.apply(this, args), delay);
	};
}

const modal = document.querySelector(".modal");
const addbtn = document.getElementById("AddBtn");
const CloseBtn = document.getElementsByClassName("close")[0];
addbtn.onclick = function () {
	modal.style.display = "block";
	addbtn.classList.add = "disabled";
};
CloseBtn.onclick = function () {
	modal.style.display = "none";
	addbtn.classList.remove = "disabled";
};
window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
		addbtn.classList.remove = "disabled";
	}
};

document
	.getElementById("edit-product-form")
	.addEventListener("submit", async function (event) {
		event.preventDefault();
		const formData = new FormData(this);

		try {
			let response = await fetch("addProduct.php", {
				method: "POST",
				body: formData,
			});
			let result = await response.json();
			document.getElementById("response-message").innerText =
				result.message || "Produto atualizado com sucesso!";
		} catch (error) {
			console.error(error);
			document.getElementById("response-message").innerText =
				"Ocorreu um erro ao atualizar o produto.";
		}
	});
