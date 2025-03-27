let listDeNumerosSorteados = [];
let tentativas = 1;
const numeroMaximo = 100;
let numeroSecreto = gerarNumeroAleatorio(numeroMaximo);

function exibirTextoNaTela(id, texto) {
	let elemento = document.getElementById(id);
	elemento.innerHTML = texto;
	responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 }); // narra em voz alta o texto
}

exibirTextoNaTela('titulo', 'Jogo do Número Secreto');
exibirTextoNaTela('first_paragrafo', 'Escolha um número entre 1 e ' + numeroMaximo);

function verificarChute() {
	let chute = parseInt(document.querySelector('input').value);

	if (chute === numeroSecreto) {
		let palavraTentativa = tentativas > 1 ? ' tentativas' : ' tentativa';
		exibirTextoNaTela('first_paragrafo', 'Parabéns! Você acertou! O número secreto é ' + numeroSecreto + '. Você acertou em ' + tentativas + palavraTentativa);
		document.getElementById('chutar').setAttribute('disable', true);
		document.getElementById('reiniciar').setAttribute('disable', false)
	} else {
		if (chute > numeroSecreto) {
			exibirTextoNaTela('first_paragrafo', 'O número secreto é menor que ' + chute);
		} else if (chute < numeroSecreto) {
			exibirTextoNaTela('first_paragrafo', 'O número secreto é maior que ' + chute);
		}
		tentativas++;
	}
}

function reiniciarJogo() {
	numeroSecreto = gerarNumeroAleatorio(numeroMaximo);
	tentativas = 1;
	exibirTextoNaTela('first_paragrafo', 'Escolha um número entre 1 e ' + numeroMaximo);
	document.querySelector('input').value = '';
	document.getElementById('reiniciar').setAttribute('disabled', true);
	document.getElementById('chutar').setAttribute('disabled', false);
}

function gerarNumeroAleatorio(numeroMaximo) {
	let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
	let qtdElementosLista = listDeNumerosSorteados.length;

	if (qtdElementosLista === numeroMaximo) {
		listDeNumerosSorteados = [];
	}

	if (listDeNumerosSorteados.includes(numeroEscolhido)) {
		return gerarNumeroAleatorio(numeroMaximo);
	} else {
		listDeNumerosSorteados.push(numeroEscolhido);
		return numeroEscolhido;
	}
}
