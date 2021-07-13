const path = require("path");
const express = require("express");
const router = express.Router();
const controller = require("../controllers/ServicosController");
/* GET users listing. */
const ejs_helpers = require("../public/javascripts/servicosFunctions");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./storage/uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });
// const upload = require("../services/storageService");
router.get("/", (req, res, next) => {
  const lista = controller.listarTodosServicos();
  const taxaDesconto = req.query.desconto;
  console.log(req.query.desconto);
  console.log(req.body);
  res.render("servicos", {
    title: "Serviços",
    servicos: lista,
    taxaDesconto,
    helpers: ejs_helpers,
  });
});

router.get("/cadastrarservico", (req, res, next) => {
  res.render("cadastrarservico", { title: "Serviços - Cadastrar Serviço" });
});

router.post("/adicionarservico", (req, res, next) => {
  const novoServico = req.body;
  controller.cadastrarNovoServico(novoServico);
  console.log(novoServico);
  res.render("cadastrarservico", { title: "Serviços - Cadastrar Serviço" });
});

router.get("/importar", (req, res, next) => {
  res.render("importarservico", { title: "Serviços - Importar Serviços" });
});
router.post(
  "/importar/upload",
  upload.single("fileServicos"),
  function (req, res, next) {
    console.log(req.file.path);
    controller.importarServicos(req.file.path)
    res.redirect("/servicos")
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
);

module.exports = router;
