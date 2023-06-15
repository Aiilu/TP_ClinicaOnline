import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MTurnosRoutingModule } from './m-turnos-routing.module';
import { TurnosComponent } from './turnos/turnos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MFiltradoModule } from '../m-filtrado/m-filtrado.module';


@NgModule({
  declarations: [
    TurnosComponent
  ],
  imports: [
    CommonModule,
    MTurnosRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MFiltradoModule
  ]
})
export class MTurnosModule { }
