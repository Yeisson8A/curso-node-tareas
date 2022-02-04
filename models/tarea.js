//Libreria para generar GUID
const {v4 : uuidv4} = require("uuid");

class Tarea {
    id = "";
    desc = "";
    completadoEn = null;

    //Constructor de la clase
    constructor(desc) {
        this.id = uuidv4();
        this.desc = desc;
    }
    
}

//Exportar clase
module.exports = Tarea;