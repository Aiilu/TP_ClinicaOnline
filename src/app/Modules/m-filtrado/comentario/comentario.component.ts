import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent {
  @Input() seleccion:string = "";
  @Input() turno:any;
  @Output() cerrar:EventEmitter<any> = new EventEmitter<any>();
  motivo:string = "";
  formResenia: FormGroup;
  histClinico:any = null;

  constructor(private fb: FormBuilder, private servBase:BaseDatosService) {
    this.formResenia = this.fb.group({
      'altura': ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      'peso': ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      'temperatura': ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      'presion': ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.min(1)]],
      'diagnostico': ['', [Validators.required, Validators.pattern('[a-zA-Z., ]*'), this.lengthValidator]],
      'problemaUno': ['', [Validators.pattern('[a-zA-Z]*')]],
      'problemaDos': ['', [Validators.pattern('[a-zA-Z]*')]],
      'problemaTres': ['', [Validators.pattern('[a-zA-Z]*')]],
      'cantUno': ['', [Validators.pattern('[0-9]*'), Validators.min(1)]],
      'cantDos': ['', [Validators.pattern('[0-9]*'), Validators.min(1)]],
      'cantTres': ['', [Validators.pattern('[0-9]*'), Validators.min(1)]]
    });
  }

  ngOnInit()
  {
    if(this.seleccion == "finalizado")
    {
      this.servBase.traerFiltrado("HistClinico", "paciente.mail", this.turno.paciente.mail).then(
        (h:any )=>
        {
          if(h.length != 0){
            this.histClinico = h[0];
            this.formResenia.setValue({altura: this.histClinico.altura, peso: this.histClinico.peso, temperatura: this.histClinico.temperatura, presion: this.histClinico.presion, diagnostico:'', problemaUno:'', problemaDos:'', problemaTres:'', cantUno:'', cantDos:'', cantTres:''});
          }
        }
      ).catch((error)=>
      {
        Swal.fire(
          'error: ' + error,
          'Haga click para continuar',
          'error'
        );
      });
    }
  }

  guardar()
  {
    if(this.motivo == "")
    {
      Swal.fire(
        'Ingrese el motivo de cancelacion!',
        'Haga click para continuar',
        'error'
      );
    }
    else
    {
      this.cerrar.emit(this.motivo);
    }
  }

  salir()
  {
    this.cerrar.emit("");
  }

  async finalizarResenia()
  {
    let resenia = {fecha:this.turno.info.fecha, especialista:this.turno.especialista, diagnostico:this.formResenia.value.diagnostico, var1:{prob:this.formResenia.value.problemaUno, cant:this.formResenia.value.cantUno}, var2:{prob:this.formResenia.value.problemaDos, cant:this.formResenia.value.cantDos}, var3:{prob:this.formResenia.value.problemaTres, cant:this.formResenia.value.cantTres}}; 
    
    if(this.histClinico != null)
    {
      this.histClinico.altura = this.formResenia.value.altura;
      this.histClinico.peso = this.formResenia.value.peso;
      this.histClinico.presion = this.formResenia.value.presion;
      this.histClinico.temperatura = this.formResenia.value.temperatura;
      this.histClinico.resenias.push(resenia);

      await this.servBase.modificarObjeto(this.histClinico,'HistClinico').then(
        (a)=>{
          Swal.fire(
            'Reseña cargada!',
            'Haga click para continuar',
            'success'
          );
        }
      ).catch((error)=>
      {
        Swal.fire(
          'error: ' + error,
          'Haga click para continuar',
          'error'
        );
      });
    }
    else
    {
      //crear con id
      await this.servBase.guardarObjeto({paciente:this.turno.paciente, altura:this.formResenia.value.altura, peso:this.formResenia.value.peso, temperatura:this.formResenia.value.temperatura, presion:this.formResenia.value.presion, resenias:[resenia]}, "HistClinico").then(
        (a)=>{
          Swal.fire(
            'Reseña cargada!',
            'Haga click para continuar',
            'success'
          );
        }
      ).catch((error)=>
      {
        Swal.fire(
          'error: ' + error,
          'Haga click para continuar',
          'error'
        );
      });
    }

    let res = {diagnostico:resenia.diagnostico, var1:resenia.var1, var2:resenia.var2, var3:resenia.var3, altura:this.formResenia.value.altura, peso:this.formResenia.value.peso, temperatura:this.formResenia.value.temperatura, presion:this.formResenia.value.presion};

    this.cerrar.emit(res);
  }

  private lengthValidator(control: AbstractControl): null | object {
    const valor = <string>control.value;
    const length = valor.length;

    let i = 0;
    let spaces = 0;

    for(i=0; i<valor.length; i++)
    {
      if(valor.at(i) == " ")
      {
        spaces += 1;
      }
    }

    if(length < 10 || spaces == valor.length)
    {
      return {maxLength: true};
    }
    else
    {
      return null;
    }
  }
}
