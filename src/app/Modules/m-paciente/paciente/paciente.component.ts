import { Component } from '@angular/core';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent {

  pacientes:any[] = [];
  mailP:string = '';
  spinner = false;

  constructor(private servBase:BaseDatosService){
  }

  ngOnInit(){
    this.spinner = true;
    let sus = this.servBase.getUser().subscribe(
      (a:any)=>
      {
        this.servBase.traerFiltrado('Turnos', 'especialista.mail', a?.email).then(
          (turnos:any[])=>{
            turnos.forEach(
              (turno:any) => {
                if(turno.estado == 'finalizado'){
                  // this.servBase.traerFiltrado('Usuarios', 'mail',turno.paciente.mail);
                  let paciente = {nombre:turno.paciente.nombre,apellido:turno.paciente.apellido,mail:turno.paciente.mail};
                  let existe = false;
                  this.pacientes.forEach(
                    (p:any)=>{
                      if(p.mail == paciente.mail){
                        existe = true;
                      };
                    }
                  );
                  if(!existe){
                    this.pacientes.push(paciente);
                  }
                }
              }
            );
            this.spinner = false;
            sus.unsubscribe();
          }
        ).catch(
          (error)=>console.log(error)
        );
      }
    )
  }

  abrir(mail:string){
    this.mailP = mail;
  }
  
  salir(){
    this.mailP = '';
  }
}
