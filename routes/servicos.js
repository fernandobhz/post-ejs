const express = require("express");
const router = express.Router();
const servicosController = require("../controller/servicosController");

const rnds = [];

/* GET servicos listing. */
router.get("/", function (req, res, next) {
  const { taxaDesconto = 0 } = req.query;
  const listaServico = servicosController.compilaListaServicos(taxaDesconto);
  const rnd = Math.random().toString().slice(-5);

  res.render("servicos", { listaServico, rnd });
});

router.post("/", (req, res) => {
  const { id, desc, preco, rnd } = req.body;
  const { taxaDesconto = 0 } = req.query;

  if (rnds.includes(rnd)) {
    return res.render("error", {
      message: "Esse post já foi realizado",
      error: { status: "", stack: "" },
    });
  }

  servicosController.inserirItemServico({ id, desc, preco });

  rnds.push(rnd);

  const listaServico = servicosController.compilaListaServicos(taxaDesconto);
  res.render("servicos", {
    listaServico,
    rnd: Math.random().toString().slice(-5),
  });
});

module.exports = router;
