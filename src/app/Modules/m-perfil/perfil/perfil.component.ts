import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usu:any = null;
  sus:Subscription = Subscription.EMPTY;
  constructor(private servBase:BaseDatosService) {}

  ngOnInit(){
    this.sus = this.servBase.getUser().subscribe((a:any)=>
    {
      this.servBase.traerUsu("Usuarios", a?.email).then((b)=>{this.usu = b[0]});
    });
  } 

  ngOnDestroy()
  {
    this.sus.unsubscribe();
  }
}
