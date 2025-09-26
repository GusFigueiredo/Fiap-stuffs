
let tela = document.getElementById("tela");
let mensagem = document.getElementById("mensagem");

let pontos1 = document.getElementById("pontos1");
let pontos2 = document.getElementById("pontos2");

let podeClicar = false; 

function inciar() {
  mensagem.textContent = "Espere ficar verde...";
  tela.style.background = "gray";
  podeClicar = false;


  let tempo = Math.floor(Math.random() * 3000) + 2000;

  setTimeout(function() {
    tela.style.background = "green";
    mensagem.textContent = "CLIQUE!";
    podeClicar = true;
  }, tempo);
};

function jogador1Click() {
  if (podeClicar) {
    mensagem.textContent = "Jogador 1 venceu";
    pontos1.textContent = parseInt(pontos1.textContent) + 1;
    podeClicar = false;
  }
};

function jogador2Click(){
  if (podeClicar) {
    mensagem.textContent = "Jogador 2 venceu";
    pontos2.textContent = parseInt(pontos2.textContent) + 1;
    podeClicar = false;
  }
};
