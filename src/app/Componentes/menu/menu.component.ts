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
 
  ngOnInit(){
    this.sus = this.servBase.getUser().subscribe((a:any)=>
    {
      if(a != undefined)
      {
        if(a?.emailVerified
          || a?.email == 'pepe@gmail.com' || a?.email == 'ailen@gmail.com' || a?.email == 'leo@gmail.com'){
          this.servBase.traerUsu("Usuarios", a?.email).then((b)=>{this.usu = b[0]});
        }
      }else{
        this.usu = null;
      }
    });
  } 

  salir()
  {
    this.servBase.logout();
  }
}
