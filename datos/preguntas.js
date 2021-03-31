const chalk = require("chalk");

const preguntas = [
  {
    type: "list",
    message: "¿Qué tipo de transporte quiere consultar?",
    choices: ["Bus", "Metro"],
    name: "transporte"
  },
  {
    type: "checkbox",
    message: "¿Qué información extra quiere obtener de cada parada?",
    choices: ["Coordenadas", "Fecha inaguración"],
    name: "infoExtra",
    when: (respuesta) => {
      if (respuesta.transporte !== "Bus") {
        return true;
      } else {
        console.log(chalk.yellow("No tenemos información disponible sobre los buses"));
        process.exit(0);
      }
    }
  },
  {
    type: "confirm",
    message: "¿Quiere que le informemos de los errores?",
    name: "infoErrores"
  },
  {
    type: "input",
    message: "¿Qué línea quiere consultar?",
    name: "linea"
  }
];

module.exports = preguntas;
