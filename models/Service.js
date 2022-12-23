const mongoose = require("mongoose");

const { Schema } = mongoose;

const serviceSchema = new Schema( //Definindo as caracteristicas das requisições serviços
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

const Service = mongoose.model("Service", serviceSchema);

module.exports = {
  Service,
  serviceSchema,
};
