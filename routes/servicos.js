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

const myMulter = (req, res, next) => {
  const reqbody = [];

  req.on('data', chunk => reqbody.push(chunk));
  req.on('end', () => {
    const lines = reqbody.toString().split("\n");
    lines.shift();
    lines.shift();
    lines.shift();
    lines.shift();
    lines.pop();
    lines.pop();

    req.fileContents = lines.join('\n')
    next();
  });
}

router.post('/importar', myMulter, (req, res) => {
  res.send(req.fileContents);
});

module.exports = router;
