let n1 = document.querySelector("#n1");
let n2 = document.querySelector("#n2");

const resSoma = document.querySelector(".res-soma");
const resSub = document.querySelector(".res-sub");
const btnCalc = document.querySelector(".btn-calc");
const btnLimpar = document.querySelector(".btn-limpar");

function setCalc() {
  n1 = Number(n1.value);
  n2 = Number(n2.value);
  resSoma.innerHTML = `A soma entre ${n1} e ${n2} = ${n1 + n2}`;
  resSub.innerHTML = `A subtração entre ${n1} e ${n2} = ${n1 - n2}`;

  // return `A soma de ${n1} e ${n2} = ${res}`;
}

btnCalc.addEventListener("click", function () {
  setCalc();
});

btnLimpar.addEventListener("click", function () {
  n1.value = "";
  n2.value = "";
});
