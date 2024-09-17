import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Hello JavaScript!</h1>
`;

function setCalc(n1, n2) {
  alert(`A soma de ${n1} e ${n2} = ${n1 + n2}`);
}

setCalc(2, 5);
