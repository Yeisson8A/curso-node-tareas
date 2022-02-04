//Libreria para dar color al texto en consola
const colors = require("colors");
const { resolve } = require("path");

//Función para mostrar el menú de la aplicación
const mostrarMenu = () => {
    //Crear promesa
    return new Promise((resolve) => {
        console.log("==========================================".green);
        console.log("Seleccione una opción".green);
        console.log("==========================================\n".green);
        console.log(`${"1.".green} Crear tarea`);
        console.log(`${"2.".green} Listar tareas`);
        console.log(`${"3.".green} Listar tareas completadas`);
        console.log(`${"4.".green} Listar tareas pendientes`);
        console.log(`${"5.".green} Completar tarea(s)`);
        console.log(`${"6.".green} Borrar tarea`);
        console.log(`${"0.".green} Salir`);
    
        //Preparar interface para esperar y leer datos del usuario
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        //Leer datos del usuario
        readline.question("Seleccione una opción: ", (opt) => {
            readline.close();
            resolve(opt);
        });
    });
}

//Función para pausar ejecución
const pausa = () => {
    //Crear promesa
    return new Promise((resolve) => {
        //Preparar interface para esperar y leer datos del usuario
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        //Leer datos del usuario
        readline.question(`\nPresione ${"ENTER".green} para continuar`, (opt) => {
            readline.close();
            resolve();
        });
    });
}

//Exportar funciones
module.exports = {
    mostrarMenu,
    pausa
};