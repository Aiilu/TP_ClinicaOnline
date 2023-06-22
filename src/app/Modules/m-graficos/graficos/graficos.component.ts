import { Component } from '@angular/core';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import * as Highcharts from 'highcharts';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent {

  grafico:string = '';
  mostrar:boolean = false;

  logs:any[] = [];
  especialidades:any[] = [];
  especialistas:any[] = [];
  nombres:string[] = []; 
  lapso:any[] = [];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  logsF:string[] = [];
  Highcharts2: typeof Highcharts = Highcharts;
  chartOptions2: Highcharts.Options = {};

  Highcharts3: typeof Highcharts = Highcharts;
  chartOptions3: Highcharts.Options = {};

  constructor(private servBase:BaseDatosService){
  }

  ngOnInit(){
    let sus = this.servBase.traer('Especialidades').subscribe(
      (esp:any[])=>{
        esp.forEach(
          (e)=>{
            // this.especialidades.push({nombre:e.nombre, cant:0});
            this.especialidades.push([e.nombre, 0]);
          }
        );
        sus.unsubscribe();
      }
     );

     this.servBase.traerFiltrado('Usuarios', 'perfil', 'especialista').then(
      (esp:any[])=>{
        esp.forEach(
          (e)=>{
            // this.especialistas.push({mail:e.mail, cant:0});
            this.especialistas.push([e.mail, 0]);
            this.nombres.push(e.nombre + ' ' + e.apellido);
          }
        );
      }
     );
  }

  ngOnDestroy(){

  }

  limpiar(){
    this.especialidades.forEach(
      (e)=>{
        // e.cant = 0;
        e[1] = 0;
      }
    );
    this.especialistas.forEach(
      (e)=>{
        // e.cant = 0;
        e[1] = 0;
      }
    );
    this.logs = [];

    this.lapso = [];

    this.mostrar = false;
  }

  log(){
    this.limpiar();

    let susLog = this.servBase.traer('Log').subscribe(
      (l)=>{
        this.logs = l;
        this.grafico = 'log';
        susLog.unsubscribe();
      }
    );
  }

  TxE(){
    this.limpiar();

    let sus = this.servBase.traer('Turnos').subscribe(
        (turnos:any[])=>{
          turnos.forEach(
           (t:any)=>{
              for (let i = 0; i < this.especialidades.length; i++) {
               // if(t.especialista.especialidad == this.especialidades[i].nombre)
               if(t.especialista.especialidad == this.especialidades[i][0])
               {
                 this.especialidades[i][1] += 1;
                 break;
               }  
             }
           }
         )
         this.chartOptions = {
           title: {
             text: 'Turnos por Especialidad'
           },
           series: [{            
             name: 'Turnos',
             data: this.especialidades,
             type: 'pie'
           }]
         };
         this.grafico = 'TxE';
         sus.unsubscribe();
       }
     );
  }

  TxD(){
    this.limpiar();

    let sus = this.servBase.traer('Turnos').subscribe(
      (turnos:any[])=>{
        turnos.forEach(
         (t:any)=>{
          let existe = false;
          for (let i = 0; i < this.lapso.length; i++) {
            if(t.info.fecha == this.lapso[i][0]){
              this.lapso[i][1] += 1;
              existe = true;
              break;
            }
          }
          if(!existe){
            let a:string = t.info.fecha.toString();
            // this.logsF.push(a.slice(6,8)+'/'+a.slice(4,6)+'/'+a.slice(2,4));
            // this.lapso.push([a.slice(6,8)+'/'+a.slice(4,6)+'/'+a.slice(2,4), 1]);
            this.lapso.push([a.slice(2,4)+'/'+a.slice(4,6)+'/'+a.slice(6,8), 1]);
          }
         }
       );

       this.lapso.sort(
        (l,l2)=>{
          if(l[0] < l2[0]){
            return -1;
          }else if(l[0] > l2[0]){
            return 1;
          }
          return 0;
        }
       );
       this.lapso.forEach(element => {
        this.logsF.push(element[0]);
       });

      //  console.log(this.logsF);
      //  console.log(this.lapso);

       this.chartOptions3 = {
         title: {
           text: 'Turnos por Dia'
         },
         xAxis:{
          title: {
            text: 'Fecha'
          },
          categories: this.logsF
         },
         yAxis:{
          title: {
            text: 'Cantidad'
          }
         },
         series: [{            
           name: 'Registro de Turnos',
           data: this.lapso,
           type: 'line'
         }]
       };
       this.grafico = 'TxD';
       sus.unsubscribe();
     }
   );

  }

  setLapso(l:number){
    let fechaF = new Date();
    let fechaI = new Date();
    // fechaI.setDate((fechaF.getDate() - l));
    this.logsF.push(fechaI.toLocaleDateString());
    for (l; 0 < l; l--) {
      fechaI.setDate((fechaI.getDate() - 1));
      this.logsF.push(fechaI.toLocaleDateString());
    }
    let ff = (fechaF.getFullYear() *10000 + (fechaF.getMonth()+1)*100 + fechaF.getDate());
    let fi = (fechaI.getFullYear() *10000 + (fechaI.getMonth()+1)*100 + fechaI.getDate());
    // console.log(fi);
    // console.log(ff);
    
    this.limpiar();

    let sus = this.servBase.traer('Turnos').subscribe(
      (turnos:any[])=>{
        turnos.forEach(
          (t)=>{
            // console.log(t.info.fecha);
            if((t.info.fecha <= ff && t.info.fecha >= fi) && 
               (this.grafico == 'TxEyL' || (this.grafico == 'TfxEyL' && t.estado == 'finalizado'))){
              // console.log(t.especialista.mail);  
              for (let i = 0; i < this.especialistas.length; i++) {
                // if(t.especialista.mail == this.especialistas[i].mail)
                // console.log(this.especialistas[i][0]);
                if(t.especialista.mail == this.especialistas[i][0])
                {
                  // this.especialistas[i].cant += 1;
                  this.especialistas[i][1] += 1;
                  break;
                }
              }
            }
          }
        );
        this.chart(" del " + fechaI.toLocaleDateString() + " al "+ fechaF.toLocaleDateString());
        sus.unsubscribe();
      }
    );
  }

  chart(lapso:string){
    let nombre = '';
    if(this.grafico != 'TxEyL'){
      nombre = "Turnos Finalizados por Especialista" + lapso;
    }else{
      nombre = "Turnos por Especialista" + lapso;
    };
    // console.log(this.especialistas);
    this.chartOptions2 = { title: {text: nombre},
                          xAxis: {
                            title: {text: 'Especialistas'},
                            categories: this.nombres
                          },
                          yAxis: {
                            title: {text: 'Turnos'}
                          },
                          series: [{            
                            name: 'Turnos',
                            data: this.especialistas,
                            type: 'bar'}
                          ]
    };
    this.mostrar = true;
  }

  TxEyL(){
    this.limpiar();

    this.grafico = 'TxEyL';
  }

  TfxEyL(){
    this.limpiar();

    this.grafico = 'TfxEyL';
  }


  async generarPDF()
  {
    // switch (this.grafico) {
    //   case 'log':
        
    //     break;
    //   case 'TxE':
        
    //     break;
    //   case 'TxD':
        
    //     break;
    //   case 'TxEyL':
        
    //     break;
    //   case 'TfxEyL':
        
    //     break;
    //   default:
    //     break;
    // }
    let id = this.grafico;

    if(this.grafico == 'TfxEyL'){
      id = 'TxEyL';
    };

    let idPDF:any = document.getElementById(id);
    // let pdf = new jsPDF('l', 'pt');
    let pdf = new jsPDF('l', 'pt');

    await html2canvas(idPDF)
    .then((img)=>
    {
      pdf.addImage(img.toDataURL(), 'PNG', 150, 5, 600, 300);
    });

    pdf.save('Grafico.pdf');
  }
}
