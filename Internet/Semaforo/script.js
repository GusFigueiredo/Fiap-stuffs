const vermelho = document.getElementById("vermelho");
const amarelo = document.getElementById("amarelo");
const verde = document.getElementById("verde");

let etapa = 0;


function trocarCor() {
  vermelho.className = "luz";
  amarelo.className = "luz";
  verde.className = "luz";

  if (etapa === 1) {
    vermelho.classList.add("luzVermelha");
  } else if (etapa === 2) {
    amarelo.classList.add("luzAmarelo");
  } else if (etapa === 3) {
    verde.classList.add("luzVerde");
  }

  etapa ++;

  if (etapa > 3) {
    etapa = 1;
  }
}