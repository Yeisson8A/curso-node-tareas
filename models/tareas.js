//Importar clase Tarea
const Tarea = require("./tarea");

class Tareas {
    _listado = {};

    //Método getter
    get listadoArr() {
        const listado = [];
        //El método keys obtiene todas las llaves del objeto _listado
        Object.keys(this._listado).forEach(key => {
            //Obtener el objeto de la tarea para cada posición, según la llave
            const tarea = this._listado[key];
            //Anexar objeto tarea a listado a devolver
            listado.push(tarea);
        });
        return listado;
    }

    //Constructor de la clase
    constructor() {
        this._listado = {};
    }

    //Método para borrar una tarea del listado
    borrarTarea(id = "") {
        //Validar si existe la tarea con dicho id
        if (this._listado[id]) {
            //Borrar la tarea con dicho id del listado
            delete this._listado[id];
        }
    }

    //Método para crear una nueva tarea
    crearTarea(desc = "") {
        //Crear instancia de la clase Tarea
        const tarea = new Tarea(desc);
        //Almacenar la nueva tarea en el listado
        this._listado[tarea.id] = tarea;
    }

    //Método para cargar las tareas del archivo de texto
    cargarTareasFromArray(tareas = []) {
        //Recorrer arreglo de tareas
        tareas.forEach(tarea => {
            //Asignar cada una de las tareas obtenidas del archivo de texto al listado
            this._listado[tarea.id] = tarea;
        });
    }

    //Método para visualizar listado de tareas indicando estado
    listadoCompleto() {
        console.log();

        //Obtener listado de tareas
        this.listadoArr.forEach((tarea, i) => {
            //Indice de la tarea
            const idx = `${i + 1}.`.green;
            //Descripción de la tarea
            const {desc, completadoEn} = tarea;
            //Estado de la tarea
            const estado = (completadoEn) ? "Completada".green : "Pendiente".red;

            //Imprimir en consola los datos de la tarea
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    //Método para obtener listado de tareas pendientes o completadas
    listarPendientesCompletadas(completadas = true) {
        //Variable para listado de tareas
        let tareas = [];

        //Validar si se van a imprimir las pendientes o las completadas
        if (completadas) {
            tareas = this.listadoArr.filter(tarea => tarea.completadoEn);
        } else {
            tareas = this.listadoArr.filter(tarea => !tarea.completadoEn);
        }
        
        //Recorrer listado de tareas
        tareas.forEach((tarea, i) => {
            //Indice de la tarea
            const idx = `${i + 1}.`.green;
            //Descripción de la tarea
            const {desc, completadoEn} = tarea;
            //Estado de la tarea
            const estado = (completadoEn) ? completadoEn.green : "Pendiente".red;

            //Imprimir en consola los datos de la tarea
            console.log(`${idx} ${desc} :: ${estado}`);
        });
    }

    //Método para modificar las tareas indicando si estan completadas o pendientes
    toggleCompletadas(ids = []) {
        //Recorrer listado de ids para las tareas a completar
        ids.forEach(id => {
            //Obtener información actual de la tarea a completar
            const tarea = this._listado[id];

            //Validar si la tarea a completar no estaba completada previamente
            if (!tarea.completadoEn) {
                //Asignar la fecha actual
                tarea.completadoEn = new Date().toISOString();
            }
        });

        //Recorrer listado de tareas a fin de colocarlas como pendientes
        this.listadoArr.forEach(tarea => {
            //Validar si la tarea en cuestión no existe entre las tareas a completar
            if (!ids.includes(tarea.id)) {
                //Borrar el dato anterior en caso de existir, indicando que la tarea esta pendiente
                this._listado[tarea.id].completadoEn = null;
            }
        });
    }
}

//Exportar clase
module.exports = Tareas;