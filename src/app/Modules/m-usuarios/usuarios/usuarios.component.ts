import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Persona } from 'src/app/Clases/persona';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent {
  formAdmin: FormGroup;
  vista:string = "";
  listado:string = "";
  sus:Subscription = Subscription.EMPTY;
  admins:any[] = [];
  paci:any[] = [];
  esp:any[] = [];
  miAdmin:Persona = new Persona("", "", "", 0, 0, "", "", "", "");
  spinner:boolean = false;

  constructor(private fb: FormBuilder, private servBase:BaseDatosService, private router:Router){
    this.formAdmin = this.fb.group({
      'nombreR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'apellidoR': ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      'edadR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'dniR': ['', [Validators.required, Validators.pattern('[0-9]*')]],
      'emailR': ['', [Validators.required, Validators.email, this.spacesValidator]],
      'claveR': ['', [Validators.required, this.spacesValidator]],
      'fotoR': ['', [Validators.required, this.validarFoto]]
    });
  }

  ngOnInit(){
    this.sus = this.servBase.traer("Usuarios").subscribe((data)=>
    {
      this.esp = [];
      this.paci = [];
      this.admins= [];
      data.forEach(
        (a:any)=>{
          switch (a.perfil) {
            case 'paciente':
              this.paci.push(a);
              break;
            case 'especialista':
              this.esp.push(a);
              break;
            case 'administrador':
              this.admins.push(a);
              break;
          };
        }
      );
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

  validarFoto(control: AbstractControl): null | object{
    if(control.value != ''){
      if((<File>control.value).type ==  'image/png' || (<File>control.value).type ==  'image/jpeg'){
        return null;
      }
    }
    return {fotoMal:true};
  }

  cambiarVista(valor:string)
  {
    this.vista = valor;
  }

  cambiarListado(valor:string)
  {
    this.listado = valor;
  }

  toggleActivo(esp:any){
    if(esp.activo == true){
      esp.activo = false;
    }else{
      esp.activo = true;
    }
    this.servBase.modificarObjeto(esp,'Usuarios');
  }

  async registrar()
  {
    let mail2 = "";
    let clave2 = "";
    let sus = this.servBase.getUser().subscribe(
      (a:any)=>{
          this.servBase.traerUsu('Usuarios', a?.email).then(
            (b:any[])=>{
              mail2 = b[0].mail;
              clave2 = b[0].clave;
              sus.unsubscribe();
            }
            );
      }
    )

    this.spinner = true;
    let mail:string;
    let clave:string;

    this.miAdmin.nombre = this.formAdmin.value.nombreR;
    this.miAdmin.apellido = this.formAdmin.value.apellidoR;
    this.miAdmin.edad = this.formAdmin.value.edadR;
    this.miAdmin.dni = this.formAdmin.value.dniR;
    this.miAdmin.mail = this.formAdmin.value.emailR.toLocaleLowerCase();
    mail = this.miAdmin.mail;
    this.miAdmin.clave = this.formAdmin.value.claveR;
    clave = this.formAdmin.value.claveR;
    this.miAdmin.perfil = "administrador";
    // this.miAdmin.foto = this.formAdmin.value.fotoR;
    await this.servBase.subirFoto(this.formAdmin.value.fotoR).then(
      resp=>this.miAdmin.foto = <string>resp
    ); 

    this.servBase.register(mail, clave).then(
    async  ()=>{
            await this.servBase.logout();
            await this.servBase.login(mail2,clave2);
            Swal.fire(
              'El usuario ha sido registrado con exito!',
              'Haga click para continuar',
              'success'
            );
            this.servBase.guardarObjeto(this.miAdmin, "Usuarios");
          }
      ).catch(
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

  marcar(){
    const foto = this.formAdmin.get('fotoR');
    
    if(foto?.untouched){
      foto.markAsTouched();
    }
  }

  selFoto($event:any){
    const foto = this.formAdmin.get('fotoR');

    foto?.setValue($event.target.files[0]);
  }
}
