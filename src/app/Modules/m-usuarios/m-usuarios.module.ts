import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MUsuariosRoutingModule } from './m-usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MHistclinModule } from '../m-histclin/m-histclin.module';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    MUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MHistclinModule
  ]
})
export class MUsuariosModule { }
