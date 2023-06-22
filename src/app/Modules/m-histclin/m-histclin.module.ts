import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistclinicoComponent } from './histclinico/histclinico.component';
import { MPipesModule } from '../m-pipes/m-pipes.module';



@NgModule({
  declarations: [
    HistclinicoComponent
  ],
  imports: [
    CommonModule,
    MPipesModule
  ],
  exports:
  [
    HistclinicoComponent
  ]
})
export class MHistclinModule { }
