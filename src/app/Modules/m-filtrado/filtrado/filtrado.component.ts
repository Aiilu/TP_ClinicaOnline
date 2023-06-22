import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})
export class FiltradoComponent {
  @Input() prefiltro:any = '';
  sus:Subscription;
  sus2:Subscription = Subscription.EMPTY;
  turnos:any[] = [];
  turnoAux:any = {};
  fil:FormControl = new FormControl('');
  filtro:any = {perfil:'',filtro:''};
  modal:boolean = false;
  modalEncuesta:boolean = false;
  accion:string = "";
  accionE:string = "";
  spinner:boolean = false;
  mailPaciente:string = "";

constructor(private servBase:BaseDatosService){
    // let sus = this.servBase.traer('Especialidades').subscribe(
    //   (esp:any[])=>{
    //     esp.forEach(
    //       (e)=>{
    //         this.especialidades.push(e.nombre);
    //       }
    //       );
    //       sus.unsubscribe();
    //   }
    // );

    // this.servBase.traerFiltrado('Usuarios', 'perfil', 'especialista').then(
    //   (e:any)=>{
    //     this.especialistas = e;
    //   }
    // );

    this.sus = this.fil.valueChanges.pipe(debounceTime(300))
    .subscribe(
      (a)=>{
        this.filtro = {perfil:this.filtro.perfil, filtro:a.toLocaleUpperCase()};
        // this.filtro.filtro = a.toLocaleUpperCase();
        // console.log(this.filtro);
      }
    )
  }

  ngOnInit(){
    if(typeof(this.prefiltro) == 'string'){
      this.filtro.perfil = 'A'
      this.sus2 = this.servBase.traer('Turnos').subscribe(
        (a)=>{
          this.turnos = a;
        });
    }else{
      if(this.prefiltro.perfil == 'paciente'){
        this.filtro.perfil = 'P'
        this.servBase.traerFiltrado('Turnos', 'paciente.mail', this.prefiltro.mail).then(
          (a)=>{
            this.turnos = a;
          });
      }else{
        this.filtro.perfil = 'E'
        this.servBase.traerFiltrado('Turnos', 'especialista.mail', this.prefiltro.mail).then(
          (a)=>{
            this.turnos = a;
          });
        }
    }
  }

  ngOnDestroy(){
    this.sus.unsubscribe();
    if(this.filtro.perfil == 'A'){
      this.sus2.unsubscribe();
    }
  }

// async filtrar($event:any, e:any){
//     let array = document.getElementsByClassName('rojo');
//     for (let i = 0; i < array.length; i++) {
//       array[0].classList.remove('rojo');
//     }
    
//     $event.srcElement.classList.add('rojo');

//     if(this.filtro == 'Especialidad'){
//     //  this.turnos = await this.servBase.traerFiltrado('Turnos','especialista.especialidad', e);
//     }else{
//       // this.turnos = await this.servBase.traerFiltrado('Turnos','especialista.mail', e.mail);
//     }
//   }

  // cancelar(turno:any){
  //  turno.estado = 'cancelado';
  //  this.servBase.modificarObjeto(turno,'Turnos');
  // }

  async aceptar(turno:any)
  {
    this.spinner = true;
    turno.estado = "aceptado";

    await this.servBase.modificarObjeto(turno,'Turnos').then(
      ()=>
      {
        Swal.fire(
          'El turno ha sido aceptado!',
          'Haga click para continuar',
          'success'
        );
      })
    .catch(
      (error)=>{
        Swal.fire(
          'error: ' + error,
          'Haga click para continuar',
          'error'
        );
      })
    .finally(
      ()=>{
        this.spinner = false;
      }
    );
  }

  abrirModal(turno:any, accion:string)
  {
    this.turnoAux = turno;
    this.modal = true;
    this.accion = accion;
  }

  abrirEncuesta(turno:any, accion:string)
  {
    this.turnoAux = turno;
    this.modalEncuesta = true;
    this.accionE = accion;
  }

  async cerrarEncuesta($event:any)
  {
    this.modalEncuesta = false;
    
    if(typeof($event) == 'string' || $event == undefined){
      if($event == "guardar")
      {
        this.spinner = true;
        this.turnoAux.marcaEncuesta = "S";
        await this.servBase.modificarObjeto(this.turnoAux,'Turnos').then(
        ()=>
        {
         Swal.fire(
            'Encuesta cargada!',
            'Haga click para continuar',
            'success'
          );
        })
        .catch(
            (error)=>{
            Swal.fire(
              'error: ' + error,
              'Haga click para continuar',
              'error'
            );
          })
        .finally(
          ()=>{
            this.spinner = false;
            this.turnoAux = {};
            this.accionE = "";
          }
        ); 
      }
    }else{
      this.spinner = true;
      this.turnoAux.calificacion = $event;
      await this.servBase.modificarObjeto(this.turnoAux,'Turnos').then(
        ()=>
        {
         Swal.fire(
             'Calificacion cargada!',
             'Haga click para continuar',
             'success'
         );
        })
        .catch(
             (error)=>{
             Swal.fire(
               'error: ' + error,
               'Haga click para continuar',
               'error'
             );
         })
         .finally(
          ()=>{
            this.spinner = false;
            this.turnoAux = {};
            this.accionE = "";
          }
        );
    }
    // this.spinner = false;
    // this.turnoAux = {};
    // this.accionE = "";
  }

  async cerrarModal($event:any)
  {
    this.modal = false;

    if($event != "")
    {
      this.spinner = true;

      if(typeof($event) == 'string'){
        this.turnoAux.estado = this.accion;
        this.turnoAux.resenia.diagnostico = $event;
        await this.servBase.modificarObjeto(this.turnoAux,'Turnos').then(
          ()=>
          {
            Swal.fire(
              'El turno ha sido ' + this.accion + '!',
              'Haga click para continuar',
              'success'
            );
          })
        .catch(
          (error)=>{
            Swal.fire(
              'error: ' + error,
              'Haga click para continuar',
              'error'
            );
          })
        .finally(
          ()=>{
            this.turnoAux = {};
            this.accion = "";
          }
          );
      }else{
        this.turnoAux.estado = this.accion;
        this.turnoAux.resenia = $event;
        this.turnoAux.marcaEncuesta = 'N';
        this.servBase.modificarObjeto(this.turnoAux, 'Turnos').then(
          (a)=>{
            Swal.fire(
              'Turno actualizado!',
              'Haga click para continuar',
              'success'
        );})
        .catch(
          (error)=>{
            Swal.fire(
              'error: ' + error,
              'Haga click para continuar',
              'error'
            );
          }).finally(
            ()=>
            {
              this.turnoAux = {};
              this.accion = "";
            }
          );
      }
    }
    else
    {
      this.turnoAux = {};
      this.accion = "";
    }
    this.spinner = false;
  }
}
