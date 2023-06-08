import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MRegistroRoutingModule } from './m-registro-routing.module';
import { RegistroComponent } from './registro/registro.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    RegistroComponent
  ],
  imports: [
    CommonModule,
    MRegistroRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MRegistroModule { }
