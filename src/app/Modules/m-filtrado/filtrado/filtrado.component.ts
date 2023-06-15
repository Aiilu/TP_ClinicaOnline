import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription, debounceTime } from 'rxjs';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-filtrado',
  templateUrl: './filtrado.component.html',
  styleUrls: ['./filtrado.component.css']
})
export class FiltradoComponent {
  @Input() prefiltro:any = '';

  sus:Subscription;
  sus2:Subscription = Subscription.EMPTY;
  // especialidades:string[] = [];
  // especialistas:Especialista[] = []
  turnos:any[] = [];
  fil:FormControl = new FormControl('');
  filtro:string = '';

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
        this.filtro = a.toLocaleUpperCase();
      }
    )

    if(typeof(this.prefiltro) == 'string'){
      this.sus2 = this.servBase.traer('Turnos').subscribe(
        (a)=>{
          this.turnos = a;
        });
    }else{
      if(this.prefiltro.perfil == 'paciente'){
        this.servBase.traerFiltrado('Turnos', 'paciente.mail', this.prefiltro.mail).then(
          (a)=>{
            this.turnos = a;
          });
      }else{
        this.servBase.traerFiltrado('Turnos', 'especialista.mail', this.prefiltro.mail).then(
          (a)=>{
            this.turnos = a;
          });
        }
    }
  }

  ngOnDestroy(){
    this.sus.unsubscribe();
    if(this.prefiltro == ''){
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

  cancelar(turno:any){
   turno.estado = 'cancelado';
    this.servBase.modificarObjeto(turno,'Turnos');
  }
}
