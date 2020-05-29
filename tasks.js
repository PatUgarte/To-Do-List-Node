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
        let foundTasks = searchTask(query, by);
        if (foundTasks) {
            console.log(`RESULTADOS DE LA BÚSQUEDA DE "${capitalize(by)}: ${query}" ES:`);
            printOutput(foundTasks);
        }
    },

    delete: (query) => {
        let foundTasks = searchTask(query, "titulo");

        if (foundTasks.length === 0) {
            console.log(`No se han hayado tarea relacionadas a la búsqueda "${query}".`);
            return;
        }

        if (foundTasks.length === 1) {
            deleteTask(foundTasks);
        } else {
            console.log(`Se ha encontrado más de una terea relacionadas a la búsqueda "${query}".`);
            console.table(foundTasks);
        }
    }
}

module.exports = tasks;

// JSON Functions

function readJSON(path) {
    try {
        if (!fs.existsSync(path)) {
            fs.appendFileSync(path, '[]');
            console.log(` >>>\tCreado un nuevo archivo de tareas.json vacío\t<<< `);
        }

        let string = fs.readFileSync(path, { encoding: "utf-8" });
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

// TASK Functions

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

function deleteTask(task) {
    let allTheTasks = readJSON(jsonPath);
    let tasksWithoutDeletedOne = allTheTasks.filter(({ titulo }) => titulo !== task[0].titulo);
    writeJSON(tasksWithoutDeletedOne);

    console.log(`Se ha eliminado la tarea:`);
    console.table(task);
}

// INPUT/OUTPUT Functions

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