//Libreria para dar color al texto en consola
const colors = require("colors");
const { guardarDB, leerDB } = require("./helpers/guardarArchivo");
//Importar función para crear menú interactivo
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require("./helpers/inquirer");
//Importar clase Tareas
const Tareas = require("./models/tareas");
//Importar función para crear el menú
//const {mostrarMenu, pausa} = require("./helpers/mensajes");

//Función principal de la aplicación
const main = async() => {
    let opt = "";
    //Crear instancia de la clase Tareas
    const tareas = new Tareas();
    //Leer tareas guardadas en el archivo de texto
    const tareasDB = leerDB();

    //Validar si se obtuvieron tareas del archivo de texto
    if (tareasDB) {
        //Cargar tareas obtenidas del archivo de texto
        tareas.cargarTareasFromArray(tareasDB);
    }

    //Repetir menú siempre y cuando la opción no sea cero
    do {
        //Esperar y obtener la opción del usuario
        //opt = await mostrarMenu();
        opt = await inquirerMenu();
        
        switch (opt) {
            case "1":
                //Solicitar descripción por consola para la nueva tarea
                const desc = await leerInput("Descripción: ");
                //Llamar método de la clase para crear la  nueva tarea
                tareas.crearTarea(desc);
                break;
            case "2":
                //Imprimir listado de tareas usando el método Getter
                //console.log(tareas.listadoArr);
                //Llamar método para mostrar listado de las tareas
                tareas.listadoCompleto();
                break;
            case "3":
                //Llamar método para mostrar listado de las tareas completadas
                tareas.listarPendientesCompletadas(true);
                break;
            case "4":
                //Llamar método para mostrar listado de las tareas pendientes
                tareas.listarPendientesCompletadas(false);
                break;
            case "5":
                //Obtener listado de tareas como menú interactivo a fin de completarlas
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                //Llamar método para modificar estado de la tarea a completado
                tareas.toggleCompletadas(ids);
                break;
            case "6":
                //Obtener listado de tareas como menú interactivo
                const id = await listadoTareasBorrar(tareas.listadoArr);

                //Validar si la opción del menú de tareas es diferente de cero
                if (id !== "0") {
                    //Obtener confirmación del usuario para la eliminar
                    const ok = await confirmar("¿Está seguro de que desea borrar la tarea?");
    
                    //Validar si confirmo la eliminación
                    if (ok) {
                        //Llamar método para borrar una tarea según id
                        tareas.borrarTarea(id);
                        console.log("Tarea borrada correctamente");
                    }
                }
                break;
            case "0":
                break;
        }

        //Llamar función para guardar información en un archivo de texto
        guardarDB(tareas.listadoArr);

        //Evaluar si la opción es igual a cero
        if(opt !== "0") await pausa();
    } while (opt !== "0");
}

//Llamar función principal de la aplicación
main();