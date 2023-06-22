import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent {
  @Input() seleccionE:string = "";
  @Input() turnoE:any;
  @Output() cerrarAtencion:EventEmitter<any> = new EventEmitter<any>();
  formEncuesta: FormGroup;
  formCalificacion: FormGroup;
  vacia:string = "./assets/vacia.png";
  llena:string = "./assets/llena.png";
  estrellas:string[] = [this.vacia, this.vacia, this.vacia, this.vacia, this.vacia];
  
  constructor(private fb: FormBuilder) {
    this.formEncuesta = this.fb.group({
      'preg1': ['MB', [Validators.required]],
      'preg2': ['', [this.lengthValidator, this.spacesValidator]]
    });

    this.formCalificacion = this.fb.group({
      'preg1': [0, [Validators.required, Validators.min(1)]],
      'preg2': ['', [this.lengthValidator, this.spacesValidator]]
    });
  }

  guardar()
  {
    this.cerrarAtencion.emit("guardar")
  }

  calificar()
  {
    this.cerrarAtencion.emit(this.formCalificacion.value.preg1);
  }

  salir()
  {
    this.cerrarAtencion.emit();
  }

  puntuar(valor:number){
    for (let i = 0; i < this.estrellas.length; i++) {
      if(i <= valor){
        this.estrellas[i] = this.llena;
      }else{
        this.estrellas[i] = this.vacia;
      }
    }
    this.formCalificacion.setValue({preg1:(valor+1), preg2:this.formCalificacion.value.preg2});
  }

  private spacesValidator(control: AbstractControl): null | object {
    const valor = <string>control.value;
    let i = 0;
    let spaces = 0;

    for(i=0; i<valor.length; i++)
    {
      if(valor.at(i) == " ")
      {
        spaces += 1;
      }
    }

    if(spaces == valor.length)
    {
      return {containsSpaces: true};
    }
    else
    {
      return null;
    }
  }

  private lengthValidator(control: AbstractControl): null | object {
    const valor = <string>control.value;
    const length = valor.length;

    if(length < 5  || length > 500)
    {
      return {maxLength: true};
    }
    else
    {
      return null;
    }
  }
}
