const { Service: ServiceModel } = require("../models/Service");

const serviceController = {
  create: async (req, res) => { //Criando as requisições, com as caracteristicas definidas dos serviços no models
    try {
      const service = { //Definindo aonde as caracteristicas estao na requisição
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const response = await ServiceModel.create(service); //Criando

      res.status(201).json({ response, msg: "Serviço criado com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  getAll: async (req, res) => { //Pegando todas as requisições do BD
    try {
      const services = await ServiceModel.find();

      res.json(services);
    } catch (error) {
      console.log(error);
    }
  },
  get: async (req, res) => { //Pegando apenas uma requisição do BD, com base no ID
    try { //Definindo ID
      const id = req.params.id;
      const service = await ServiceModel.findById(id);

      if (!service) { //Se não encontrar nada no ID, vai dar serviço nao encontrado
        res.status(404).json({ msg: "Serviço não encontrado" });
        return;
      }

      res.json(service); //Devolve a requisição encontrada
    } catch (error) {
      console.log(error);
    }
  },
  delete: async (req, res) => { //Deletando requisição de serviço
    try { //Acha o ID da requisição
      const id = req.params.id;

      const service = await ServiceModel.findById(id);

      if (!service) {
        res.status(404).json({ msg: "Serviço não encontrado" });
        return;
      }

      const deletedService = await ServiceModel.findByIdAndDelete(id); //Deleta a requisição

      res
        .status(200)
        .json({ deletedService, msg: "Serviço excluído com sucesso!" });
    } catch (error) {
      console.log(error);
    }
  },
  update: async (req, res) => { //Atualizando dados da requisição
    try {
      const id = req.params.id; //Acha o ID da requisição

      const service = { //Atualiza os campos
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
      };

      const updatedService = await ServiceModel.findByIdAndUpdate(id, service); //Atualiza

      if (!updatedService) {
        res.status(404).json({ msg: "Serviço não encontrado" });
        return;
      }

      res.status(200).json({ service, msg: "Serviço atualizado com sucesso" });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = serviceController;
