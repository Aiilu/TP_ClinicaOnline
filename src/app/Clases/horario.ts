export class Horario {
    id:string
    mail:string
    nombre:string
    apellido:string
    horarios:any[]
    especialidad:string

    constructor(id:string, mail:string, nombre:string, apellido:string, horarios:any[], especialidad:string)
    {
        this.id = id;
        this.mail = mail;
        this.nombre = nombre;
        this.apellido = apellido;
        this.horarios = horarios;
        this.especialidad = especialidad;
    }
}
