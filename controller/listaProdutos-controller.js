import { ProdutosService } from '../service/produtos-service.js';
import { CarrinhoDados } from './produtos-cart-controller.js';

const LinhaProdutos = document.querySelector('[data-linhaprodutos]');
const CartAddButton = document.querySelector('[data-add]');

const criaNovoCard = (id, nome, preco, tipo) => {
	const NovoCard = document.createElement('div');

	const conteudo = `<div class="produto-card-img">
	                    <img src="./assets/imgs/Vector.png" alt="produto" />
	        </div>
			<div class="add-cart" data-addid='${id}' data-addproduto='${nome}'>ADD TO CART +</div>
	        <div class="produto-card-nome" >${nome}</div>
	        <div class="produto-card-preco">R$ ${preco}</div>
	        <div class="produto-card-url"><a href="/produto.html?id=${id}&tipo=${tipo}">Ver produto</a>
	        </div>`;

	NovoCard.innerHTML = conteudo;
	NovoCard.className = 'produto-card';
	NovoCard.dataset.id = id;

	return NovoCard;
};

const criaCardGroup = async (tipoProduto, descricao, limite = 5) => {
	let novoDesc = document.createElement('div');
	let nenhumDado = document.createElement('div');

	let conteudoNone = `<div>Nenhum produto cadastrado!</div>`;
	nenhumDado.innerHTML = conteudoNone;

	let conteudo = `<div class="linha-produto-titulo">
					<div class="titulo">Linha de produtos - ${descricao}</div>
					<div class="titulo-todos">
						<a href="#">Ver todos...</a> &nbsp;<img
							src="./assets/imgs/arrow-right.svg"
							alt="arrow"
						/>
					</div>
					</div>
					<div class="linha-produto-cards" data-produtos-${tipoProduto}>
					</div>`;
	novoDesc.innerHTML = conteudo;
	novoDesc.className = 'linha-grupo-produto';

	LinhaProdutos.appendChild(novoDesc);
	let Produtos = document.querySelector(`[data-produtos-${tipoProduto}]`);
	let produtosData = await ProdutosService.listaProdutos();
	let arrayProdutos = [];

	produtosData.forEach((cardData) => {
		let { nome, tipo, preco, id } = cardData;
		if (tipo === tipoProduto) {
			arrayProdutos.push(cardData);
		}
	});

	if (window.innerWidth <= 768) {
		limite = 4;
	}

	// window.addEventListener('resize', (e) => {
	// 	console.log(window.innerWidth);
	// 	if (window.innerWidth <= 1024) {
	// 		limite = 4;
	// 	} else if (window.innerWidth >= 768 || window.innerWidth < 700) {
	// 		limite = 3;
	// 	} else if (window.innerWidth >= 700) {
	// 		limite = 2;
	// 	}
	// });

	arrayProdutos.forEach((cardData, index) => {
		let { nome, tipo, preco, id } = cardData;

		if (index < limite) {
			Produtos.appendChild(criaNovoCard(id, nome, preco, tipo));
		}
	});

	// ProdutosService.listaProdutos().then((data) => {
	// 	data.forEach((cardData, index) => {
	// 		let { nome, tipo, preco, id } = cardData;
	// 		if (index < limite) {
	// 			if (tipo === tipoProduto) {
	// 				Produtos.appendChild(criaNovoCard(id, nome, preco, tipo));
	// 			}
	// 		}
	// 	});
	// });

	//if (CartAddButton) {

	//}
};

CarrinhoDados.getValuesOfCart();

if (LinhaProdutos) {
	criaCardGroup('fruta', 'Frutas');
	criaCardGroup('embutido', 'Embutidos');
	criaCardGroup('cereal', 'Cereais');
}
