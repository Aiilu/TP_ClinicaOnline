import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MPerfilRoutingModule } from './m-perfil-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import { MHistclinModule } from '../m-histclin/m-histclin.module';
import { MPipesModule } from '../m-pipes/m-pipes.module';


@NgModule({
  declarations: [
    PerfilComponent
  ],
  imports: [
    CommonModule,
    MPerfilRoutingModule,
    MHistclinModule,
    MPipesModule
  ]
})
export class MPerfilModule { }
