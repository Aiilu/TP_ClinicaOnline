import { Component } from '@angular/core';
import { Paciente } from 'src/app/Clases/paciente';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {
  pacientes:Paciente[] = [];
  paciente:Paciente = new Paciente('','','',0,0,'','','','','','',);

  constructor(private servBase:BaseDatosService){
    this.servBase.traerFiltrado('Usuarios', 'perfil', 'paciente').then(
      (p:any)=>{
        this.pacientes = p;
      }
    );
  }

  filtro:string = '';

  filtrar($event:any, p?:Paciente){
    let array = document.getElementsByClassName('rojo');
    for (let i = 0; i < array.length; i++) {
      array[0].classList.remove('rojo');
    }

    $event.srcElement.classList.add('rojo');

    if(p != null){
      this.paciente = p;
    }else{
      this.filtro = $event.srcElement.innerText;
    }
  }
}
