import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BaseDatosService } from 'src/app/Servicios/base-datos.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {
  usu:any = null;
  susUsu:Subscription = Subscription.EMPTY;

  constructor(private servBase:BaseDatosService) {}

  ngOnInit(){
    this.susUsu = this.servBase.getUser().subscribe((a:any)=>
    {
      this.servBase.traerUsu("Usuarios", a?.email).then((b)=>
      {
        this.usu = b[0];
      });
    });
  }

  ngOnDestroy()
  {
    this.susUsu.unsubscribe();
  }
}
