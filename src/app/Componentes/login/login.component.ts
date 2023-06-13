import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/Clases/persona';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  miUsuario:any = {};
  formLogin: FormGroup;
  spinner:boolean = false;

  constructor(private fb: FormBuilder, private servBase:BaseDatosService, private router:Router) {
    this.formLogin = this.fb.group({
      'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
      'claveR': ['', [Validators.required, this.spacesValidator]]
    });
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

  async ingresar(){
    this.spinner = true;

    const {emailR, claveR} = this.formLogin.value;
    let usu:any;
    const user:any = await this.servBase.login(emailR.toLocaleLowerCase(), claveR).catch(
      error=>{
        Swal.fire(
          error,
          'Haga click para continuar',
          'error'
        );
        this.router.navigateByUrl('home');
      }
    );
    
    if(user != null){
      if(user?.user?.emailVerified 
        || user?.user?.email == "pepe@gmail.com" || user?.user?.email == "ailen@gmail.com" || user?.user?.email == "leo@gmail.com"){
          usu = await this.servBase.traerUsu('Usuarios',emailR.toLocaleLowerCase());
          if(usu[0].perfil == 'especialista' && usu[0].activo == false){
            this.servBase.logout();
            Swal.fire(
              'Su usuario todavia no ha sido habilitado',
              'Haga click para continuar',
              'error'
            );
          }else{
            Swal.fire(
              'Bienvenido ' + user?.user.email + "!",
              'Haga click para continuar',
              'success'
            );
          }
        }else{
          this.servBase.logout();
          Swal.fire(
            'Debes verificar el mail antes de loguearte!',
            'Haga click para continuar',
            'error'
          );
      }
      this.router.navigateByUrl('home');
    }

    this.spinner = false;
  }

  llenar(mail:string, clave:string){
    this.formLogin.setValue({emailR: mail, claveR: clave});
  }
}
