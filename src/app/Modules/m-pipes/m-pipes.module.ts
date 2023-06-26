import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaPipe } from './fecha.pipe';
import { DniPipe } from './dni.pipe';



@NgModule({
  declarations: [
    FechaPipe,
    DniPipe
  ],
  imports: [
    CommonModule
  ],
  exports:
  [
    FechaPipe,
    DniPipe
  ]
})
export class MPipesModule { }
