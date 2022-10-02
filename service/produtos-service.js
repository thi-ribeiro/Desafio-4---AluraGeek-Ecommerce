const listaProdutos = () => {
	return fetch(`http://localhost:3000/produtos`).then((res) => {
		if (res.ok) {
			return res.json();
		}
		throw new Error('Não foi possível obter os dados de produtos!');
	});
};

const detalheProduto = (id) => {
	return fetch(`http://localhost:3000/produtos/${id}`).then((resposta) => {
		if (resposta.ok) {
			return resposta.json();
		}

		throw new Error('Não foi possível detalhar o produto!');
	});
};

export const ProdutosService = {
	listaProdutos,
	detalheProduto,
};
