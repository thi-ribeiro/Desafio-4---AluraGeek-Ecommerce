import { ProdutosService } from '../service/produtos-service.js';
import { CarrinhoDados } from './produtos-cart-controller.js';

const DescricaoProduto = document.querySelector('[data-produto]');
const Similares = document.querySelector('[data-similares]');

const QrString = new URLSearchParams(window.location.search);

const idQr = QrString.get('id');
const tipo = QrString.get('tipo');

const criaNovoCard = (id, nome, preco, tipo) => {
	const NovoCard = document.createElement('div');

	const conteudo = `<div class="produto-card-img">
						<img src="./assets/imgs/Vector.png" alt="produto" />
					</div>
						<div class="add-cart" data-add='${id}'>ADD TO CART +</div>
						<div class="produto-card-nome">${nome}</div>
						<div class="produto-card-preco">R$ ${preco}</div>
						<div class="produto-card-url"><a href="/produto.html?id=${id}&tipo=${tipo}">Ver produto</a>
					</div>`;

	NovoCard.innerHTML = conteudo;
	NovoCard.className = 'produto-card';
	NovoCard.dataset.id = id;

	return NovoCard;
};

const criaGrupoSimilares = async (tipoProduto, limite = 5) => {
	let produtosData = await ProdutosService.listaProdutos();
	let arrayProdutos = [];

	produtosData.forEach((cardData) => {
		let { tipo, id } = cardData;
		if (tipo === tipoProduto && id != idQr) {
			arrayProdutos.push(cardData);
		}
	});

	if (window.innerWidth <= 768) {
		limite = 4;
	}

	arrayProdutos.forEach((cardData, index) => {
		let { nome, tipo, preco, id } = cardData;

		if (index < limite) {
			Similares.appendChild(criaNovoCard(id, nome, preco, tipo));
		}
	});
};

const descricaoProdutoLayout = (dados) => {
	let { id, nome, preco } = dados;

	let novaDiv = document.createElement('div');

	let conteudo = `<div class='descricao-produto-imagem'><img src='./assets/imgs/produto-padrao.jpg' alt='produto'/></div>
	<div class='descricao-produto-dados'>
    <div class='descricao-produto-nome'>${nome}</div>
    <div class='descricao-produto-preco'>R$ ${preco}</div>
	<div class='descricao-produto-detalhes'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis aperiam ipsum praesentium modi eum corporis neque temporibus odio sint ducimus voluptates similique facere officia culpa beatae quisquam harum, quos adipisci.</div>
	</div>`;

	novaDiv.innerHTML = conteudo;
	novaDiv.className = 'descricao-produto';
	return novaDiv;
};

ProdutosService.detalheProduto(idQr).then((dados) => {
	DescricaoProduto.appendChild(descricaoProdutoLayout(dados));
});

criaGrupoSimilares(tipo);
CarrinhoDados.getValuesOfCart();
