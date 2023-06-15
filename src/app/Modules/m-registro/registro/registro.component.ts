import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Especialista } from 'src/app/Clases/especialista';
import { Paciente } from 'src/app/Clases/paciente';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  formPaciente: FormGroup;
  formEspecialista: FormGroup;
  vista:string = "";
  especialidades:any[] = [];
  susEsp:Subscription = Subscription.EMPTY;
  miEspecialista:Especialista = new Especialista("","", "", 0, 0, "", "", "", "", []);
  miPaciente:Paciente = new Paciente("","", "", 0, 0, "", "", "", "", "", "");
  spinner:boolean = false;
  siteKey:string = "6LeOHpEmAAAAAIn5I1aNKV-9CIaGiS__Lc5Dqcau";

  constructor(private fb: FormBuilder, private servBase:BaseDatosService, private router:Router) {
    this.susEsp = this.servBase.traer("Especialidades").subscribe((data)=>
    {
      this.especialidades = data;
    });

    this.formPaciente = this.fb.group({
      'nombreR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'apellidoR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'edadR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'dniR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'obraSocialR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
      'claveR': ['', [Validators.required, this.spacesValidator]],
      'fotoR': ['', [Validators.required, this.validarFoto]],
      'foto2R': ['', [Validators.required, this.validarFoto]],
      'recaptcha': ['', Validators.required]
    });

    this.formEspecialista = this.fb.group({
      'nombreR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'apellidoR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'edadR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'dniR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'especialidadR': ['', [this.espValidator2]],
      'especialidad[]' : this.fb.array([], [this.espValidator]),
      'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
      'claveR': ['', [Validators.required, this.spacesValidator]],
      'fotoR': ['', [Validators.required, this.validarFoto]],
      'recaptcha': ['', Validators.required]
    });
  }

  ngOnDestroy(){
    this.susEsp.unsubscribe();
  }

  private spacesValidator(control: AbstractControl): null | object {
    const valor = <string>control.value;
    const spaces = valor.includes(' ');

    if(spaces)
    {
      return {containsSpaces: true};
    }
    else
    {
      return null;
    }
  }

  espValidator(control: AbstractControl): null | object{    
    let valido = false;
    let array = <FormArray>control;
    let esp = control.parent?.get('especialidadR');
  
    if((esp?.value.length > 5 && !esp?.value.includes(' ') && esp?.value != 'Pediatra' && esp?.value != 'Dentista' && esp?.value != 'Oftalmologo') || (esp?.value == '' && array.length != 0)){
      valido = true;
      if(esp?.invalid){
        esp?.updateValueAndValidity();
      }
    }  

    if(!valido)
    {
      return {vacio: true};
    }
    else
    {
      return null;
    }
  }

  espValidator2(control: AbstractControl): null | object{    
    let valido = false;
    let array = <FormArray>control.parent?.get('especialidad[]');
    
    if(array != undefined){
      if((control.value.length > 5 && !control.value.includes(' ') && control.value != 'Pediatra' && control.value != 'Dentista' && control.value != 'Oftalmologo') || (control.value == '' && array.length != 0)){
        valido = true;
        if(array.invalid){
          array.updateValueAndValidity();
        }
      }
    }

    if(!valido)
    {
      return {vacio2: true};
    }
    else
    {
      return null;
    }
  }

  validarFoto(control: AbstractControl): null | object{
    if(control.value != ''){
      if((<File>control.value).type ==  'image/png' || (<File>control.value).type ==  'image/jpeg'){
        return null;
      }
    }
    return {fotoMal:true};
  }

  seleccion($event:any, esp:string)
  {
    let array = <FormArray>this.formEspecialista.get('especialidad[]');

    if(array.untouched){
      array.markAsTouched();
    }

    if($event.srcElement.classList.contains('rojo')){
      array.removeAt(array.controls.findIndex((a)=>a.value == esp));
    }else{
      array.push(new FormControl(esp));      
    }

    $event.srcElement.classList.toggle('rojo');
  }

  cambiarVista(perfil:string)
  {
    this.vista = perfil;
  }

  async registrar()
  {
    this.spinner = true;
    let mail:string;
    let clave:string;

    if(this.vista == "especialista")
    {
        this.miEspecialista.nombre = this.formEspecialista.value.nombreR;
        this.miEspecialista.apellido = this.formEspecialista.value.apellidoR;
        this.miEspecialista.edad = this.formEspecialista.value.edadR;
        this.miEspecialista.dni = this.formEspecialista.value.dniR;
        this.miEspecialista.mail = this.formEspecialista.value.emailR.toLocaleLowerCase();
        mail = this.miEspecialista.mail;
        this.miEspecialista.clave = this.formEspecialista.value.claveR;
        clave = this.formEspecialista.value.claveR;
        // this.miEspecialista.foto = this.formEspecialista.value.fotoR;
        await this.servBase.subirFoto(this.formEspecialista.value.fotoR).then(
          resp=>this.miEspecialista.foto = <string>resp
        ) 
        this.miEspecialista.perfil = "especialista";
        let array = (<FormArray>this.formEspecialista.get('especialidad[]')).controls;
        if(array.length != 0){
          array.forEach(
            (a)=>{
              this.miEspecialista.especialidad.push(a.value);
            });
        }
        if(this.formEspecialista.value.especialidadR != ""){

          this.miEspecialista.especialidad.push(this.formEspecialista.value.especialidadR);
          this.servBase.guardarObjetoSinID({nombre: this.formEspecialista.value.especialidadR}, "Especialidades");
        }
        
    }
    else
    {
        this.miPaciente.nombre = this.formPaciente.value.nombreR;
        this.miPaciente.apellido = this.formPaciente.value.apellidoR;
        this.miPaciente.edad = this.formPaciente.value.edadR;
        this.miPaciente.dni = this.formPaciente.value.dniR;
        this.miPaciente.mail = this.formPaciente.value.emailR.toLocaleLowerCase();
        mail = this.miPaciente.mail;
        this.miPaciente.clave = this.formPaciente.value.claveR;
        clave = this.formPaciente.value.claveR;
        this.miPaciente.perfil = "paciente";
        this.miPaciente.obraSocial = this.formPaciente.value.obraSocialR;
        // this.miPaciente.foto = this.formPaciente.value.fotoR;
        await this.servBase.subirFoto(this.formPaciente.value.fotoR).then(
          resp=>this.miPaciente.foto = <string>resp
        );
        // this.miPaciente.foto2 = this.formPaciente.value.foto2R;
        await this.servBase.subirFoto(this.formPaciente.value.foto2R).then(
          resp=>this.miPaciente.foto2 = <string>resp
        );
    }

    this.servBase.register(mail, clave)
    .then(
      async ()=>{
        await this.servBase.logout();
        if(this.vista == "especialista")
        {
          this.servBase.guardarObjeto(this.miEspecialista, "Usuarios");
        }
        else
        {
          this.servBase.guardarObjeto(this.miPaciente, "Usuarios");
        } 
        Swal.fire(
          'El usuario ha sido registrado con exito!',
          'Haga click para continuar',
          'success'
        );
    }).catch(
      (error)=>{
        Swal.fire(
          'error: ' + error,
          'Haga click para continuar',
          'error'
        );
      }
    ).finally(
      ()=>{
        this.spinner = false;
        this.router.navigateByUrl('home');
      }
    );
  }

  marcar(control:string){
    const foto = this.selControl(control);
    
    if(foto?.untouched){
      foto.markAsTouched();
    }
  }

  selFoto($event:any,control:string){
    const foto = this.selControl(control);

    foto?.setValue($event.target.files[0]);
  }

  selControl(control:string){
    let foto;
    switch (control) {
      case 'foto':
        foto = this.formEspecialista.get('fotoR');
        break;
      case 'foto1':
        foto = this.formPaciente.get('fotoR');
        break;
      case 'foto2':
        foto = this.formPaciente.get('foto2R');
        break;
    }
    return foto;
  }
}
