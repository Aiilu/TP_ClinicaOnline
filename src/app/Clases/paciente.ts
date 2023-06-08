import { Persona } from "./persona";

export class Paciente extends Persona{
    obraSocial:string
    foto2:string

    constructor(id:string, nombre:string, apellido:string, edad:number, dni:number, mail:string, clave:string, foto:string, perfil:string, obraSocial:string, foto2:string)
    {
        super(id, nombre, apellido, edad, dni, mail, clave, foto, perfil);
        this.obraSocial = obraSocial;
        this.foto2 = foto2;
    }
}
