import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-solic-turnos',
  templateUrl: './solic-turnos.component.html',
  styleUrls: ['./solic-turnos.component.css']
})
export class SolicTurnosComponent {
  usu:any = null;
  susUsu:Subscription = Subscription.EMPTY;
  susEsp:Subscription = Subscription.EMPTY;
  especialidades:any[] = [];
  listaEspecialistas:any[] = [];
  listaEspSelec:Especialista[] = [];
  listaDias:any[] = [];
  listaTurnos:string[] = [];
  especSeleccionada:string = "";
  fechas:any = [];
  
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
      this.fechas.push({dia:d,nro:fecha.toLocaleDateString()});
      fecha.setDate(fecha.getDate() + 1);
    }

    // console.log(fecha.toLocaleDateString());
    // console.log(fecha.getDay());
    // fecha.setDate(fecha.getDate() + 1);
  }

  ngOnInit()
  {
    this.susUsu = this.servBase.getUser().subscribe((a:any)=>
    {
      this.servBase.traerFiltrado("Usuarios", "mail", a?.email).then((b)=>
      {
        this.usu = b[0];
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
  }

  ngOnDestroy()
  {
    this.susUsu.unsubscribe();
    this.susEsp.unsubscribe();
  }

  seleccionEsp(seleccion:string)
  {
    this.especSeleccionada = seleccion;
    let existe = false;
    
    this.listaEspSelec = [];
    this.listaDias = [];
    this.listaTurnos = [];

    this.listaEspecialistas.forEach(
      (especialista:Especialista)=>{
        for (let i = 0; i < especialista.especialidad.length; i++) {
           if(seleccion == especialista.especialidad[i]){
            existe = true;
            break;
           }
        }
        
        if(existe){
          this.listaEspSelec.push(especialista);
        }
        existe = false;
    });
  }

  seleccionEsp2(mail:string)
  {
    this.listaDias = [];
    this.listaTurnos = [];
    this.servBase.traerFiltrado("Horarios", "mail", mail).then(
      (horarios)=>
      {
        let array:any = [];
        horarios.forEach(
          (h:any)=>{
            if(h.especialidad == this.especSeleccionada)
            {
              h.horarios.forEach(
                (e:any)=>{
                  // array.push(e);
                  this.fechas.forEach(
                    (f:any )=> {
                      if(e.dia == f.dia){
                        array.push({horario:e, nro:f.nro});
                      }
                  });
                }
              )
            }
        })
        this.listaDias = array;
        console.log(this.listaDias);
      }
    );
  }

  selDia(dia:any)
  {
      this.listaTurnos = [];
      
      if(dia.dia != 'Sabado')
      {
        if(dia.horario == '08:00 - 13:00')
        {
          this.calcularTurnos(8, 13);
        }
        else
        {
          this.calcularTurnos(13, 19);
        }
      }
      else
      {
        if(dia.horario == '08:00 - 11:00')
        {
          this.calcularTurnos(8, 11);
        }
        else
        {
          this.calcularTurnos(11, 14);
        }   
      }
  }

  calcularTurnos(inicio:number, fin:number)
  {
    for(let i=inicio; i<fin; i++)
    {
      this.listaTurnos.push(`${i}:00`);
    }
  }

  calcularDia()
  {

  }
}
