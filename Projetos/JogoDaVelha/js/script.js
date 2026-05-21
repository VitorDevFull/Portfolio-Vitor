// Seleciona os elementos do HTML
const celulas = document.querySelectorAll(".celula");
const statusTexto = document.getElementById("status");

const pontosX = document.getElementById("pontos-x");
const pontosO = document.getElementById("pontos-o");
const pontosEmpate = document.getElementById("pontos-empate");

const botaoReiniciar = document.getElementById("btn-reiniciar");
const botaoResetar = document.getElementById("btn-resetar");

// Variáveis principais do jogo
let jogadorAtual = "X";
let tabuleiro = ["", "", "", "", "", "", "", "", ""];
let jogoAtivo = true;

// Pontuação
let placar = {
    X: 0,
    O: 0,
    empate: 0
};

// Possibilidades de vitória
const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// Adiciona o evento de clique em cada célula
celulas.forEach(function(celula) {
    celula.addEventListener("click", clicarCelula);
});

// Função executada quando o jogador clica em uma célula
function clicarCelula() {
    const index = this.dataset.index;

    // Impede clicar em uma célula ocupada ou depois que o jogo acabou
    if (tabuleiro[index] !== "" || jogoAtivo === false) {
        return;
    }

    // Marca a jogada no array
    tabuleiro[index] = jogadorAtual;

    // Mostra a jogada na tela
    this.textContent = jogadorAtual;
    this.classList.add("ocupada");
    this.classList.add(jogadorAtual.toLowerCase());

    // Verifica se alguém venceu
    const resultado = verificarVencedor();

    if (resultado) {
        statusTexto.textContent = `Jogador ${jogadorAtual} venceu!`;
        jogoAtivo = false;

        placar[jogadorAtual]++;
        atualizarPlacar();

        destacarVencedor(resultado);
        return;
    }

    // Verifica empate
    if (tabuleiro.includes("") === false) {
        statusTexto.textContent = "Deu empate!";
        jogoAtivo = false;

        placar.empate++;
        atualizarPlacar();
        return;
    }

    // Troca o jogador
    trocarJogador();
}

// Verifica se existe uma combinação vencedora
function verificarVencedor() {
    for (let i = 0; i < combinacoesVencedoras.length; i++) {
        const combinacao = combinacoesVencedoras[i];

        const posicao1 = combinacao[0];
        const posicao2 = combinacao[1];
        const posicao3 = combinacao[2];

        if (
            tabuleiro[posicao1] !== "" &&
            tabuleiro[posicao1] === tabuleiro[posicao2] &&
            tabuleiro[posicao1] === tabuleiro[posicao3]
        ) {
            return combinacao;
        }
    }

    return null;
}

// Troca entre jogador X e jogador O
function trocarJogador() {
    if (jogadorAtual === "X") {
        jogadorAtual = "O";
    } else {
        jogadorAtual = "X";
    }

    statusTexto.textContent = `Vez do jogador ${jogadorAtual}`;
}

// Atualiza o placar na tela
function atualizarPlacar() {
    pontosX.textContent = placar.X;
    pontosO.textContent = placar.O;
    pontosEmpate.textContent = placar.empate;
}

// Destaca as células que formaram a vitória
function destacarVencedor(combinacao) {
    for (let i = 0; i < combinacao.length; i++) {
        const index = combinacao[i];
        celulas[index].classList.add("vencedora");
    }
}

// Reinicia apenas a rodada atual
function reiniciarRodada() {
    jogadorAtual = "X";
    tabuleiro = ["", "", "", "", "", "", "", "", ""];
    jogoAtivo = true;

    statusTexto.textContent = "Vez do jogador X";

    celulas.forEach(function(celula) {
        celula.textContent = "";
        celula.className = "celula";
    });
}

// Reseta o placar e reinicia a rodada
function resetarPlacar() {
    placar.X = 0;
    placar.O = 0;
    placar.empate = 0;

    atualizarPlacar();
    reiniciarRodada();
}

// Eventos dos botões
botaoReiniciar.addEventListener("click", reiniciarRodada);
botaoResetar.addEventListener("click", resetarPlacar);