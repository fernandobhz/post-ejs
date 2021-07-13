var fs = require("fs");
var path = require("path");

const dbServicos = require("../database/dbServicos.json");

const dbServicosPath = path.join(
  __dirname,
  "..",
  "database",
  "dbServicos.json"
);
exports.listarServicos = () => dbServicos.servicos;
exports.cadastrarServico = (lista) => {
  const newData = JSON.stringify({
    servicos: lista,
  });

  fs.writeFile(dbServicosPath, newData, "utf8", (err) => {
    if (err) throw err;
    console.log("complete");
  });
  return newData;
};
