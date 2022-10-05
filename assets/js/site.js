const botaoLogin = document.getElementById('login_btn');
const loginForm = document.getElementById('login_form');

const postProduto = document.getElementById('postProduto');

const BuscaProduto = document.querySelector('[data-search]');

if (BuscaProduto) {
	BuscaProduto.addEventListener('click', () => {
		let textoBusca = document.querySelector('[data-search-text]').value;
		document.location.href = `busca-produtos.html?nome=${textoBusca}`;
	});
}

if (botaoLogin) {
	botaoLogin.addEventListener('click', (e) => {
		// console.log(e.target);
		location.href = 'login.html';
	});
}

if (loginForm) {
	loginForm.addEventListener('submit', (e) => {
		e.preventDefault();

		let usuario = e.target;

		console.log(usuario);

		fetch('http://192.168.18.7:5000/profile')
			.then((response) => {
				if (response.status === 200) {
					return response.json();
				} else {
					throw new Error('Something went wrong on api server!');
				}
			})
			.then((data) => {
				console.log(data);
			})
			.catch((error) => {
				console.error(error);
			});
	});
}

if (postProduto) {
	postProduto.addEventListener('submit', (e) => {
		e.preventDefault();
		//console.log(e.target[0]);

		let nome = e.target[0].value;
		let preco = e.target[1].value;
		let tipo = e.target[2].value;

		fetch('http://192.168.18.7:5000/produtos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ nome: nome, tipo: tipo, preco: preco }),
		})
			.then((res) => res.json())
			.then((data) => console.log('a'));
	});
}
