import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-histclinico',
  templateUrl: './histclinico.component.html',
  styleUrls: ['./histclinico.component.css']
})
export class HistclinicoComponent {
  @Input() mailP:string = "";
  @Output() salirH:EventEmitter<void> = new EventEmitter<void>();
  histClinico:any = null;
  mailU:string = '';
  fecha:string = new Date().toLocaleDateString();

  constructor(private servBase:BaseDatosService)
  {

  }

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
      }
    })
    .catch((error)=>
    {
      console.log(error);
    }
    );
  }
  
  salir()
  {
    this.salirH.emit();
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
