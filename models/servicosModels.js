const listaServicos = require("../database/listaServicos.json");

exports.retornarListaServicos = () => {
  return listaServicos;
};
exports.adicionarServico = ({ id, desc, preco }) =>
  listaServicos.push({ id, desc, preco });
