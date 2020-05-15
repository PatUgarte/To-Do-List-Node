const fs = require('fs');
const tasks = require("./tasks");

if (!fs.existsSync(tasks.file)) {
    try {
        fs.appendFileSync(jsonPath, '[]');
        console.log(` >>>\tCreado un nuevo archivo de tareas.json vacío\t<<< `);
    } catch (err) {
        console.error(err);
    }
}

const action = process.argv[2];
const firstValue = process.argv[3];
const secondValue = process.argv[4];
const formattedAction = upperCaseFormatter(action);

console.log();

switch (formattedAction) {
    case "LISTAR":
        tasks.list();
        break;
    case "AGREGAR":
        if (firstValue) {
            const formattedSecondValue = formatStatus(secondValue);
            tasks.add(firstValue, formattedSecondValue);
        } else {
            console.log(`Debe ingresar al menos un título para la tarea que desea agregar.`);
        }
        break;
    case "BUSCAR":
        const formattedSecondValue =
            secondValue
                ? upperCaseFormatter(secondValue).toLowerCase()
                : undefined;
        firstValue
            ? tasks.search(firstValue, formattedSecondValue)
            : console.log(`Debe ingresar un valor para realizar la búsqueda.`);
        break;
    case "BORRAR":
        tasks.delete;   //TODO
        break;
    case undefined:
        console.log(`Debe ingresar una acción para ejecutar el programa.`);
        break;
    default:
        console.log(`"${action}" no es una acción válida.`);
        break;
}

console.log();

function formatStatus(status) {
    const statusUpperCase = upperCaseFormatter(status);
    switch (statusUpperCase) {
        case "PENDIENTE":
        case "TERMINADA":
            return status;
        case "ENPROGRESO":
            return "EN PROGRESO";
        default:
            console.log(`"${status}" no corresponde con ningún valor válido. La tarea fue guardada con estado "PENDIENTE"`);
            return "PENDIENTE";
    }
}

function upperCaseFormatter(input = "") {
    //Le quito todo el espaciado que pueda tener
    input = input.split(" ").join("");
    //Lo convierto todo a mayúsculas
    input = input.toUpperCase();
    return input;
}