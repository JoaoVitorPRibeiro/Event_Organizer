const router = require("express").Router();

const partyController = require("../controllers/partyController");

router //Rota de criação de festas
.route("/parties")
.post((req, res) => partyController.create(req, res));

router //Rota de pegar todas requisições de festas
.route("/parties")
.get((req, res) => partyController.getAll(req, res));

router //Rota de pegar uma requisição pelo ID de festas
.route("/parties/:id")
.get((req, res) => partyController.get(req, res));

router //Rota de deletar uma requisição pelo ID de festas
  .route("/parties/:id")
  .delete((req, res) => partyController.delete(req, res));

router //Rota de atualizar uma requisição pelo ID de festas
  .route("/parties/:id")
  .put((req, res) => partyController.update(req, res));

module.exports = router;
