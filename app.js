const tasks = require("./tasks");

const option = cleanInput(process.argv[2]);
const value = process.argv[3];

switch (option) {
    case "LISTAR":
        break;
    case "BUSCAR":
        if (!value) throw new Error("Debe ingresar un valor para realizar la búsqueda.");
        result = tasks.search(value);
        printOutput(result);
        break;
    case "BORRAR":
        break;
    case undefined:
        break;
    default:
        break;
}

function cleanInput(input) {
    //Le quito todo el espaciado que pueda tener
    input = input.split(" ").join("");
    //Lo convierto todo a mayúsculas
    input = input.toUpperCase();
    return input;
}

function printOutput(output) {
    if (output.length > 0) {
        output.forEach((element, i) => {
            console.log(`---------------------------------------------
    ${i+1} |  Tarea: ${element.titulo}  |  Estado: ${element.estado}`)});
    } else {
        console.log(`  > No se han hayado resultados :(`);
    }
}