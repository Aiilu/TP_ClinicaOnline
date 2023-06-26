import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
// import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-histclinico',
  templateUrl: './histclinico.component.html',
  styleUrls: ['./histclinico.component.css'],
  // animations: [
  //   trigger('animacion', [
  //     state('inactive', style({
  //       transform: 'translatey(-100%)'
  //     })),
  //     state('active', style({
  //       transform: 'translatey(0%)'
  //     })),
  //     transition('inactive => active',
  //       animate('300ms ease-in')),
  //   ])
  // ]
})
export class HistclinicoComponent {
  @Input() mailP:string = "";
  @Output() salirH:EventEmitter<void> = new EventEmitter<void>();
  histClinico:any = null;
  resenias:any[] = [];
  esp:any[] = [];
  mailU:string = '';
  mailE:string = '';
  fecha:string = new Date().toLocaleDateString();
  // estado:string = 'inactive';

  constructor(private servBase:BaseDatosService) {}

  ngOnInit()
  {
    let sus = this.servBase.getUser().subscribe(
      (u:any)=>{
        this.mailU = u?.email;
        sus.unsubscribe();
      }
    );
    
    this.servBase.traerFiltrado("HistClinico", "paciente.mail", this.mailP)
    .then((h)=>
    {
      if(h.length != 0)
      {
        this.histClinico = h[0];
        this.resenias = this.histClinico.resenias;
        this.resenias.forEach(
          (r:any)=>{
            let existe = false;
            for (let i = 0; i < this.esp.length; i++) {
              if(r.especialista.mail == this.esp[i].mail){
                existe = true;
              }
            };
            if(!existe){
              this.esp.push({nombre:r.especialista.nombre, apellido:r.especialista.apellido, mail:r.especialista.mail});
            };
          }
        );
      }
    })
    .catch((error)=>
    {
      console.log(error);
      // this.estado = 'active';
    }
    );
    
    // setTimeout(() => {
    //   this.estado = 'active';
    // }, 250);
  }
  
  salir()
  {
    this.salirH.emit();
  }

  filtrar(mail:string){
    let res:any[] = [];
    if(this.mailE == mail){
      this.mailE = '';
      res = this.histClinico.resenias;
    }else{
      this.mailE = mail;
      this.histClinico.resenias.forEach(
        (r:any)=>{
        if(r.especialista.mail == mail){
          res.push(r);
        }
      });
    }
    this.resenias = res;
  }

  async generarPDF()
  {
    let idPDF:any = document.getElementById("imprimir");
    // let pdf = new jsPDF('l', 'pt');
    let pdf = new jsPDF('p', 'pt');

    await html2canvas(idPDF)
    .then((img)=>
    {
      pdf.addImage(img.toDataURL(), 'PNG', 150, 5, 300, 600);
    });

    pdf.save('Historial.pdf');
  }
}
