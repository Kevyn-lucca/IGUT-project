/*
Todos:
adicinoar validação no formulário
adicionar uma forma de salvar imagens (Caminho da imagem no banco de dados, imagens em si nos arquvos)
*/

//pega o id a partir dos parametros passados na url.

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
fetchProduct(productId);

//puxa os dados do unico item a partir de seu id
async function fetchProduct(productID) {
	try {
		let response = await fetch(`GetSingleProduct.php?id=${productID}`);
		let product = await response.json();
		displayProduct(product);
	} catch (error) {
		console.error(error);
		document.getElementById("product").innerHTML =
			"<div class='col-12 text-center' >Ocorreu um erro ao carregar os detalhes do produto, por favor retorne mais tarde.</div>";
	}
}

function displayProduct(product) {
	document.getElementById("product").innerHTML = `
      <div class="row mb-4">
        <div class="col-12 text-center">
            <h1>${product.nome}</h1>
        </div>
    </div>
    <div class="row justify-content-center gap-4">
        <div class="col-md-8 col-lg-6">
            <div id="carouselExampleIndicators" class="carousel slide">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img
                            class="d-block w-100"
                            src="src/imgs/rebecca-aldama-G_GaeDNyMe8-unsplash.jpg"
                            alt="slide img"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            class="d-block w-100"
                            src="src/imgs/steve-johnson-f-gxmsZlj9c-unsplash.jpg"
                            alt="slide img"
                        />
                    </div>
                    <div class="carousel-item">
                        <img
                            class="d-block w-100"
                            src="src/imgs/steve-johnson-ZUabNmumOcA-unsplash.jpg"
                            alt="slide img"
                        />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </a>
            </div>
        </div>
        <div class="col-md-4 d-flex flex-column justify-content-center">
                 <div class ="d-flex justify-content-between">
        <h6 class="card-subtitle mb-2 text-muted">R$ ${product.preco}</h6>
        <h6 class="card-subtitle mb-2 text-muted"> ${product.quantidade} restantes</h6>
        </div>
            <p>${product.descricao}</p>
            <button id="editBtn" class="btn btn-outline-success mb-2">Editar</button>
            <button  onclick="deleteProduct(${product.id})" class="btn btn-outline-danger">Deletar</button>
        </div>
    </div>
    `;
	document.getElementById("product-id").value = product.id;

	const modal = document.querySelector(".modal");
	const Editbtn = document.getElementById("editBtn");
	const CloseBtn = document.getElementsByClassName("close")[0];
	Editbtn.onclick = function () {
		modal.style.display = "block";
	};
	CloseBtn.onclick = function () {
		modal.style.display = "none";
	};
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
}

document
	.getElementById("edit-product-form")
	.addEventListener("submit", async function (event) {
		event.preventDefault();
		const formData = new FormData(this);

		try {
			let response = await fetch("updateProduct.php", {
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
// controla o delete de produtos
async function deleteProduct(productID) {
	try {
		const response = await fetch("deleteProduct.php", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ id: productID }),
		});

		const result = await response.json();
		alert(result.message);
	} catch (error) {
		console.error("Erro ao deletar produto:", error);
	}
}
