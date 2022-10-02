const botaoLogin = document.getElementById('login_btn');
const loginForm = document.getElementById('login_form');

botaoLogin.addEventListener('click', (e) => {
	// console.log(e.target);
	location.href = 'login.html';
});

loginForm.addEventListener('submit', (e) => {
	e.preventDefault();

	let usuario = e.target;

	console.log(usuario);

	fetch('http://localhost:3000/profile')
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
