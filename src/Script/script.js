let allProducts = [];
const searchInput = document.querySelector("#search");
const categorySelect = document.querySelector("#category");
const ProductsDiv = document.querySelector("#products");
const modal = document.querySelector(".modal");
const addbtn = document.getElementById("AddBtn");
const CloseBtn = document.getElementsByClassName("close")[0];

searchInput.addEventListener("input", delay(searchAndFilters, 600));
categorySelect.addEventListener("change", searchAndFilters);
// Função para buscar os dados do endpoint do php

async function fetchData() {
	try {
		const response = await fetch("getProducts.php");
		ProductsData = await response.json();
		displayProducts(ProductsData);
	} catch (error) {
		console.error(error);
		document.getElementById("products").innerText =
			"Ocorreu um erro, por favor, retorne mais tarde.";
	}
}
fetchData();

// Função para exibir produtos, usa o metodo map para gerar o html de cada um
function displayProducts(products) {
	const productHTML = products
		.map(
			(product) => `

			<div class="shadow-sm scale-hover" style="width: 18rem; height:19rem"">
			<a class="card link-underline-opacity-0 link-underline" style="width: 18rem; height: 19rem " href="singleProduct.html?id=${product.id}">
      <div class="card-body ">
      
        <h5 class="card-title text-center">${product.nome}</h5>
        <div class ="d-flex justify-content-between"">
        <h6 class="card-subtitle mb-2 text-muted">R$ ${product.preco}</h6>
        <h6 class="card-subtitle mb-2 text-muted"> ${product.quantidade} restantes</h6>
        </div>
        <p class="card-text truncate-wrap "  >${product.descricao}</p>
      </div>
	  </a>
	  </div>
  `
		)
		.join("");
	ProductsDiv.innerHTML = productHTML;
}

// Função para aplicar filtros e fazer as pesquisas
function searchAndFilters() {
	const searchValue = searchInput.value.toLowerCase();
	const categoryValue = categorySelect.value;

	const filteredProducts = ProductsData.filter((product) => {
		const productName = product.nome.toLowerCase();
		// Verifica se o produto corresponde ao valor de pesquisa.
		const matchesSearch = !searchValue || productName.includes(searchValue);
		// matches será verdadeiro se search estiver vazio ou se productName contem searchValue.
		// Verifica se o produto corresponde ao valor da categoria.
		const matchesCategory =
			!categoryValue || product.categoria === categoryValue;
		// Retorna verdadeiro se o produto corresponder tanto ao valor de pesquisa quanto à categoria.
		return matchesSearch && matchesCategory;
		// O produto será incluído no resultado se os critérios forem atendidos.
	});

	displayProducts(filteredProducts);
}

// Função para limitar a frequência de chamadas da função de procura, evitando delays
function delay(func, delay) {
	let delayTimer;
	return (args) => {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => func.apply(this, args), delay);
	};
}
//controla o modal
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
	.addEventListener("submit", async function (e) {
		e.preventDefault();
		const ResponseMessage = document.querySelector("#response-message");
		const formData = new FormData(this);
		try {
			let response = await fetch("addProduct.php", {
				method: "POST",
				body: formData,
			});
			let result = await response.json();
			ResponseMessage.innerText =
				result.message || "Produto atualizado com sucesso!";
		} catch (error) {
			console.error(error);
			ResponseMessage.innerText = "Ocorreu um erro ao atualizar o produto.";
		}
	});
