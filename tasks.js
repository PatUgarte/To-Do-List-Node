const fs = require('fs');
const jsonPath = "./tareas.json";

let tasksArray = readJSON(jsonPath);

const tasks = {
    file: jsonPath,

    list: () => printOutput(tasksArray),

    add: (firstValue, secondValue) => {
        tasksArray.push({ "titulo": firstValue, "estado": secondValue });
        writeJSON(tasksArray);
        console.log(`Se agregó con éxito la siguiente tarea:\n\tTítulo: ${firstValue}  |  Estado: ${secondValue}`);
    },

    search: (query, by = "titulo") => {
        foundTasks = searchTask(query, by);
        if (foundTasks) {
            console.log(`RESULTADOS DE LA BÚSQUEDA DE "${capitalize(by)}: ${query}" ES:`);
            printOutput(foundTasks);
        }
    },

    delete: null,
}

module.exports = tasks;

function readJSON() {
    try {
        let string = fs.readFileSync(jsonPath, { encoding: "utf-8" });
        return JSON.parse(string);
    } catch (error) {
        console.error(error);
    }
}

function writeJSON(content) {
    const stringifiedContent = JSON.stringify(content, null, 4);
    try {
        fs.writeFileSync(jsonPath, stringifiedContent, { encoding: "utf-8" });
    } catch (error) {
        console.error(error);
    }
}

function searchTask(query, by) {
    switch (by) {
        case "titulo":
        case "estado":
            return tasksArray.filter((task) => task[by].toLowerCase().includes(query.toLowerCase()));
        default:
            console.log(`ERROR: \"${by}\" no corresponde con ningún criterio de búsqueda válido. Inténtelo nuevamente.`);
            return;
    }
}

function capitalize(input) {
    const formattedInput =
        input.replace(
            input.charAt(0),
            input.charAt(0).toUpperCase()
        );
    return formattedInput;
}

function printOutput(output) {
    if (output.length > 0) {
        output.map((element, i) => {
            console.log(`-----------------------------------------------------------------------
    ${i + 1} |  Tarea: ${element.titulo}  |  Estado: ${element.estado}`)
        });
        console.log(`-----------------------------------------------------------------------`);
    } else {
        console.log(`\t> No se han hayado resultados :(`);
    }
}