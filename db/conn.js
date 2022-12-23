const mongoose = require("mongoose");

async function main() {
  try {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://ribeiro:WIOHbnwkUSXSnNmM@cluster0.6spfsu0.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("Conectado!");
  } catch (error) {
    console.log(`Erro: ${error}`);
  }
}

module.exports = main;
