/**
 *FUNÇÕES SÃO BLOCOS QUE PODEM SER REUTILIZADOS
 * FUNÇÕES PODEM OU NÃO RECEBER PARÂMETROS
 * FUNÇÕES PODEM RETORNAR VALORES OU NÃO
 * FUNÇÕES PODEM SER ANÔNIMAS
 */
// DECLARAÇÃO DE FUNÇÃO
function dizOla() {
  alert('Olá')
}
function olaPessoa(nome) {
  alert('Olá, ' + nome)
}
const nome = 'Julius '
const sobrenome = ' Silva '
const idade = 19

function dadosPessoa() {
  const dados = nome + sobrenome + idade
  console.log(dados)
}
// INVOCAÇÃO DE FUNÇÃO
dizOla()
olaPessoa('Lucas')
dadosPessoa()