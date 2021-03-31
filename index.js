const inquirer = require("inquirer");
const chalk = require("chalk");
const { program } = require("commander");
const preguntas = require("./datos/preguntas.js");
const paradas = require("./datos/paradas.json");

let existe = false;

program
  .option("-c, --color <color>", "cambia el color.")
  .option("-a, --abrev", "los 3 primeros caracteres.");

program.parse(process.argv);
const options = program.opts();

inquirer.prompt(preguntas).then(respuesta => {
  paradas.features.map(linea => {
    let infoColor;

    if (linea.properties.NOM_LINIA === respuesta.linea) {
      if (options.color) {
        infoColor = options.color;
      } else {
        infoColor = `#${linea.properties.COLOR_LINIA}`;
      }

      const result = `${linea.properties.NOM_LINIA} - ${linea.properties.DESC_LINIA}`;
      const coordenadas = "";

      console.log(chalk.hex(infoColor)(result));
      if (respuesta.infoExtra.includes("Coordenadas")) {
        for (const coordenada of linea.geometry.coordinates) {
          console.log(chalk.hex(infoColor)(coordenada));
        }
      }
      if (respuesta.infoExtra.includes("Fecha inaguración")) {
        console.log(chalk.hex(infoColor)(linea.properties.DATA));
      }
      existe = true;
      return existe;
    }

    return existe;
  });

  if (existe !== true) {
    if (respuesta.infoErrores) {
      console.log(chalk.red.bold("ERROR: no se ha podido encontrar la linea."));
    } else {
      process.exit(0);
    }
  }
});
