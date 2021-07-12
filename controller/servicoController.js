const servicosModel = require("../models/servicosModels");

exports.compilarListaServicos = (taxaDesconto) => {
  const listaServicos = servicosModel.retornarListaServicos();
  if (taxaDesconto > 1 || taxaDesconto == null) {
    return listaServicos;
  }
  return listaServicos.map((itemDeServico) => ({
    ...itemDeServico,
    preco: itemDeServico.preco * (1 - taxaDesconto),
  }));
};
exports.criarServicos = (desc, preco) => {
  return servicosModel.adicionarServico(desc, preco);
};
exports.importarItensServico = (itensServico) => {
  itensServico.forEach((item) => servicosModel.adicionarServico(item));
};
