import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-solic-turnos',
  templateUrl: './solic-turnos.component.html',
  styleUrls: ['./solic-turnos.component.css']
})
export class SolicTurnosComponent {
  usuario:any = null;
  usuSel:any = null;
  susUsu:Subscription = Subscription.EMPTY;
  susEsp:Subscription = Subscription.EMPTY;
  especialidades:any[] = [];
  listaEspecialistas:any[] = [];
  listaEspSelec:Especialista[] = [];
  listaDias:any[] = [];
  // listaTurnos:string[] = [];
  listaTurnos:any[] = [];
  especSeleccionada:string = "";
  fechas:any = [];
  especialistaSel:any = {};
  diaSel: string = "";
  fechaSel:string = "";
  horarioSel: string = "";
  spinner:boolean = false;
  listaPacientes:Paciente[] = [];
  mostrarAdmin:boolean = false;
  tomados:any[]= [];
  
  constructor(private servBase:BaseDatosService) {
    let fecha = new Date();
    for (let i = 0; i < 15; i++) {
      let d = '';

      switch(fecha.getDay()){
        case 0:
          d = 'Domingo';
          break;
        case 1:
          d = 'Lunes';
          break;
         case 2:
          d = 'Martes';
          break;
        case 3:
          d = 'Miercoles';
          break;
        case 4:
          d = 'Jueves';
          break;
        case 5:
          d = 'Viernes';
          break;
        case 6:
          d = 'Sabado';
          break;
      }
      // this.fechas.push({dia:d,nro:fecha.toLocaleDateString()});
      let nro = (fecha.getFullYear() *10000 + (fecha.getMonth()+1)*100 + fecha.getDate());
      this.fechas.push({dia:d,nro:nro});
      fecha.setDate(fecha.getDate() + 1);
    }
  }

  ngOnInit()
  {
    this.susUsu = this.servBase.getUser().subscribe((a:any)=>
    {
      this.servBase.traerFiltrado("Usuarios", "mail", a?.email).then((b:any)=>
      {
        this.usuario = b[0];
        if(b[0].perfil == "paciente")
        {
          this.usuSel = {nombre: b[0].nombre, apellido: b[0].apellido, mail: b[0].mail};
        }
        else
        {
          this.servBase.traerFiltrado("Usuarios", "perfil", "paciente").then(
            (c:any)=>
            {
              this.listaPacientes = c;
            }
          );
        }
      });
    });

    this.susEsp = this.servBase.traer("Especialidades").subscribe((data:any[])=>
    {
      this.especialidades = data;
    });

    this.servBase.traerFiltrado("Usuarios", 'perfil', 'especialista').then((a)=>
    {
      this.listaEspecialistas = a;
    });

    let sus = this.servBase.traer('Turnos').subscribe(
      (turnos:any[])=>{
        turnos.forEach(
          (t)=>{
            if(t.estado == 'pendiente' || t.estado == 'aceptado'){
              this.tomados.push(t);
            }
          }
        );
        sus.unsubscribe();
      }
    );
  }

  ngOnDestroy()
  {
    this.susUsu.unsubscribe();
    this.susEsp.unsubscribe();
  }

  seleccionEsp($event:any,seleccion:string)
  {
    this.horarioSel = '';
    this.diaSel = '';
    this.fechaSel = '';
    this.listaDias = [];
    this.listaTurnos = [];
    this.especialistaSel = {};
    this.listaEspSelec = [];
    this.especSeleccionada = seleccion;

    this.borrarColor('rojo');
    this.seleccionBoton($event, 'verde');

    this.listaEspecialistas.forEach(
      (especialista:Especialista)=>{
        for (let i = 0; i < especialista.especialidad.length; i++) {
           if(seleccion == especialista.especialidad[i]){
            this.listaEspSelec.push(especialista);
            break;
           }
        }
    });
  }

  // seleccionEsp2($event:any,mail:string)
  // {
  //   this.horarioSel = '';
  //   this.diaSel = '';
  //   this.fechaSel = '';
  //   this.listaDias = [];
  //   this.listaTurnos = [];

  //   this.seleccionBoton($event,'rojo');

  //   this.servBase.traerFiltrado("Horarios", "mail", mail).then(
  //     (horarios)=>
  //     {
  //       let array:any = [];
  //       horarios.forEach(
  //         (h:any)=>{
  //           if(h.especialidad == this.especSeleccionada)
  //           {
  //             h.horarios.forEach(
  //               (e:any)=>{
  //                 // array.push(e);
  //                 this.fechas.forEach(
  //                   (f:any )=> {
  //                     if(e.dia == f.dia){
  //                       array.push({horario:e, nro:f.nro});
  //                     }
  //                 });
  //               }
  //             )
  //             this.especialistaSel = {especialidad: this.especSeleccionada, nombre: h.nombre, apellido: h.apellido, mail: h.mail};
  //           }
  //       })
  //       this.listaDias = array;
  //     }
  //   );
  // }

  // selDia($event:any,dia:any, nro:any)
  // {
  //     this.horarioSel = '';
  //     this.listaTurnos = [];
  //     this.diaSel = dia.dia;
  //     this.fechaSel = nro;
      
