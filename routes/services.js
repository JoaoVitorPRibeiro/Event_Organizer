const router = require("express").Router();

const serviceController = require("../controllers/serviceController");

router //Rota de criação de serviços
  .route("/services")
  .post((req, res) => serviceController.create(req, res));

router //Rota de pegar todas requisições de serviços
.route("/services")
.get((req, res) => serviceController.getAll(req, res));

router //Rota de pegar uma requisição pelo ID de serviços
  .route("/services/:id")
  .get((req, res) => serviceController.get(req, res));

router //Rota de deletar uma requisição pelo ID de serviços
  .route("/services/:id")
  .delete((req, res) => serviceController.delete(req, res));

router //Rota de atualizar uma requisição pelo ID de serviços 
  .route("/services/:id")
  .put((req, res) => serviceController.update(req, res));

module.exports = router;
