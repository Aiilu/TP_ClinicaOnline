import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MSolicTurnosRoutingModule } from './m-solic-turnos-routing.module';
import { SolicTurnosComponent } from './solic-turnos/solic-turnos.component';


@NgModule({
  declarations: [
    SolicTurnosComponent
  ],
  imports: [
    CommonModule,
    MSolicTurnosRoutingModule
  ]
})
export class MSolicTurnosModule { }
