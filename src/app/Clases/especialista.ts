import { Persona } from "./persona";

export class Especialista extends Persona{
    especialidad:string[]

    constructor(id:string, nombre:string, apellido:string, edad:number, dni:number, mail:string, clave:string, foto:string, perfil:string, especialidad:string[])
    {
        super(id, nombre, apellido, edad, dni, mail, clave, foto, perfil);
        this.especialidad = especialidad;
    }
}
