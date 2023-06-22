import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MPacienteRoutingModule } from './m-paciente-routing.module';
import { PacienteComponent } from './paciente/paciente.component';
import { MHistclinModule } from '../m-histclin/m-histclin.module';


@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    MPacienteRoutingModule,
    MHistclinModule
  ]
})
export class MPacienteModule { }
