import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MUsuariosRoutingModule } from './m-usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    MUsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MUsuariosModule { }
