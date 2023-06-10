import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MPerfilRoutingModule } from './m-perfil-routing.module';
import { PerfilComponent } from './perfil/perfil.component';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MPerfilRoutingModule
  ]
})
export class MPerfilModule { }
