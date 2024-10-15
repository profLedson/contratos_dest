const express = require("express");
const app = express(); // CRIADO UMA INSTÂNCIA DE EXPRESS
const path = require("path");

const PORT = 33333;

app.get("/", function (req, res) {
  res.send("Hello Página HOME");
});
app.get("/sobre", function (req, res) {
  res.send("<h1>Página Sobre</h1>");
});
app.get("/loja", function (req, res) {
  res.sendFile(path.join(__dirname, "/", "/loja.html"));
});

app.listen(PORT, function () {
  console.log("Rodando na porta: " + PORT);
});
