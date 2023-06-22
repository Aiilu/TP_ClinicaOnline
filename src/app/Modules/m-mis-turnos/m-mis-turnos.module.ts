import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MMisTurnosRoutingModule } from './m-mis-turnos-routing.module';
import { MisTurnosComponent } from './mis-turnos/mis-turnos.component';
import { MFiltradoModule } from '../m-filtrado/m-filtrado.module';


@NgModule({
  declarations: [
    MisTurnosComponent
  ],
  imports: [
    CommonModule,
    MMisTurnosRoutingModule,
    MFiltradoModule
  ]
})
export class MMisTurnosModule { }
