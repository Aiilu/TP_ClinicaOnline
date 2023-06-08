export class Persona {
    id:string
    nombre:string
    apellido:string
    edad:number
    dni:number
    mail:string
    clave:string
    foto:string
    perfil:string
    activo:boolean

    constructor(id:string, nombre:string, apellido:string, edad:number, dni:number, mail:string, clave:string, foto:string, perfil:string)
    {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.dni = dni;
        this.mail = mail;
        this.clave = clave;
        this.foto = foto;
        this.perfil = perfil;
        this.activo = false;
    }
}
