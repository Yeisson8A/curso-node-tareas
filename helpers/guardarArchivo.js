//Libreria para leer y escribir archivos de texto
const fs = require("fs");
//Nombre y ruta del archivo a grabar
const archivo = "./db/data.json";

//Función para guardar datos en un archivo de texto
const guardarDB = (data) => {
    //Se usa file system para guardar la información en el archivo
    //Se usa JSON.stringify para convertir el objeto a un string JSON
    fs.writeFileSync(archivo, JSON.stringify(data));
}

//Función para leer datos almacenados en el archivo de texto
const leerDB = () => {
    //Validar si el archivo no existe
    if (!fs.existsSync(archivo)) {
        return null;
    }

    //Leer contenido del archivo
    const info = fs.readFileSync(archivo, {encoding: "utf-8"});
    //Convertir string con el contenido de tareas a objeto JSON
    const data = JSON.parse(info);
    return data;
}

//Exportar funciones
module.exports = {
    guardarDB,
    leerDB
}