const PartyModel = require("../models/Party");

const checkPartyBudget = (budget, services) => {
  const priceSum = services.reduce((sum, service) => sum + service.price, 0); //Para somar todo valores dos serviços

  if (priceSum > budget) {
    return false;
  }

  return true;
};

const partyController = { //Criando as requisições, com as caracteristicas definidas das festas no models
  create: async (req, res) => { //Definindo aonde as caracteristicas estao na requisição
    try {
      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      //Regra de negócio = Se o orçamento(budget) for menor que o valor dos serviço, o orçamento não é suficiente

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "O seu orçamento é insuficiente!" });
        return;
      }

      const response = await PartyModel.create(party); //Criando 

      res.status(201).json({ response, msg: "Festa criada com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => { //Pegando todas as requisições do BD
    try {
      const parties = await PartyModel.find();

      res.json(parties);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => { //Pegando apenas uma requisição do BD, com base no ID
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);

      if (!party) { //Se não encontrar nada no ID, vai dar festa nao encontrada
        res.status(404).json({ msg: "Festa não encontrada" });
        return;
      }

      res.json(party);
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => { //Deletando requisição de serviço
    try {
      const id = req.params.id;
      const party = await PartyModel.findById(id);

      if (!party) {
        res.status(404).json({ msg: "Festa não encontrada" });
        return;
      }

      const deletedParty = await PartyModel.findByIdAndDelete(id);

      res
        .status(200)
        .json({ deletedParty, msg: "Festa excluída com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => { //Atualizando dados da requisição
    try {
      const id = req.params.id;

      const party = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        budget: req.body.budget,
        image: req.body.image,
        services: req.body.services,
      };

      if (party.services && !checkPartyBudget(party.budget, party.services)) {
        res.status(406).json({ msg: "O seu orçamento é insuficiente!" });
        return;
      }

      const updatedParty = await PartyModel.findByIdAndUpdate(id, party);

      if (!updatedParty) {
        res.status(404).json({ msg: "Festa não encontrada" });
        return;
      }

      res.status(200).json({ party, msg: "Festa atualizada com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = partyController;
