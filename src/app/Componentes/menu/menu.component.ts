import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  usu:any = null;
  sus:Subscription = Subscription.EMPTY;
  constructor(private servBase:BaseDatosService) {}
  // usuario: Observable<Usuario>;

  // constructor(private servUsuario:UsuariosService)
  // {
  //   this.usuario = this.servUsuario.getActivo;
  // }

  // salir()
  // {
  //   Swal.fire(
  //     'Sesion finalizada!',
  //     'Haga click para continuar',
  //     'success'
  //   );
  //   this.servUsuario.setActivo = new Usuario("", "", "");
  //   this.servUsuario.tipoPerfil = "";
  // }

  ngOnInit(){
    this.sus = this.servBase.getUser().subscribe((a:any)=>
    {
      // console.log("Menu " + a);
      if(a != undefined)
      {
        // this.usu = a;
        this.servBase.traerUsu("Usuarios", a?.email).then((b)=>{this.usu = b[0]});
      }else{
        // console.log("Inicializo a usu en el menu");
        this.usu = null;
      }
    });
  } 

  salir()
  {
    this.servBase.logout();
  }
}
