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
  // formPrueba: FormGroup;
  // usuario:Observable<any> = this.servBase.getUser();
  // formAdmin: FormGroup;
  vista:string = "";
  especialidades:any[] = [];
  // miUsuario = new Usuario("", "", "");
  // sub:Subscription = Subscription.EMPTY;
  susEsp:Subscription = Subscription.EMPTY;
  miEspecialista:Especialista = new Especialista("","", "", 0, 0, "", "", "", "", []);
  miPaciente:Paciente = new Paciente("","", "", 0, 0, "", "", "", "", "", "");
  spinner:boolean = false;

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
      'fotoR': ['', [Validators.required, this.spacesValidator]],
      'foto2R': ['', [Validators.required, this.spacesValidator]]
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
      'fotoR': ['', [Validators.required, this.spacesValidator]]
    });

    // this.formPrueba = this.fb.group({
    //   'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
    //   'claveR': ['', [Validators.required, this.spacesValidator]],
    //  });

    // this.formAdmin = this.fb.group({
    //   'nombreR': ['', [Validators.required, this.spacesValidator]],
    //   'apellidoR': ['', [Validators.required, this.spacesValidator]],
    //   'edadR': ['', [Validators.required, this.spacesValidator]],
    //   'dniR': ['', [Validators.required, this.spacesValidator]],
    //   'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
    //   'claveR': ['', [Validators.required, this.spacesValidator]],
    //   'fotoR': ['', [Validators.required, this.spacesValidator]]
    // });
  }

  // ngOnInit(){
  //   this.sub = this.servBase.traer("Usuarios");
  // }
  
  ngOnDestroy(){
    // this.sub.unsubscribe();
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

  // espValidator(control: AbstractControl): null | object{    
  //   let valido = false;
  //   let array = <FormArray>control;
  //   let esp = control.parent?.get('especialidadR');
  
  //   if((esp?.value.length > 5 && !esp?.value.includes(' ')) || (esp?.value == '' && array.length != 0)){
  //     valido = true;
  //     if(esp?.invalid){
  //       esp?.updateValueAndValidity();
  //     }
  //   }  

  //   if(!valido)
  //   {
  //     return {vacio: true};
  //   }
  //   else
  //   {
  //     return null;
  //   }
  // }

  // espValidator2(control: AbstractControl): null | object{    
  //   let valido = false;
  //   let array = <FormArray>control.parent?.get('especialidad[]');
  //   // console.log(control.value);
    
  //   if(array != undefined){
  //     // console.log("fui tocado");
  //     if((control.value.length > 5 && !control.value.includes(' ')) || (control.value == '' && array.length != 0)){
  //       // console.log("entre al if de la validacion correcta");
  //       valido = true;
  //       if(array.invalid){
  //         // console.log(array.invalid);
  //         array.updateValueAndValidity();
  //       }
  //     }
  //   }

  //   if(!valido)
  //   {
  //     // console.log("di error");
  //     return {vacio2: true};
  //   }
  //   else
  //   {
  //     // console.log("todo bien");
  //     return null;
  //   }
  // }

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
    // console.log(control.value);
    
    if(array != undefined){
      // console.log("fui tocado");
      if((control.value.length > 5 && !control.value.includes(' ') && control.value != 'Pediatra' && control.value != 'Dentista' && control.value != 'Oftalmologo') || (control.value == '' && array.length != 0)){
        // console.log("entre al if de la validacion correcta");
        valido = true;
        if(array.invalid){
          // console.log(array.invalid);
          array.updateValueAndValidity();
        }
      }
    }

    if(!valido)
    {
      // console.log("di error");
      return {vacio2: true};
    }
    else
    {
      // console.log("todo bien");
      return null;
    }
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
    // console.log("Entre al registrar");
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
        //FALTA FOTO EN FIREBASE
        this.miEspecialista.foto = this.formEspecialista.value.fotoR;
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
        //FALTA FOTO EN FIREBASE
        this.miPaciente.foto = this.formPaciente.value.fotoR;
        this.miPaciente.foto2 = this.formPaciente.value.foto2R;
    }
      await this.servBase.register(mail, clave).then(
      ()=>{
          // await this.servBase.logout();
            if(this.vista == "especialista")
            {
            // this.servBase.guardarObjetoSinID(this.miEspecialista, "Usuarios");
              this.servBase.guardarObjeto(this.miEspecialista, "Usuarios");
            }
            else
            {
            // this.servBase.guardarObjetoSinID(this.miPaciente, "Usuarios");
              this.servBase.guardarObjeto(this.miPaciente, "Usuarios");
            } 
            Swal.fire(
              'El usuario ha sido registrado con exito!',
              'Haga click para continuar',
              'success'
            );
        }
      ).catch(
        (error)=>{
          Swal.fire(
            'error: ' + error,
            'Haga click para continuar',
            'error'
          );
        }
      );
      setTimeout(() => {
        this.servBase.logout();
        this.spinner = false;
        this.router.navigateByUrl('home');
      }, 1500);
      // this.spinner = false;
      // this.router.navigateByUrl('home');
  }

  async ingresar(){
    // const {emailR, claveR} = this.formPrueba.value;
    // const user = await this.servBase.login(emailR, claveR);
    // if(user?.user?.emailVerified){
    //   console.log("verifico el mail");
    // }else{
    //   console.log("no verifico el mail");
    // }
  }

  salir(){
    this.servBase.logout();
  }

  // usu(){
  //     if(this.sus == Subscription.EMPTY){
  //       // console.log("entre");
  //       this.sus = this.servBase.getUser().subscribe( (a)=>{this.usuario = a; console.log(this.usuario)});
  //     }
  //     // console.log(this.usuario);
  //     // if(this.usuario != null){
  //     //   console.log(this.usuario);
  //     // }
  // }

}
