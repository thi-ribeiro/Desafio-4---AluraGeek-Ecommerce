const CartLocal = localStorage.getItem('Carrinho');
const CartCounter = document.querySelector('[data-carrinhoCounter]');
const CartItens = document.querySelector('[data-cartDetails]');

if (!CartLocal) {
	localStorage.setItem('Carrinho', JSON.stringify(0));
}

const addToCart = (id, produto = '?') => {
	let DadosAdd = { id: id, produto: produto, qnt: 1 };
	let CartUpdate = JSON.parse(localStorage.getItem('Carrinho')) || [];

	//console.log(CartUpdate);
	//console.log(CartLocal);

	let objIndex = CartUpdate.findIndex((data) => data.id === id);

	if (objIndex >= 0) {
		CartUpdate[objIndex].qnt = CartUpdate[objIndex].qnt + 1;
	} else {
		CartUpdate.push(DadosAdd);
		CartCounter.classList.add('zoom-in-zoom-out');
	}

	localStorage.setItem('Carrinho', JSON.stringify(CartUpdate));
	CartCounter.innerHTML = CartUpdate.length;
	getValuesOfCart();
};

const getValuesOfCart = () => {
	let CartUpdate = JSON.parse(localStorage.getItem('Carrinho')) || [];

	let qntTotal = 0;

	CartUpdate.forEach((item) => {
		qntTotal = qntTotal + item.qnt;
	});

	//CartCounter.innerHTML = !CartUpdate ? 0 : qntTotal;
	CartCounter.innerHTML = qntTotal;
};

CartCounter.addEventListener('animationend', () => {
	CartCounter.classList.remove('zoom-in-zoom-out');
});

const ItensNoCarrinho = (nome, quantidade) => {
	let novaDiv = document.createElement('div');
	let conteudo = `<div>${nome} - ${quantidade}</div> <div class='controllers-itens-cart'><button>ADD</button> <button>REMOVE</button></div>`;

	novaDiv.className = 'produto-cart-detail';
	novaDiv.innerHTML = conteudo;
	return novaDiv;
};

if (CartItens) {
	JSON.parse(CartLocal).forEach((itens) => {
		CartItens.appendChild(ItensNoCarrinho(itens.produto, itens.qnt));
	});
}

document.addEventListener('click', (e) => {
	let id = e.target.dataset['addid'];
	let produto = e.target.dataset['addproduto'];

	if (id) {
		addToCart(id, produto);
	}
});

export const CarrinhoDados = {
	addToCart,
	getValuesOfCart,
};