  //     this.borrarColor('celeste');
  //     this.seleccionBoton($event, 'violeta');
      
  //     if(dia.dia != 'Sabado')
  //     {
  //       if(dia.horario == '08:00 - 13:00')
  //       {
  //         this.calcularTurnos(nro,8, 13);
  //       }
  //       else
  //       {
  //         this.calcularTurnos(nro,13, 19);
  //       }
  //     }
  //     else
  //     {
  //       if(dia.horario == '08:00 - 11:00')
  //       {
  //         this.calcularTurnos(nro,8, 11);
  //       }
  //       else
  //       {
  //         this.calcularTurnos(nro,11, 14);
  //       }   
  //     }
  // }

  seleccionEsp2($event:any,mail:string)
  {
    this.horarioSel = '';
    this.diaSel = '';
    this.fechaSel = '';
    this.listaDias = [];
    this.listaTurnos = [];

    this.seleccionBoton($event,'rojo');

    this.servBase.traerFiltrado("Horarios", "mail", mail).then(
      (horarios)=>
      {
        // let array:any = [];
        horarios.forEach(
          (h:any)=>{
            if(h.especialidad == this.especSeleccionada)
            {
              this.especialistaSel = {especialidad: this.especSeleccionada, nombre: h.nombre, apellido: h.apellido, mail: h.mail};
              h.horarios.forEach(
                (e:any)=>{
                  this.fechas.forEach(
                    (f:any )=> {
                      if(e.dia == f.dia){
                        this.selDia(e,f.nro);
                      }
                  });
                }
              )
            }
        })
        // this.listaDias = array;
      }
    );
  }

  selDia(dia:any, nro:any)
  {
      if(dia.dia != 'Sabado')
      {
        if(dia.horario == '08:00 - 13:00')
        {
          this.calcularTurnos(dia.dia,nro,8, 13);
        }
        else
        {
          this.calcularTurnos(dia.dia,nro,13, 19);
        }
      }
      else
      {
        if(dia.horario == '08:00 - 11:00')
        {
          this.calcularTurnos(dia.dia,nro,8, 11);
        }
        else
        {
          this.calcularTurnos(dia.dia,nro,11, 14);
        }   
      }
  }

  calcularTurnos(dia:string,nro:string,inicio:number, fin:number)
  {
    for(let i=inicio; i<fin; i++)
    {
      let tomado = false;
      this.tomados.forEach(
        (t)=>{
          if(t.info.fecha == nro && t.info.horario == `${i}:00` && t.especialista.mail == this.especialistaSel.mail && t.especialista.especialidad == this.especialistaSel.especialidad){
            tomado = true;
          }
        }
      );
      if(!tomado){
        this.listaTurnos.push({nro:nro, horario:`${i}:00`, dia:dia});
      }
    }
  }

  selTurno($event:any,turno:any)
  {
    this.horarioSel = turno.horario;
    this.diaSel = turno.dia;
    this.fechaSel = turno.nro;
    this.seleccionBoton($event,'celeste');
  }

  async guardarTurno()
  {
    this.spinner = true;
    let info = {dia: this.diaSel, fecha: this.fechaSel, horario: this.horarioSel};

    let res = {diagnostico:"", var1:{prob:"", cant:""}, var2:{prob:"", cant:""}, var3:{prob:"", cant:""}, altura:"", peso:"", temperatura:"", presion:""}; 

    let turnos = {info: info, especialista: this.especialistaSel, paciente: this.usuSel, estado: 'pendiente', resenia: res, marcaEncuesta: '', calificacion: ''};

    try 
    {
      await this.servBase.guardarObjeto(turnos, "Turnos");
    }
    catch (error) 
    {
      Swal.fire(
        `Error: ${error}`,
        'Haga click para continuar',
        'error'
      );
    } 
    finally
    {
      this.tomados.push(turnos);
      this.horarioSel = '';
      this.diaSel = '';
      this.fechaSel = '';
      this.especSeleccionada = '';
      this.listaDias = [];
      this.listaTurnos = [];
      this.listaEspSelec = [];
      this.especialistaSel = {};
      if(this.usuario.perfil == "administrador")
      {
        this.usuSel = {};
      }
      this.mostrarAdmin = false;
      this.spinner = false;
    }

    Swal.fire(
      'El turno ha sido registrado correctamente!',
      'Haga click para continuar',
      'success'
    );
  }

  seleccionBoton($event:any, color:string)
  {
    this.borrarColor(color);
    if($event != null){
      $event.srcElement.classList.add(color);
    }
  }

  borrarColor(color:string){
    let array2 = document.getElementsByClassName(color);
    let num2 = array2.length;
    for (let index = 0; index < num2; index++) {
      array2[0].classList.remove(color);
    } 
  }

  selPaciente($event:any,p:Paciente){
    this.horarioSel = '';
    this.diaSel = '';
    this.fechaSel = '';
    this.especSeleccionada = '';
    this.listaDias = [];
    this.listaTurnos = [];
    this.listaEspSelec = [];
    this.especialistaSel = {};

    this.usuSel = {nombre: p.nombre, apellido: p.apellido, mail: p.mail};
    this.mostrarAdmin = true;

    this.borrarColor('verde');
    this.seleccionBoton($event,'amarillo');
  }
}
