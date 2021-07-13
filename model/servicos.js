let listaServicos = require("../arquivos/listaServicos.json");

exports.retornarListaServicos = () => listaServicos;

exports.adicionarItemServico = ({id, desc, preco}) => listaServicos.push({id, desc, preco})

exports.importarListaServicos = ( itensServico ) => {
    listaServicos = itensServico;
};