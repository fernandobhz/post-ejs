const model = require("../models/ServicosModel");
const path = require("path");

exports.listarTodosServicos = () => {
  const lista = model.listarServicos();
  return lista;
};
exports.cadastrarNovoServico = (novoServico) => {
  const lista = model.listarServicos();
  const arr = [novoServico].map(({ desc, preco }) => {
    return {
      id: lista.length + 1,
      desc,
      preco: Number(preco),
    };
  });
  lista.push(arr[0]);
  console.log(lista);
  model.cadastrarServico(lista);
  return lista;
};
exports.importarServicos = (file) => {
  const importar = require(path.join(__dirname, "..", file));
  const lista = model.listarServicos();
  console.log(importar);
  const arr = importar.map(({ id, desc, preco }) => {
    return {
      id: lista.length + 1,
      desc,
      preco: Number(preco),
    };
  });
  console.log(arr);
  arr.forEach((obj) => {
    lista.push(obj);
  });
  model.cadastrarServico(lista);
  return lista;
};
