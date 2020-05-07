const fs = require('fs');

const jsonPath = "./tareas.json";

if(! fs.existsSync(jsonPath)){
    try {
        fs.appendFileSync(jsonPath, '[]');
        console.log(` >>>   Creado un nuevo archivo de tareas.json vacío    <<< `);
    } catch (err) {
        console.error(err);
    }
}

let tasksArray = readJSON(jsonPath);

const tasks = {
    file: "./tareas.json",
    list: null,
    search: (value) => {
        console.log(`RESULTADOS DE LA BÚSQUEDA DE "${value}":`);
        return tasksArray.filter((task) => task.estado.toLowerCase().includes(value.toLowerCase()));
    },
    delete: null,
}

module.exports = tasks;

function readJSON(path) {
    try {
        let string = fs.readFileSync(path, { encoding: "utf-8" });
        return JSON.parse(string);
    } catch(error){
        console.error(error);
    }
}