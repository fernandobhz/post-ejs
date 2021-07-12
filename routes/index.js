const express = require("express");
const router = express.Router();
const servicoController = require("../controller/servicoController");
const multer = require("multer");
const upload = multer({ dest: "C:/Users/eduga/AppData/Local/Temp" });
const fs = require("fs");

router.get("/servicos", (req, res) => {
  const { taxaDesconto } = req.query;
  const listaServicosComDesconto =
    servicoController.compilarListaServicos(taxaDesconto);
  res.render("listaServicos", { listaServicosComDesconto });
});
router.post("/servicos", (req, res) => {
  const { desc, preco } = req.body;
  const listaServicosComDesconto = servicoController.criarServicos(desc, preco);
  res.render("listaServicos", { listaServicosComDesconto });
});

router.post("/servicos/importar", upload.single("cnh"), (req, res) => {
  const itensServicosTxt = fs.readFileSync(req.file.path, "utf-8");
  const itensServicos = JSON.parse(itensServicosTxt);
  servicoController.importarItensServico(itensServicos);
  res.redirect("/servicos");
});

module.exports = router;
