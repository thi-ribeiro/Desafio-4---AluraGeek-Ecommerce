const botaoLogin = document.getElementById('login_btn');
const loginForm = document.getElementById('login_form');

const postProduto = document.getElementById('postProduto');
const BuscaProduto = document.querySelector('[data-search]');
const usuarioLogado = sessionStorage.getItem('usuario');

const urlatual = window.location.pathname;
let parsedUser = JSON.parse(usuarioLogado);

//console.log(urlatual === '/adicionar.html');
//console.log(parsedUser.admin);

if (urlatual === '/adicionar.html') {
	//console.log('SIM!');
	if (!parsedUser.admin) {
		document.location.href = './';
	}
}

if (usuarioLogado) {
	if (parsedUser.admin) {
		let logindiv = document.getElementsByClassName('login')[0];
		let criarElemento = document.createElement('button');

		criarElemento.innerHTML = 'ADICIONAR';
		criarElemento.classList = 'addProduto';
		criarElemento.onclick = () => {
			document.location.href = 'adicionar.html';
		};

		logindiv.appendChild(criarElemento);
	}

	botaoLogin.innerHTML = parsedUser.user;
}

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

		let error = document.getElementById('error');
		let usuario = e.currentTarget.elements.usuario.value;
		let senha = e.currentTarget.elements.senha.value;

		sessionStorage.removeItem('usuario');
		error.innerHTML = '';

		fetch(`http://192.168.18.7:5000/profile?usuario=${usuario}&senha=${senha}`)
			.then((resposta) => {
				if (resposta.ok) {
					return resposta.json();
				}

				throw new Error('Não foi possível encontrar o usuário!');
			})
			.then((data) => {
				if (data[0] !== undefined) {
					sessionStorage.setItem(
						'usuario',
						JSON.stringify({
							user: data[0].usuario,
							admin: data[0].admin,
						})
					);
					window.location.href = './';
				} else {
					error.innerHTML = 'Verifique o login!';
				}
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
