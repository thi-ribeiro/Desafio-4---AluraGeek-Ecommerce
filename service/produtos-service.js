const listaProdutos = () => {
	return fetch(`http://192.168.18.7:5000/produtos`).then((res) => {
		if (res.ok) {
			return res.json();
		}
		throw new Error('Não foi possível obter os dados de produtos!');
	});
};

const detalheProduto = (id) => {
	return fetch(`http://192.168.18.7:5000/produtos/${id}`).then((resposta) => {
		if (resposta.ok) {
			return resposta.json();
		}

		throw new Error('Não foi possível detalhar o produto!');
	});
};

const buscarProduto = (nome) => {
	return fetch(`http://192.168.18.7:5000/produtos?nome_like=${nome}`).then(
		(resposta) => {
			if (resposta.ok) {
				return resposta.json();
			}

			throw new Error('Não foi possível detalhar o produto!');
		}
	);
};

export const ProdutosService = {
	listaProdutos,
	detalheProduto,
	buscarProduto,
};
