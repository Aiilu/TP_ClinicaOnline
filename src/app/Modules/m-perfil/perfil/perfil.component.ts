import { Component } from '@angular/core';
import { signInWithEmailAndPassword } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Horario } from 'src/app/Clases/horario';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usu:any = null;
  susUsu:Subscription = Subscription.EMPTY;
  arrayDias:any[] = [];
  especialidadSeleccionada:string = "";
  spinner:boolean = false;
  horarios:boolean = false;
  modal:boolean = false;

  constructor(private servBase:BaseDatosService) {}

  ngOnInit(){
    this.susUsu = this.servBase.getUser().subscribe((a:any)=>
    {
      this.servBase.traerUsu("Usuarios", a?.email).then((b)=>
      {
        this.usu = b[0];
      });
    });
  } 

  ngOnDestroy()
  {
    this.susUsu.unsubscribe();
  }

  seleccionEsp(seleccion:string, $event:any)
  {
    this.especialidadSeleccionada = seleccion;
    this.arrayDias = [];

    let array = document.getElementsByClassName('rojo');
    let num = array.length;
    for (let index = 0; index < num; index++) {
      array[0].classList.remove('rojo');
    }
    
    let array2 = document.getElementsByClassName('verde');
    let num2 = array2.length;
    for (let index = 0; index < num2; index++) {
      array2[0].classList.remove('verde');
    }

    if($event != null){
      $event.srcElement.classList.add('verde');
    }
  }

  validarHorario($event:any, horario:string, dia:string, especialidad:string)
  {
    let horarioAux = "";

    if(horario == "primero" && dia != "Sabado")
    {
      // Tenemos 08:00 a 13:00
      horarioAux = "08:00 - 13:00";
    }
    else if(horario == "segundo" && dia != "Sabado")
    {
      // Tenemos 13:00 a 19:00
      horarioAux = "13:00 - 19:00";
    }
    else if(horario == "primero" && dia == "Sabado")
    {
      // Tenemos 08:00 a 11:00
      horarioAux = "08:00 - 11:00";
    }
    else
    {
      // Tenemos 11:00 a 14:00
      horarioAux = "11:00 - 14:00";
    }

    if($event.srcElement.classList.contains('rojo'))
    {
      let indice = this.arrayDias.findIndex((a)=>(a.dia == dia) && (a.horario == horarioAux) && (a.especialidad == especialidad));
      this.arrayDias.splice(indice, 1);
    }
    else
    {
      this.arrayDias.push({dia: dia, horario: horarioAux});
    }

    $event.srcElement.classList.toggle('rojo');
  }

  guardar()
  {
    this.spinner = true;
    let existe = false;
    let horario = new Horario("", this.usu?.mail, this.usu?.nombre, this.usu?.apellido, this.arrayDias, this.especialidadSeleccionada);

    this.servBase.traerUsu("Horarios", horario.mail).then(
      async (a)=>{
        a.forEach((elemento:any)=>
        {
          if(elemento.especialidad == this.especialidadSeleccionada)
          {
            existe = true;
            horario.id = elemento.id;
            return;
          }
        })
        try {
          if(existe)
          {
            await this.servBase.modificarObjeto(horario, "Horarios");
          }
          else
          {
            await this.servBase.guardarObjeto(horario, "Horarios");
          }
        } catch (error) {
          Swal.fire(
            `Error: ${error}`,
            'Haga click para continuar',
            'error'
          );
        } finally{
          this.seleccionEsp('',null);
          this.spinner = false;
        }

        Swal.fire(
          'El horario ha sido registrado correctamente!',
          'Haga click para continuar',
          'success'
        );
      }
    );
  }

  mostrarHorarios()
  {
    this.horarios = true;
  }

  abrir(){
    this.modal = true;
  }
  salir(){
    this.modal = false;
  }
}
